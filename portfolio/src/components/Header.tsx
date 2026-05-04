import { auth, signOut } from '@/lib/auth';

export async function Header() {
  const session = await auth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <a href="/tasks" className="text-xl font-bold text-gray-900">タスク管理</a>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{session?.user?.name}</span>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/login' });
          }}
        >
          <button type="submit" className="text-sm text-red-600 hover:underline">
            ログアウト
          </button>
        </form>
      </div>
    </header>
  );
}
