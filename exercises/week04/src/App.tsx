import { useState, useEffect } from 'react';
import { UserList } from './components/UserList';

interface Post {
  id: number;
  title: string;
  body: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then((data: Post[]) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  // searchが変わるたびにリアルタイムで絞り込む（useEffectは不要）
  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Week 4: useEffect + fetch</h1>
      <UserList />
      <hr style={{ margin: '32px 0' }} />
      <h2>投稿検索</h2>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="タイトルで検索"
        style={{ width: '100%', padding: '8px', fontSize: '16px', boxSizing: 'border-box' }}
      />
      <p style={{ color: '#666' }}>{loading ? '読み込み中...' : `${filtered.length}件`}</p>
      <ul>
        {filtered.slice(0, 10).map(post => (
          <li key={post.id} style={{ marginBottom: '16px' }}>
            <strong>{post.title}</strong>
            <p style={{ color: '#666', fontSize: '14px' }}>{post.body.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
