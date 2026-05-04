'use server';

import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { prisma } from './prisma';
import { signIn } from './auth';

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
