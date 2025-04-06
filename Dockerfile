FROM node:22-alpine AS base

# アプリディレクトリを作成
WORKDIR /app

# 依存関係のインストール
FROM base AS deps
COPY package*.json ./
RUN npm install

# ビルド
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 実行用コンテナ
FROM base AS runner
ENV NODE_ENV production

# アプリ実行に必要なユーザーを作成
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# ビルド成果物のコピー
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# 適切な権限の設定
USER nextjs

# ログディレクトリの作成と権限設定
RUN mkdir -p logs && chown -R nextjs:nodejs logs

# コンテナ起動コマンド
CMD ["npm", "start"]

# 使用するポート
EXPOSE 3000
