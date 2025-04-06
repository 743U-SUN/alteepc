# alteePC - 自作PC初心者向けパーツ互換性チェック＆見積もりサイト

alteePC は自作PC初心者のためのパーツ互換性チェック＆簡易見積もりwebサイトです。

## このファイルは書き換えないこと
1. 最初に `list_allowed_directories` を使用して、アクセス可能なディレクトリを確認してください
2. アクセス可能なパスを使用して、プロジェクトディレクトリを作成してください
3. pnpmではなく、npmを使用すること。
4. エラーの特定のために適宜ログを出力するようにし、logsディレクトリに出力するようにすること。

## 開発状況

このプロジェクトは現在開発中です。
データベースではなく、まずはダミーデータ実装をしてください。
開発計画については [DEVELOPER.md](./DEVELOPER.md) を参照。

## 機能

### 1. PCパーツの互換性チェック
- CPUソケットとマザーボードソケットの一致
- CPUのメモリタイプとマザーボードの対応メモリタイプ
- RAMのタイプ/周波数とマザーボードの対応可否
- GPUの長さとケースの最大GPU長の適合
- CPUクーラーの高さとケースの最大クーラー高の適合
- 電源の奥行きとケースの最大電源長の適合
- 全パーツの消費電力合計と電源容量の適合性
- マザーボードサイズとケースの対応可否
- ラジエータサイズとケースの対応可否

### 2. PCパーツの簡易見積もり
- 最新の価格情報を自動更新
- 選択したパーツの合計金額をリアルタイム表示

### 3. URL発行機能
- アカウント登録不要でPC構成を保存・共有
- 短いユニークIDを使用した共有URL
- 90日間アクセスがないと自動削除

## 開発環境

- Node.js: v22.14.0
- Next.js: v14.2.26
- React: v18.3.1
- TypeScript: v5.4.5
- Prisma: v5.10.2
- TailwindCSS: v3.4.17
- PostgreSQL: v16.3.x
- cuid2: v2 (npm install @paralleldrive/cuid2)
- Docker

## クイックスタート

### Dockerを使用する場合

1. リポジトリをクローン
```bash
git clone <repository-url>
cd alteepc
```

2. Docker Composeでアプリケーションを起動
```bash
docker-compose up -d
```

3. ブラウザで http://localhost:3000 にアクセス

### ローカル環境で実行する場合

1. リポジトリをクローン
```bash
git clone <repository-url>
cd alteepc
```

2. 依存関係をインストール
```bash
npm install
```

3. 環境変数ファイルを設定
```bash
cp .env.example .env.local
```

4. 開発サーバーを起動
```bash
npm run dev
```

5. ブラウザで http://localhost:3000 にアクセス

## データベースのセットアップ (オプション)

現在の実装ではダミーデータを使用してください。
実際のデータベースを使用する場合：

```bash
# Prismaクライアントを生成
npm run prisma:generate

# データベースのマイグレーションとシード (PostgreSQLが必要)
npm run prisma:migrate
npm run prisma:seed
```

## 開発者向けガイド

詳細な開発者向けガイドは [DEVELOPER.md](./DEVELOPER.md) を参照してください。

## ライセンス

このプロジェクトは [MIT ライセンス](LICENSE) の下で公開されています。

## 参考

[PCPARTSPICKER](https://pcpartpicker.com/) を参考にすること。
