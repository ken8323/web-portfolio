export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">About</h1>
        <p className="text-gray-600">
          これはNext.js App Routerのルーティング練習ページです。
          <code className="bg-gray-200 px-1 rounded">app/about/page.tsx</code> が
          <code className="bg-gray-200 px-1 rounded">/about</code> に対応します。
        </p>
        <a href="/" className="text-blue-600 hover:underline mt-4 block">← ホームへ戻る</a>
      </div>
    </main>
  );
}
