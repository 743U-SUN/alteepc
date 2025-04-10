# AlteePCデータ収集ガイドライン（CPU）

このガイドラインは、AlteePCプロジェクトのCPUデータ収集者向けに作成されました。データの一貫性と正確性を確保するために、以下のルールとガイドラインに従ってください。

## 基本ルール

1. **正確性**: 全てのデータは公式情報源（メーカーウェブサイト、製品仕様書など）から収集してください。
2. **最新性**: 最新の情報に基づいてデータを入力してください。
3. **完全性**: 可能な限り全ての項目を埋めてください。不明な場合は空欄にしてください。
4. **一貫性**: 指定されたフォーマットと単位を厳守してください。

## 必須項目

以下の項目は**必ず**入力してください:

* **manufacturer**: メーカー名（例: Intel, AMD）
* **model**: モデル名（例: Core i9-14900K, Ryzen 7 7800X3D）
* **socket**: ソケットタイプ（例: LGA1700, AM5）
* **cores**: コア数（整数）
* **threads**: スレッド数（整数）
* **price**: 価格（円、整数）

## フィールドごとの入力ルール

### 基本情報

| フィールド名 | 型 | 単位 | 入力例 | 備考 |
|-------------|-----|------|---------|------|
| manufacturer | テキスト | - | Intel, AMD | 正式な会社名を使用 |
| model | テキスト | - | Core i9-14900K | 正式なモデル名を使用 |
| socket | テキスト | - | LGA1700, AM5 | 正式なソケット名を使用 |
| cores | 数値（整数） | コア | 24 | 物理コア数 |
| threads | 数値（整数） | スレッド | 32 | 論理プロセッサ数 |
| baseClock | 数値（小数点） | GHz | 3.2 | ベースクロック周波数 |
| boostClock | 数値（小数点） | GHz | 6.0 | 最大ブーストクロック |
| tdp | 数値（整数） | W | 125 | 熱設計電力 |

### メモリ関連

| フィールド名 | 型 | 単位 | 入力例 | 備考 |
|-------------|-----|------|---------|------|
| supportedMemoryType | テキスト（複数） | - | DDR4\|DDR5 | パイプ区切り（\|）で入力 |
| maxMemorySpeed | 数値（整数） | MHz | 5600 | 公式仕様上の最大メモリ速度 |

### グラフィックス関連

| フィールド名 | 型 | 単位 | 入力例 | 備考 |
|-------------|-----|------|---------|------|
| integratedGraphics | はい/いいえ | - | Yes, No | 内蔵グラフィックスの有無 |
| integratedGraphicsModel | テキスト | - | Intel UHD Graphics 770 | 内蔵グラフィックスのモデル名（ない場合は空欄） |

### 価格・販売関連

| フィールド名 | 型 | 単位 | 入力例 | 備考 |
|-------------|-----|------|---------|------|
| price | 数値（整数） | 円 | 98800 | 基準価格（メーカー希望小売価格または市場平均） |
| releaseDate | 日付 | - | 2023-10-17 | 発売日（ISO形式: YYYY-MM-DD） |
| url | URL | - | https://example.com/product/i9-14900k | 製品の公式ページURL |
| imageUrl | URL | - | https://example.com/cpu1.jpg | 製品画像のURL |

### その他

| フィールド名 | 型 | 単位 | 入力例 | 備考 |
|-------------|-----|------|---------|------|
| recommendationScore | 数値（整数） | - | 80 | おすすめ度（0-100） |
| description | テキスト | - | 第14世代Intelプロセッサ... | 製品の簡単な説明文（オプション） |

## 値域チェックリスト

データ入力時に以下の範囲内の値を入力しているか確認してください:

- **cores**: 1～128の間の整数
- **threads**: 1～256の間の整数
- **baseClock**: 0～10 GHzの間の数値
- **boostClock**: 0～10 GHzの間の数値
- **tdp**: 0～500 Wの間の整数
- **price**: 0より大きい整数
- **releaseDate**: 未来の日付を入力しない
- **recommendationScore**: 0～100の間の整数

## データ検証手順

1. 全ての必須フィールドが入力されていることを確認
2. 数値が指定された範囲内に収まっていることを確認
3. 日付が有効な形式で入力されていることを確認
4. 重複がないことを確認（モデル名とメーカーの組み合わせは一意）
5. URLが有効かつアクセス可能であることを確認

## 価格データの更新ガイドライン

1. **基準価格**: メーカー希望小売価格を基準とします。公式情報がない場合は大手ショップ3店の平均価格を使用。
2. **更新頻度**: 基準価格は3ヶ月に一度更新。ショップ別価格は1ヶ月に一度更新。
3. **価格情報源**: 大手ECサイト（Amazon、ヨドバシカメラ、ツクモなど）の公式価格を使用。

## データエクスポート方法

1. Notionデータベースから「エクスポート」を選択
2. 形式として「CSV」を選択
3. エクスポートしたCSVファイルをインポートスクリプトで処理

## 問題発生時の対応

データ収集中に不明点や問題が発生した場合：

1. 公式ドキュメントを優先的に参照
2. 複数の情報源で内容を確認
3. それでも解決しない場合はプロジェクト管理者に相談

---

*このガイドラインは随時更新されます。最新版をご確認ください。*

*最終更新日: 2025年4月9日*