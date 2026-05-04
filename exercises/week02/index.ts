// === 演習1: 基本型 ===
const userName: string = '田中';
const age: number = 25;
const isActive: boolean = true;
const scores: number[] = [85, 92, 78];
const tags: string[] = ['TypeScript', 'React'];

// === 演習2: interface でオブジェクトの型を定義 ===

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

interface Task {
  id: string;
  title: string;
  description?: string;          // ? は省略可能なフィールド
  status: 'pending' | 'in_progress' | 'done';  // Union型: この3つの値のみ許可
  userId: string;
  createdAt: Date;
}

const user: User = {
  id: 'user_1',
  email: 'tanaka@example.com',
  name: '田中',
  createdAt: new Date(),
};

const task: Task = {
  id: 'task_1',
  title: '買い物',
  status: 'pending',
  userId: user.id,
  createdAt: new Date(),
};

console.log('User:', user.name, '/', user.email);
console.log('Task:', task.title, '/', task.status);

// === 演習3: 関数に型を付ける ===

// 戻り値: Task | undefined（見つからない場合はundefined）
const findById = (tasks: Task[], id: string): Task | undefined => {
  return tasks.find(t => t.id === id);
};

// Omit<Task, 'id' | 'createdAt'> = id と createdAt を除いた Task の型
const addTask = (tasks: Task[], newTask: Omit<Task, 'id' | 'createdAt'>): Task[] => {
  const created: Task = {
    ...newTask,
    id: `task_${Date.now()}`,
    createdAt: new Date(),
  };
  return [...tasks, created];
};

const updateStatus = (tasks: Task[], id: string, status: Task['status']): Task[] => {
  return tasks.map(t => t.id === id ? { ...t, status } : t);
};

const tasks: Task[] = [task];
const found = findById(tasks, 'task_1');
console.log('found:', found?.title);

const newTasks = addTask(tasks, { title: '運動', status: 'pending', userId: user.id });
console.log('after add:', newTasks.length, 'tasks');

const updated = updateStatus(tasks, 'task_1', 'done');
console.log('after update:', updated[0].status);

// === 演習4: Generics ===

// <T> は「どんな型でも受け取れる型変数」
const firstItem = <T>(arr: T[]): T | undefined => arr[0];

const firstScore = firstItem(scores);  // TypeScriptがnumber | undefinedと推論する
const firstTag = firstItem(tags);      // string | undefined と推論
const firstTask = firstItem(tasks);    // Task | undefined と推論

console.log('first score:', firstScore);
console.log('first tag:', firstTag);
console.log('first task:', firstTask?.title);

// === 型エラー体験（コメントを外すとコンパイルエラーになる）===
// const badUser: User = { id: 1, email: 'test' };   // idはstringなのにnumber → エラー
// task.status = 'completed';                          // 'completed'はUnion型にない → エラー
