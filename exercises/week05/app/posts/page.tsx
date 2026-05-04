interface Post {
  id: number;
  title: string;
  body: string;
}

// async Server Component: クライアントのブラウザではなくサーバー側でfetchが実行される
export default async function Posts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts: Post[] = await res.json();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">投稿一覧（Server Component）</h1>
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-gray-900">{post.title}</h2>
              <p className="text-gray-600 text-sm mt-2">{post.body}</p>
            </div>
          ))}
        </div>
        <a href="/" className="text-blue-600 hover:underline mt-6 block">← ホームへ戻る</a>
      </div>
    </main>
  );
}
