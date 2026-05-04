import { useState } from 'react';

interface CounterProps {
  initialCount?: number;
  label?: string;
}

export const Counter = ({ initialCount = 0, label = 'Count' }: CounterProps) => {
  const [count, setCount] = useState(initialCount);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px', borderRadius: '8px' }}>
      <h2>{label}: {count}</h2>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <button onClick={() => setCount(c => c - 1)} style={{ marginLeft: '8px' }}>-1</button>
      <button onClick={() => setCount(initialCount)} style={{ marginLeft: '8px' }}>Reset</button>
    </div>
  );
};
