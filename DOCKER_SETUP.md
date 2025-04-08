# Docker環境セットアップ手順

このドキュメントではalteePC（自作PC初心者向けパーツ互換性チェック＆見積もりサイト）のDocker環境のセットアップ方法とデータベース移行手順について説明します。

## 必要条件

- Docker Desktop または Docker Engine + Docker Compose
- Node.js 18.x以上（ローカル開発用）
- Git
- WSL2（Windowsの場合）

## Docker環境の構築方法

### 1. リポジトリのクローン

```bash
git clone [リポジトリURL]
cd alteepc
```

### 2. 環境変数の設定

`.env.example` ファイルを `.env` にコピーして必要に応じて設定を変更します。

```bash
cp .env.example .env
```

主な設定項目：
- `NODE_ENV`: 環境設定（development/production）
- `USE_DATABASE`: データベース利用有無（true/false）
- `DATABASE_URL`: データベース接続URL
- `POSTGRES_USER`: PostgreSQLユーザー名
- `POSTGRES_PASSWORD`: PostgreSQLパスワード
- `POSTGRES_DB`: PostgreSQLデータベース名

### 3. Docker環境のビルドと起動

#### Dockerイメージのビルド

```bash
# 初回またはDockerfileを変更した場合はビルドが必要です
docker-compose build

# package.jsonに定義されている場合は
# npm run docker:build
```

**ビルドが必要なタイミング**:
- 初回環境構築時
- Dockerfileを変更した時
- アプリケーションコードに大きな変更があった時

#### コンテナの起動

##### 本番環境（ビルド済みアプリ）

```bash
# package.jsonに定義されているスクリプトを使用
npm run docker:up

# または直接docker-composeコマンドを使用
docker-compose up -d
```

##### 開発環境（ホットリロード対応）

```bash
# package.jsonに定義されているスクリプトを使用
npm run docker:up:dev

# または直接docker-composeコマンドを使用
docker-compose --profile dev up -d
```

### 4. サービスの確認

Docker環境が正常に起動したら、以下のサービスが利用可能になります：

- **アプリケーション**:
  - 本番モード: http://localhost:3000
  - 開発モード: http://localhost:3001

- **データベース**:
  - PostgreSQL: localhost:5432
  - ユーザー名/パスワード: `.env`ファイルの設定値

## データベースマイグレーションについて

データベースマイグレーションとは、データベースのスキーマ（機能や構造）を変更するための体系的な方法です。

### マイグレーションとは

1. **スキーマの作成・更新**：
   - テーブル、カラム、インデックス、制約などのデータベース要素を定義
   - 例：新しいテーブルの追加、既存テーブルへのカラム追加、型変更など
   
2. **変更履歴の管理**：
   - 何をいつ変更したかを記録
   - チーム間でデータベース変更を共有可能に

3. **バージョン管理**：
   - データベースの完全な状態を特定のポイントに移動可能

### Prismaのマイグレーションプロセス

1. `schema.prisma` ファイルを編集して必要な変更を行う

2. マイグレーションを生成：
   ```bash
   npx prisma migrate dev --name 変更の名前
   ```
   
   例：
   ```bash
   npx prisma migrate dev --name add_user_table
   ```

3. 生成されるファイル：
   - `prisma/migrations/YYYYMMDDHHMMSS_変更の名前/migration.sql`
   - このファイルには必要なSQL文が自動生成されます

4. 生成されたSQLがデータベースに走ります

### 実行例

```bash
# Dockerコンテナ内で実行
docker-compose exec app npx prisma migrate dev

# またはローカルで実行（DATABASE_URLが正しく設定されている場合）
npx prisma migrate dev
```

### マイグレーションの注意点

- 本番環境では `prisma migrate deploy` を使用する（自動生成しない）
- データベース変更は適切なタイミングでコミットし、チームで共有
- 環境ごとにマイグレーション履歴は永続的に保存される

## シードデータ（初期データ）について

シードデータとは、データベースに初期投入されるデータのことです。アプリケーションテストや開発に必要な基本データを提供します。

### シードデータの場所と形式

1. **シードスクリプト**：
   - **場所**：`prisma/seed.ts`
   - **機能**：データソースからデータを読み込み、データベースに投入する

2. **データソース**：
   - **場所**：`src/lib/data/` ディレクトリ
   - **形式**：TypeScriptファイルでエクスポートされた配列
   - **例**：
     - `src/lib/data/cpus.ts` - CPUデータ
     - `src/lib/data/motherboards.ts` - マザーボードデータ
     - その他パーツのデータファイル

### データ形式の例

`src/lib/data/cpus.ts` のデータ形式例：

```typescript
import { createId } from '@paralleldrive/cuid2';

export interface CPU {
  id: string;
  manufacturer: string;
  model: string;
  // ... その他のプロパティ
}

// CPUダミーデータ
export const cpus: CPU[] = [
  {
    id: createId(),
    manufacturer: 'Intel',
    model: 'Core i9-14900K',
    // ... その他の属性
  },
  // ... その他のCPUデータ
];
```

### シードデータの実行方法

```bash
# Dockerコンテナ内で実行
docker-compose exec app npx prisma db seed

# またはローカルで実行（DATABASE_URLが正しく設定されている場合）
npx prisma db seed
```

### シードデータの更新方法

1. `src/lib/data/` ディレクトリ内の該当ファイルを編集
2. 新しいデータやファイルを追加する場合は `src/lib/data/index.ts` も更新
3. `prisma/seed.ts` を編集して新しいデータのインポートと挿入ロジックを追加
4. シードコマンドを再実行

### その他のデータソースからのインポート

シードスクリプトは必要に応じて以下のデータソースからもデータを読み込むように拡張可能です：

- **JSONファイル**：`fs.readFileSync` で読み込んで `JSON.parse` で処理
- **CSVファイル**：`csv-parser` などのライブラリを使用
- **外部API**：`fetch` や `axios` でデータを取得

固有のIDが必要な場合は、既存データのように `createId()` 関数を使用して生成するか、インポート済みのデータは自動生成されるIDを使用します。

## データ移行手順

alteePC はフェーズごとにデータ保存方法を移行します：

1. **フェーズ1**: インメモリデータ（JavaScriptオブジェクト）
2. **フェーズ2**: PostgreSQLデータベース（Dockerコンテナ）

### 移行手順のステップ

1. **Dockerコンテナの起動**
   ```bash
   # ビルドと起動を一度に行う
   docker-compose build && docker-compose up -d
   
   # または個別に実行
   docker-compose build
   docker-compose up -d
   ```

2. **データベースマイグレーションの実行**
   ```bash
   # Prismaマイグレーションを実行
   docker-compose exec app npx prisma migrate dev
   
   # または直接コンテナ内で実行
   docker-compose exec app sh -c "npx prisma migrate dev"
   ```

3. **初期データの投入**
   ```bash
   # シードスクリプトを実行
   docker-compose exec app npx prisma db seed
   
   # または直接コンテナ内で実行
   docker-compose exec app sh -c "npx prisma db seed"
   ```

4. **データベース利用モードに切り替え**
   
   `.env` ファイルを編集して `USE_DATABASE` を `true` に変更します：
   ```
   USE_DATABASE=true
   ```

5. **アプリケーションの再起動**
   ```bash
   # コンテナを再起動
   docker-compose restart app
   ```

### Prisma Studio の使用

データベースの内容を視覚的に確認・編集するには、Prisma Studio を使用できます：

```bash
# コンテナ内でPrisma Studioを起動
docker-compose exec app npx prisma studio
```

または、ローカル環境で：

```bash
npx prisma studio
```

Prisma Studio は通常 http://localhost:5555 で利用できます。

## Docker環境のメンテナンス

### コンテナの停止

```bash
# package.jsonに定義されているスクリプトを使用
npm run docker:down

# または直接docker-composeコマンドを使用
docker-compose down
```

### ログの確認

```bash
# すべてのサービスのログを確認
docker-compose logs -f

# 特定のサービスのログを確認
docker-compose logs -f app
docker-compose logs -f db
```

### データベースのバックアップ

```bash
# PostgreSQLデータベースのバックアップ
docker-compose exec db pg_dump -U postgres -d alteepc > backup_$(date +%Y%m%d).sql
```

### データベースの復元

```bash
# PostgreSQLデータベースの復元
cat backup_YYYYMMDD.sql | docker-compose exec -T db psql -U postgres -d alteepc
```

## よくある問題と解決方法

### データベース接続エラー

- **症状**: アプリケーションがデータベースに接続できない
- **解決方法**:
  1. `.env` ファイルの `DATABASE_URL` が正しいことを確認
  2. データベースコンテナが実行中であることを確認
  3. `docker-compose restart db` でデータベースを再起動

### ポートの競合

- **症状**: サービスの起動時に「ポートが既に使用されています」エラー
- **解決方法**:
  1. 競合しているサービスを終了
  2. `docker-compose.yml` でポート設定を変更

### ボリュームが正しく作成されない

- **症状**: データベースデータが永続化されない
- **解決方法**:
  1. `docker-compose down -v` でボリュームを含めて削除
  2. `docker-compose up -d` で再作成

## 注意点

- 本番環境では、環境変数の `POSTGRES_PASSWORD` を必ず強力なものに変更してください
- データベースのバックアップを定期的に行うことをお勧めします
- Docker環境でのパフォーマンスチューニングは、ホストマシンのリソースに依存します
