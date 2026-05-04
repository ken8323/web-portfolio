// === 演習1: 配列操作 ===
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const doubled = numbers.map(n => n * 2);
console.log('doubled:', doubled);
// 期待値: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

const evens = numbers.filter(n => n % 2 === 0);
console.log('evens:', evens);
// 期待値: [2, 4, 6, 8, 10]

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('sum:', sum);
// 期待値: 55

// === 演習2: オブジェクト操作（Pythonのdictに相当）===
const user = { name: '田中', age: 25, city: '東京' };

// スプレッド演算子でイミュータブルに更新（元のuserは変更しない）
const updatedUser = { ...user, age: 26 };
console.log('updatedUser:', updatedUser);
// 期待値: { name: '田中', age: 26, city: '東京' }

// 分割代入
const { name, age } = user;
console.log(`name: ${name}, age: ${age}`);

// === 演習3: タスク配列操作 ===
const tasks = [
  { id: 1, title: '買い物', done: false },
  { id: 2, title: '運動', done: true },
  { id: 3, title: '読書', done: false },
];

// 未完了タスクだけ抽出
const pending = tasks.filter(t => !t.done);
console.log('pending:', pending.map(t => t.title));
// 期待値: ['買い物', '読書']

// id:1のタスクを完了にする（元配列は変更しない）
const completed = tasks.map(t =>
  t.id === 1 ? { ...t, done: true } : t
);
console.log('after complete:', completed);

// === 自力課題 ===
// 以下の3関数を自分で実装する（上の tasks を使ってテスト）

const findTaskById = (tasks, id) => {
  // TODO: idが一致するタスクを返す。なければundefinedを返す。
};

const addTask = (tasks, newTask) => {
  // TODO: 新しいタスクを追加した新しい配列を返す（元のtasksは変更しない）
};

const removeTask = (tasks, id) => {
  // TODO: 指定idのタスクを除いた新しい配列を返す
};

// 実装後にここのコメントを外してテスト
// console.log('findById:', findTaskById(tasks, 2));
// console.log('addTask:', addTask(tasks, { id: 4, title: '勉強', done: false }));
// console.log('removeTask:', removeTask(tasks, 2));
