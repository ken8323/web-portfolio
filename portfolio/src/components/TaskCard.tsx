'use client';

import { updateTaskStatus, deleteTask } from '@/lib/actions';
import type { Task, Status } from '@/types';

const STATUS_LABELS: Record<Status, string> = {
  PENDING: '未着手',
  IN_PROGRESS: '進行中',
  DONE: '完了',
};

const STATUS_COLORS: Record<Status, string> = {
  PENDING: 'bg-gray-100 text-gray-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  DONE: 'bg-green-100 text-green-700',
};

export function TaskCard({ task }: { task: Task }) {
  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await updateTaskStatus(task.id, e.target.value as Status);
  };

  const handleDelete = async () => {
    if (!confirm('このタスクを削除しますか？')) return;
    await deleteTask(task.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <select
            value={task.status}
            onChange={handleStatusChange}
            className={`text-xs font-medium px-2 py-1 rounded-full cursor-pointer ${STATUS_COLORS[task.status]}`}
          >
            {(Object.keys(STATUS_LABELS) as Status[]).map(s => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
          <button onClick={handleDelete} className="text-red-500 hover:text-red-700 text-sm">
            削除
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        {new Date(task.createdAt).toLocaleDateString('ja-JP')}
      </p>
    </div>
  );
}
