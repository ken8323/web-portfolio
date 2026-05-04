import { Counter } from './components/Counter';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Week 3: React基礎</h1>
      <Counter label="クリック数" />
      <Counter initialCount={10} label="ポイント" />
      <TodoList />
    </div>
  );
}

export default App;
