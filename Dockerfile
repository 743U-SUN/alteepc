FROM node:22.14-alpine AS base

# 依存関係のインストール
FROM base AS deps
WORKDIR /app

# ビルドツールとOpenSSLをインストール（Prismaに必要）
RUN apk add --no-cache libc6-compat openssl-dev

# package.jsonとpackage-lock.jsonをコピー
COPY package.json package-lock.json ./
RUN npm ci

# ビルド
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prismaクライアントを生成
# Prisma 6では、クライアント生成時に追加オプションが必要
RUN npx prisma generate

# Next.jsアプリケーションをビルド
RUN npm run build

# 本番環境
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# 非ルートユーザーを作成して使用
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# OpenSSLをインストール（Prismaに必要）
RUN apk add --no-cache openssl

USER nextjs

# Next.jsのスタンドアロンモードのために必要なファイルをコピー
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Prismaクライアントの生成結果をコピー
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma

# ヘルスチェック用コマンド
HEALTHCHECK --interval=30s --timeout=15s --start-period=30s --retries=3 CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# アプリケーションを起動
CMD ["node", "server.js"]
