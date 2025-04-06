# alteePCの開発者向けガイド

## プロジェクト概要

alteePCは自作PC初心者向けのパーツ互換性チェック＆簡易見積もりwebサイトです。このプロジェクトは以下の目標を達成することを目指しています：

1. 初心者でも簡単に使える自作PCパーツ互換性チェックシステムの提供
2. リアルタイムな価格情報と合計金額の表示
3. アカウント不要で簡単に構成を共有できる機能の実装

## 開発環境

## プロジェクト構造

```
alteepc/
├── prisma/               # Prismaスキーマ定義
├── public/               # 静的ファイル
│   └── images/           # 画像ファイル
├── src/
│   ├── components/       # Reactコンポーネント
│   │   ├── builder/      # 構成ビルダー関連コンポーネント
│   │   └── layout/       # レイアウト関連コンポーネント
│   ├── data/             # ダミーデータ
│   ├── pages/            # Nextページコンポーネント
│   ├── styles/           # グローバルスタイル
│   └── utils/            # ユーティリティ関数
├── .env.example          # 環境変数サンプル
├── next.config.js        # Next.js設定
├── package.json          # パッケージ定義
├── tsconfig.json         # TypeScript設定
└── tailwind.config.js    # Tailwind CSS設定
```

## 開発ロードマップ

### フェーズ1: 基本機能実装（現在）

- [x] プロジェクト骨組み
- [x] UI/UXデザイン
- [x] ダミーデータによる互換性チェック機能
- [x] 共有URLの仕組み
- [x] 基本ページ実装

### フェーズ2: 機能拡張

- [ ] リアルタイムな価格情報取得API連携
- [ ] 詳細な互換性チェック機能の拡充
- [ ] パーツ詳細ページの実装
- [ ] パーツフィルター機能の強化

### フェーズ3: データベース実装

- [ ] PostgreSQLデータベース連携
- [ ] Prismaによるデータモデリング
- [ ] 管理画面の実装
- [ ] パーツデータの自動更新システム

## データモデル

### 仮想的なデータベースモデル設計

```prisma
// PC構成保存用モデル
model Configuration {
  id         String   @id @default(cuid())
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  lastAccess DateTime @default(now())
  
  // 選択されたパーツのID
  cpuId         String?
  motherboardId String?
  ramId         String?
  gpuId         String?
  caseId        String?
  powerSupplyId String?
  coolingId     String?
  storageIds    String[]
}

// 将来的には以下のようなモデルを実装予定
model CPU {
  id                String   @id
  name              String
  brand             String
  socket            String
  cores             Int
  threads           Int
  baseClock         Float
  boostClock        Float
  tdp               Int
  supportedMemoryType String[]
  price             Int
  imageUrl          String
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

// 他のパーツモデルも同様に実装予定
```

## 互換性チェックの仕組み

alteePCの核となる互換性チェックは、以下の項目をチェックします：

1. CPU × マザーボード: ソケット規格が一致するかチェック
2. マザーボード × メモリ: 対応するメモリタイプが一致するかチェック
3. マザーボード × ケース: フォームファクターが互換性を持つかチェック 
4. グラフィックカード × ケース: カードの長さがケース内に収まるかチェック
5. CPUクーラー × ケース: クーラーの高さがケース内に収まるかチェック
6. 電源 × ケース: 電源の奥行きがケース内に収まるかチェック
7. 全パーツ × 電源: 電源の容量が全パーツの消費電力合計を上回るかチェック
8. 水冷クーラー × ケース: ラジエーターサイズがケースでサポートされているかチェック

これらのチェックはフロントエンドで行われ、ユーザーに互換性の問題をリアルタイムで通知します。

## 共有URL機能の仕組み

構成の共有機能は以下のように動作します：

1. ユーザーがパーツを選択後、「共有URLを生成」ボタンをクリック
2. 選択されたパーツのIDのみを含むオブジェクトを作成
3. `cuid2`ライブラリを使用して一意のIDを生成
4. 構成データとIDをローカルストレージに保存
5. ユーザーに`/config/:id`形式の共有URLを提供
6. 共有URLにアクセスすると、ローカルストレージから構成を取得して表示
7. 最終アクセスから90日経過した構成は自動削除

## 将来の価格取得APIについて

フェーズ2で実装予定の価格情報取得APIは以下のような仕組みを想定しています：

1. PCパーツの価格情報を提供する外部APIとの連携（Kakaku APIなど）
2. 定期的なバックグラウンドジョブで価格情報を更新
3. Redis等を使用した価格情報のキャッシュ
4. ユーザーには常に最新の価格情報を表示

## テスト方針

1. ユニットテスト: 
   - 互換性チェック機能のテスト
   - URL生成/取得機能のテスト
   - パーツフィルタリング機能のテスト

2. 統合テスト:
   - コンポーネント間の相互作用のテスト
   - ページレンダリングのテスト

3. E2Eテスト:
   - ユーザーが実際に行う操作フローのテスト
   - 共有URL機能の動作確認

## デプロイ方法

### 開発環境

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### 本番環境

```bash
# 依存関係のインストール（開発依存を除く）
npm install --production

# 本番用ビルド
npm run build

# 本番サーバーの起動
npm start
```

### Docker環境

```bash
# Dockerイメージのビルド
docker build -t alteepc .

# コンテナの起動
docker-compose up -d
```

## コントリビュートガイド

### プルリクエストの手順

1. プロジェクトをフォーク
2. 新しいブランチを作成: `git checkout -b feature/your-feature-name`
3. 変更を加えてコミット: `git commit -m 'Add some feature'`
4. ブランチをプッシュ: `git push origin feature/your-feature-name`
5. プルリクエストを作成

### コーディング規約

- ESLintとPrettierの設定に従ってください
- コンポーネントはTypeScriptで書いてください
- コンポーネントはなるべく小さく、再利用可能に設計してください
- 命名規則はキャメルケース（camelCase）を使用してください

## リソースとリンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [React ドキュメント](https://reactjs.org/docs/getting-started.html)
- [TypeScript ドキュメント](https://www.typescriptlang.org/docs/)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [Prisma ドキュメント](https://www.prisma.io/docs/)

## パフォーマンス最適化

- 画像はWebPフォーマットに変換し、複数サイズで提供
- コードスプリッティングとレイジーローディングの活用
- メモ化によるレンダリングパフォーマンスの最適化
- サーバーサイドレンダリングとスタティックジェネレーションの適切な使用

## ライセンス

このプロジェクトは [MIT ライセンス](LICENSE) の下で公開されています。
