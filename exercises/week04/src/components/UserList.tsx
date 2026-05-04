import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // [] を依存配列に指定 = マウント時に1回だけ実行
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('データ取得失敗');
        const data: User[] = await res.json();
        setUsers(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : '不明なエラー');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p style={{ color: 'red' }}>エラー: {error}</p>;

  return (
    <div>
      <h2>ユーザー一覧 ({users.length}件)</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} style={{ marginBottom: '8px' }}>
            <strong>{user.name}</strong> — {user.email}
            <br />
            <small style={{ color: '#666' }}>会社: {user.company.name}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};
