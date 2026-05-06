import { getTasks } from '@/lib/actions';
import { TaskCard } from '@/components/TaskCard';
import { Header } from '@/components/Header';
import type { Task } from '@/types';

export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">タスク一覧</h1>
          <a
            href="/tasks/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
          >
            + 新規追加
          </a>
        </div>
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>タスクがありません</p>
            <a href="/tasks/new" className="text-blue-600 hover:underline mt-2 inline-block">
              最初のタスクを追加する →
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task: Task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
