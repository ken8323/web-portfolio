'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTask } from '@/lib/actions';

export default function NewTaskPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const title = (formData.get('title') as string).trim();
    if (!title) {
      setError('タイトルを入力してください');
      return;
    }
    await createTask({
      title,
      description: (formData.get('description') as string) || undefined,
    });
    router.push('/tasks');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">新規タスク</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">タイトル *</label>
            <input
              name="title"
              type="text"
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="タスクのタイトル"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">説明（任意）</label>
            <textarea
              name="description"
              rows={3}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="詳細な説明（省略可）"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              作成する
            </button>
            <a
              href="/tasks"
              className="flex-1 text-center bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition"
            >
              キャンセル
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
