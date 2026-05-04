'use server';

import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { prisma } from './prisma';
import { signIn } from './auth';
import { revalidatePath } from 'next/cache';
import { auth } from './auth';
import type { Status, CreateTaskInput } from '@/types';

export async function registerUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  if (!email || !password || !name) {
    return { error: '全ての項目を入力してください' };
  }
  if (password.length < 8) {
    return { error: 'パスワードは8文字以上で入力してください' };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: 'このメールアドレスは既に使用されています' };
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await prisma.user.create({ data: { email, password: hashedPassword, name } });

  return { success: true };
}

export async function loginUser(formData: FormData) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/tasks',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'メールアドレスかパスワードが間違っています' };
    }
    throw error; // リダイレクトはNext.jsが処理するので再throwが必要
  }
}

export async function getTasks() {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  return prisma.task.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createTask(input: CreateTaskInput) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.task.create({
    data: {
      title: input.title,
      description: input.description,
      status: input.status ?? 'PENDING',
      userId: session.user.id,
    },
  });

  revalidatePath('/tasks');
}

export async function updateTaskStatus(id: string, status: Status) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.task.updateMany({
    where: { id, userId: session.user.id },
    data: { status },
  });

  revalidatePath('/tasks');
}

export async function deleteTask(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.task.deleteMany({
    where: { id, userId: session.user.id },
  });

  revalidatePath('/tasks');
}
