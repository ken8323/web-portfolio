import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: '買い物', done: false },
    { id: 2, text: '運動', done: true },
  ]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos(prev => [...prev, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Todo List</h2>
      <div>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="新しいタスクを入力（Enterで追加）"
          style={{ padding: '8px', fontSize: '16px' }}
        />
        <button onClick={addTodo} style={{ marginLeft: '8px', padding: '8px' }}>追加</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#999' : '#000' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
      <p style={{ color: '#666' }}>残り未完了: {todos.filter(t => !t.done).length}件</p>
    </div>
  );
};
