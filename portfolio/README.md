# タスク管理アプリ

フルスタックWebアプリケーションの学習用ポートフォリオです。

## デモ

🔗 [Vercelデプロイ後にURLを記入]

## 機能

- ユーザー登録・ログイン（JWT認証）
- タスクの作成・一覧表示・ステータス変更・削除
- レスポンシブデザイン（モバイル対応）

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Next.js 15 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| データベース | PostgreSQL (Neon) |
| ORM | Prisma |
| 認証 | NextAuth.js v5 |
| デプロイ | Vercel |

## ローカル起動手順

```bash
git clone https://github.com/<your-username>/web-portfolio.git
cd web-portfolio/portfolio
npm install
cp .env.example .env.local
# .env.local に DATABASE_URL と AUTH_SECRET を設定
npx prisma migrate dev --name init
npm run dev
```

## 設計のポイント

- **Server Actions**: フォーム送信をServer Actionsで処理し、API Routes実装を最小化
- **型安全**: PrismaスキーマからTypeScriptの型を自動生成し、DBとUIで型を共有
- **認証ガード**: middlewareで全ページを保護し、未認証ユーザーを自動リダイレクト
