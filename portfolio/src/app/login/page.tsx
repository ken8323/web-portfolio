'use client';

import { useState } from 'react';
import { loginUser } from '@/lib/actions';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await loginUser(formData);
    if (result?.error) setError(result.error);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">ログイン</h1>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">メールアドレス</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">パスワード</label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            ログイン
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-600">
          アカウントをお持ちでない方は{' '}
          <a href="/register" className="text-blue-600 hover:underline">新規登録</a>
        </p>
      </div>
    </div>
  );
}
