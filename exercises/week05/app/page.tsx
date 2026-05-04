export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Week 5: Next.js基礎</h1>
        <p className="text-gray-600 mb-8">App Router・ルーティング・Tailwind CSSの練習</p>
        <nav className="flex gap-4">
          <a href="/about" className="text-blue-600 hover:underline">About</a>
          <a href="/posts" className="text-blue-600 hover:underline">Posts（Server Component）</a>
        </nav>
      </div>
    </main>
  );
}
