# デプロイ手順

## 1. Neon (PostgreSQL) セットアップ

1. https://neon.tech にアクセスしてサインアップ
2. "New Project" → プロジェクト名 `portfolio` で作成
3. "Connection string" をコピー（postgresql://... の形式）

## 2. AUTH_SECRET 生成

ターミナルで実行：
```bash
openssl rand -base64 32
```

## 3. DBマイグレーション実行

`.env.local` に `DATABASE_URL` を設定してから：
```bash
cd portfolio
npx prisma migrate dev --name init
```

## 4. Vercelデプロイ

1. https://vercel.com でGitHubアカウントでサインアップ
2. "Add New Project" → GitHubリポジトリ `web-portfolio` を選択
3. **Root Directory** を `portfolio` に変更（重要）
4. Environment Variables に追加：
   - `DATABASE_URL`: NeonのConnection string
   - `AUTH_SECRET`: Step 2で生成した値
5. Build Command を変更：
   ```
   npx prisma migrate deploy && npm run build
   ```
6. "Deploy" をクリック

## 5. 動作確認

デプロイ後のURL（https://xxx.vercel.app）で：
- `/register` でユーザー登録
- `/login` でログイン
- タスクのCRUDが動くことを確認
