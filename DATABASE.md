# alteePC データベース設計

このドキュメントはalteePC（自作PC初心者向けパーツ互換性チェック＆見積もりサイト）のデータベース設計について記述しています。

## データベース概要

### 選定技術

- **データベース**: PostgreSQL v16.3
- **ORM**: Prisma v5.10.2
- **ID生成**: cuid2 (衝突の可能性が低く、順序を保持するID)
- **初期実装**: ダミーデータによるモック（データベースなし）
- **本番環境**: Dockerコンテナ化されたPostgreSQLインスタンス

### 移行計画

1. 初期フェーズ: JavaScriptオブジェクトとしてのダミーデータ
2. 開発フェーズ: ローカルPostgreSQLインスタンスとPrisma
3. 本番フェーズ: 本番環境でのPostgreSQLへの接続

## データモデル詳細

### CPU

```typescript
interface CPU {
  id: string;              // cuid2で生成された一意のID
  manufacturer: string;    // Intel, AMD など
  model: string;           // Core i7-13700K など
  socket: string;          // LGA1700, AM5 など
  cores: number;           // コア数
  threads: number;         // スレッド数
  baseClock: number;       // ベースクロック (GHz)
  boostClock: number;      // ブーストクロック (GHz)
  tdp: number;             // 熱設計電力 (W)
  supportedMemoryType: string[]; // "DDR4", "DDR5" など
  maxMemorySpeed: number;  // 最大メモリ速度 (MHz)
  integratedGraphics: boolean; // 内蔵グラフィックスの有無
  price: number;           // 価格 (円)
  releaseDate: string;     // 発売日 (ISO 8601形式)
  url: string;             // 製品ページURL
  imageUrl: string;        // 画像URL
  recommendationScore: number; // おすすめ度スコア（高いほどおすすめ）
  createdAt: Date;         // データ作成日時
  updatedAt: Date;         // データ更新日時
}
```

```prisma
// 将来的なPrismaスキーマ
model CPU {
  id                  String    @id @default(cuid())
  manufacturer        String
  model               String
  socket              String
  cores               Int
  threads             Int
  baseClock           Float
  boostClock          Float
  tdp                 Int
  supportedMemoryType String[]
  maxMemorySpeed      Int
  integratedGraphics  Boolean
  price               Int
  releaseDate         DateTime
  url                 String
  imageUrl            String
  recommendationScore Int       @default(0)
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt
  
  // リレーション
  builds              PCBuild[]
  
  @@index([manufacturer])
  @@index([socket])
  @@index([price])
  @@index([recommendationScore])
}
```

### マザーボード

```typescript
interface Motherboard {
  id: string;              // cuid2で生成された一意のID
  manufacturer: string;    // ASUS, MSI など
  model: string;           // ROG STRIX Z790-E など
  socket: string;          // LGA1700, AM5 など
  chipset: string;         // Z790, X670 など
  formFactor: string;      // ATX, Micro-ATX, Mini-ITX など
  memoryType: string[];    // "DDR4", "DDR5" など
  memorySlots: number;     // メモリスロット数
  maxMemorySpeed: number;  // 最大メモリ速度 (MHz)
  maxMemory: number;       // 最大メモリ容量 (GB)
  pciSlots: {              // PCIスロット
    pcie5: number;         // PCIe 5.0 スロット数
    pcie4: number;         // PCIe 4.0 スロット数
    pcie3: number;         // PCIe 3.0 スロット数
  };
  sataConnectors: number;  // SATAコネクタ数
  m2Slots: number;         // M.2スロット数
  price: number;           // 価格 (円)
  releaseDate: string;     // 発売日
  url: string;             // 製品ページURL
  imageUrl: string;        // 画像URL
  recommendationScore: number; // おすすめ度スコア（高いほどおすすめ）
  createdAt: Date;         // データ作成日時
  updatedAt: Date;         // データ更新日時
}
```

```prisma
// 将来的なPrismaスキーマ
model Motherboard {
  id                String    @id @default(cuid())
  manufacturer      String
  model             String
  socket            String
  chipset           String
  formFactor        String
  memoryType        String[]
  memorySlots       Int
  maxMemorySpeed    Int
  maxMemory         Int
  pcie5Slots        Int
  pcie4Slots        Int
  pcie3Slots        Int
  sataConnectors    Int
  m2Slots           Int
  price             Int
  releaseDate       DateTime
  url               String
  imageUrl          String
  recommendationScore Int    @default(0)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  // リレーション
  builds            PCBuild[]
  
  @@index([manufacturer])
  @@index([socket])
  @@index([formFactor])
  @@index([price])
  @@index([recommendationScore])
}
```

### メモリ (RAM)

```typescript
interface Memory {
  id: string;              // cuid2で生成された一意のID
  manufacturer: string;    // Corsair, G.Skill など
  model: string;           // Vengeance LPX など
  type: string;            // "DDR4", "DDR5" など
  capacity: number;        // 容量 (GB)
  speed: number;           // 速度 (MHz)
  modules: number;         // モジュール数 (例: 2枚組など)
  casLatency: number;      // CASレイテンシ
  voltage: number;         // 動作電圧 (V)
  heatspreader: boolean;   // ヒートスプレッダーの有無
  rgb: boolean;            // RGB対応の有無
  price: number;           // 価格 (円)
  url: string;             // 製品ページURL
  imageUrl: string;        // 画像URL
  recommendationScore: number; // おすすめ度スコア（高いほどおすすめ）
  createdAt: Date;         // データ作成日時
  updatedAt: Date;         // データ更新日時
}
```

```prisma
// 将来的なPrismaスキーマ
model Memory {
  id                String    @id @default(cuid())
  manufacturer      String
  model             String
  type              String
  capacity          Int
  speed             Int
  modules           Int
  casLatency        Int
  voltage           Float
  heatspreader      Boolean
  rgb               Boolean
  price             Int
  url               String
  imageUrl          String
  recommendationScore Int    @default(0)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  // リレーション
  buildMemories     BuildMemory[]
  
  @@index([manufacturer])
  @@index([type])
  @@index([capacity])
  @@index([speed])
  @@index([price])
  @@index([recommendationScore])
}
```

### グラフィックカード (GPU)

```typescript
interface GPU {
  id: string;              // cuid2で生成された一意のID
  manufacturer: string;    // NVIDIA, AMD など
  brand: string;           // ASUS, MSI など (AIBパートナー)
  model: string;           // GeForce RTX 4080, Radeon RX 7900 XT など
  memory: number;          // VRAM容量 (GB)
  memoryType: string;      // "GDDR6", "GDDR6X" など
  baseClock: number;       // ベースクロック (MHz)
  boostClock: number;      // ブーストクロック (MHz)
  tdp: number;             // 熱設計電力 (W)
  length: number;          // 長さ (mm)
  width: number;           // 幅 (mm)
  height: number;          // 高さ (mm)
  requiredPciSlots: number; // 必要なPCIスロット数
  powerConnectors: string[]; // "8-pin", "16-pin" など
  recommendedPsu: number;  // 推奨電源ワット数 (W)
  price: number;           // 価格 (円)
  url: string;             // 製品ページURL
  imageUrl: string;        // 画像URL
  recommendationScore: number; // おすすめ度スコア（高いほどおすすめ）
  createdAt: Date;         // データ作成日時
  updatedAt: Date;         // データ更新日時
}
```

```prisma
// 将来的なPrismaスキーマ
model GPU {
  id                String    @id @default(cuid())
  manufacturer      String    // チップメーカー
  brand             String    // 製造メーカー
  model             String
  memory            Int
  memoryType        String
  baseClock         Int
  boostClock        Int
  tdp               Int
  length            Int
  width             Int
  height            Int
  requiredPciSlots  Int
  powerConnectors   String[]
  recommendedPsu    Int
  price             Int
  url               String
  imageUrl          String
  recommendationScore Int    @default(0)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  // リレーション
  builds            PCBuild[]
  
  @@index([manufacturer])
  @@index([brand])
  @@index([memory])
  @@index([price])
  @@index([recommendationScore])
}
```

### ストレージ (SSD/HDD)

```typescript
interface Storage {
  id: string;              // cuid2で生成された一意のID
  manufacturer: string;    // Samsung, Western Digital など
  model: string;           // 970 EVO Plus, Blue SN570 など
  type: string;            // SSD, HDD
  formFactor: string;      // 2.5", M.2, 3.5" など
  interface: string;       // SATA, NVMe (PCIe 3.0/4.0) など
  capacity: number;        // 容量 (GB)
  readSpeed: number;       // 読み取り速度 (MB/s)
  writeSpeed: number;      // 書き込み速度 (MB/s)
  cache: number;           // キャッシュ (MB)
  tbw: number;             // 総書き込み容量 (TBW)、SSDのみ
  price: number;           // 価格 (円)
  url: string;             // 製品ページURL
  imageUrl: string;        // 画像URL
  recommendationScore: number; // おすすめ度スコア（高いほどおすすめ）
  createdAt: Date;         // データ作成日時
  updatedAt: Date;         // データ更新日時
}
```

```prisma
// 将来的なPrismaスキーマ
model Storage {
  id                String    @id @default(cuid())
  manufacturer      String
  model             String
  type              String
  formFactor        String
  interface         String
  capacity          Int
  readSpeed         Int
  writeSpeed        Int
  cache             Int
  tbw               Int?      // SSDのみ
  price             Int
  url               String
  imageUrl          String
  recommendationScore Int    @default(0)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  // リレーション
  buildStorages     BuildStorage[]
  
  @@index([manufacturer])
  @@index([type])
  @@index([formFactor])
  @@index([interface])
  @@index([capacity])
  @@index([price])
  @@index([recommendationScore])
}
```

### 電源ユニット (PSU)

```typescript
interface PSU {
  id: string;              // cuid2で生成された一意のID
  manufacturer: string;    // Corsair, EVGA など
  model: string;           // RM850x など
  wattage: number;         // 定格出力 (W)
  formFactor: string;      // ATX, SFX など
  certification: string;   // 80PLUS (Bronze, Gold, Platinum など)
  modular: string;         // "Full", "Semi", "Non" (フル/セミ/非モジュラー)
  length: number;          // 奥行き (mm)
  fanSize: number;         // ファンサイズ (mm)
  efficiency: number;      // 効率 (%)
  protections: string[];   // 各種保護機能
  connectors: {            // コネクタ
    mainPower: string;     // メイン電源 (24pin など)
    cpu: string[];         // CPU電源 (4+4pin, 8pin など)
    pcie: string[];        // PCIe電源 (6+2pin, 16pin など)
    sata: number;          // SATA電源数
    molex: number;         // Molex電源数
  };
  price: number;           // 価格 (円)
  url: string;             // 製品ページURL
  imageUrl: string;        // 画像URL
  recommendationScore: number; // おすすめ度スコア（高いほどおすすめ）
  createdAt: Date;         // データ作成日時
  updatedAt: Date;         // データ更新日時
}
```

```prisma
// 将来的なPrismaスキーマ
model PSU {
  id                String    @id @default(cuid())
  manufacturer      String
  model             String
  wattage           Int
  formFactor        String
  certification     String
  modular           String
  length            Int
  fanSize           Int
  efficiency        Int
  protections       String[]
  connectors        Json      // コネクタ情報をJSON形式で格納
  price             Int
  url               String
  imageUrl          String
  recommendationScore Int    @default(0)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  // リレーション
  builds            PCBuild[]
  
  @@index([manufacturer])
  @@index([wattage])
  @@index([formFactor])
  @@index([certification])
  @@index([price])
  @@index([recommendationScore])
}
```

### PCケース

```typescript
interface Case {
  id: string;              // cuid2で生成された一意のID
  manufacturer: string;    // Fractal Design, NZXT など
  model: string;           // Meshify 2 Compact など
  formFactor: string;      // "Mid Tower", "Full Tower", "SFF" など
  supportedMotherboards: string[]; // "ATX", "Micro-ATX", "Mini-ITX" など
  dimensions: {           // ケースサイズ
    width: number;         // 幅 (mm)
    height: number;        // 高さ (mm)
    depth: number;         // 奥行き (mm)
  };
  maxCoolerHeight: number; // 最大CPUクーラー高さ (mm)
  maxGpuLength: number;    // 最大GPU長さ (mm)
  maxPsuLength: number;    // 最大電源長さ (mm)
  driveSlots: {           // ドライブベイ
    internal25: number;    // 内部2.5インチベイ数
    internal35: number;    // 内部3.5インチベイ数
  };
  expansionSlots: number;  // 拡張スロット数
  frontPorts: string[];    // フロントパネルポート
  includedFans: {          // 付属ファン
    front: number;         // 前面ファン数
    top: number;           // 上部ファン数
    rear: number;          // 背面ファン数
    side: number;          // サイドファン数
    bottom: number;        // 底面ファン数
  };
  fanMountingOptions: {    // ファン取付可能箇所
    front: string[];       // 前面 ["120mm", "140mm", "3x120mm" など]
    top: string[];         // 上部
    rear: string[];        // 背面
    side: string[];        // サイド
    bottom: string[];      // 底面
  };
  radiatorSupport: {       // ラジエータ取付可能箇所
    front: string[];       // 前面 ["120mm", "240mm", "280mm", "360mm" など]
    top: string[];         // 上部
    rear: string[];        // 背面
    side: string[];        // サイド
    bottom: string[];      // 底面
  };
  colorOptions: string[];  // カラーオプション
  sideWindow: boolean;     // サイドウィンドウの有無
  price: number;           // 価格 (円)
  url: string;             // 製品ページURL
  imageUrl: string;        // 画像URL
  recommendationScore: number; // おすすめ度スコア（高いほどおすすめ）
  createdAt: Date;         // データ作成日時
  updatedAt: Date;         // データ更新日時
}
```

```prisma
// 将来的なPrismaスキーマ
model Case {
  id                    String    @id @default(cuid())
  manufacturer          String
  model                 String
  formFactor            String
  supportedMotherboards String[]
  width                 Int
  height                Int
  depth                 Int
  maxCoolerHeight       Int
  maxGpuLength          Int
  maxPsuLength          Int
  internal25Slots       Int
  internal35Slots       Int
  expansionSlots        Int
  frontPorts            String[]
  includedFans          Json
  fanMountingOptions    Json
  radiatorSupport       Json
  colorOptions          String[]
  sideWindow            Boolean
  price                 Int
  url                   String
  imageUrl              String
  recommendationScore   Int      @default(0)
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  
  // リレーション
  builds                PCBuild[]
  
  @@index([manufacturer])
  @@index([formFactor])
  @@index([price])
  @@index([recommendationScore])
}
```

### CPUクーラー

```typescript
interface CPUCooler {
  id: string;              // cuid2で生成された一意のID
  manufacturer: string;    // Noctua, be quiet! など
  model: string;           // NH-D15, Dark Rock Pro 4 など
  type: string;            // "Air", "AIO", "Custom Loop" など
  height: number;          // 高さ (mm) - 空冷の場合
  radiatorSize: string;    // "120mm", "240mm", "360mm" など - 水冷の場合
  fanSize: number;         // ファンサイズ (mm)
  fanCount: number;        // ファン数
  tdp: number;             // 対応TDP (W)
  socket: string[];        // 対応ソケット ["LGA1700", "AM5" など]
  noise: number;           // 騒音レベル (dB)
  rpm: {                   // RPM範囲
    min: number;
    max: number;
  };
  rgb: boolean;            // RGB対応の有無
  price: number;           // 価格 (円)
  url: string;             // 製品ページURL
  imageUrl: string;        // 画像URL
  recommendationScore: number; // おすすめ度スコア（高いほどおすすめ）
  createdAt: Date;         // データ作成日時
  updatedAt: Date;         // データ更新日時
}
```

```prisma
// 将来的なPrismaスキーマ
model CPUCooler {
  id                String    @id @default(cuid())
  manufacturer      String
  model             String
  type              String
  height            Int?      // 空冷の場合
  radiatorSize      String?   // 水冷の場合
  fanSize           Int
  fanCount          Int
  tdp               Int
  socket            String[]
  noise             Float
  rpmMin            Int
  rpmMax            Int
  rgb               Boolean
  price             Int
  url               String
  imageUrl          String
  recommendationScore Int    @default(0)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  // リレーション
  builds            PCBuild[]
  
  @@index([manufacturer])
  @@index([type])
  @@index([price])
  @@index([recommendationScore])
}
```

### ファン

```typescript
interface Fan {
  id: string;              // cuid2で生成された一意のID
  manufacturer: string;    // Noctua, Corsair など
  model: string;           // NF-A12x25, LL120 RGB など
  size: number;            // サイズ (mm)
  rpm: {                   // RPM範囲
    min: number;
    max: number;
  };
  airflow: number;         // 風量 (CFM)
  staticPressure: number;  // 静圧 (mmH2O)
  noise: number;           // 騒音レベル (dB)
  pwm: boolean;            // PWM対応の有無
  connector: string;       // "3-pin", "4-pin" など
  rgb: boolean;            // RGB対応の有無
  price: number;           // 価格 (円)
  url: string;             // 製品ページURL
  imageUrl: string;        // 画像URL
  recommendationScore: number; // おすすめ度スコア（高いほどおすすめ）
  createdAt: Date;         // データ作成日時
  updatedAt: Date;         // データ更新日時
}
```

```prisma
// 将来的なPrismaスキーマ
model Fan {
  id                String    @id @default(cuid())
  manufacturer      String
  model             String
  size              Int
  rpmMin            Int
  rpmMax            Int
  airflow           Float
  staticPressure    Float
  noise             Float
  pwm               Boolean
  connector         String
  rgb               Boolean
  price             Int
  url               String
  imageUrl          String
  recommendationScore Int    @default(0)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  // リレーション
  buildFans         BuildFan[]
  
  @@index([manufacturer])
  @@index([size])
  @@index([price])
  @@index([recommendationScore])
}
```

### PC構成モデル

```typescript
interface PCBuild {
  id: string;              // cuid2で生成された一意のID
  createdAt: Date;         // 作成日時
  lastAccessedAt: Date;    // 最終アクセス日時
  expiresAt: Date;         // 有効期限 (90日後)
  components: {
    cpu: string | null;           // CPU ID
    motherboard: string | null;   // マザーボード ID
    memory: string[] | null;      // メモリ ID配列
    gpu: string | null;           // GPU ID
    storage: string[] | null;     // ストレージ ID配列
    psu: string | null;           // 電源 ID
    case: string | null;          // ケース ID
    cpuCooler: string | null;     // CPUクーラー ID
    fans: string[] | null;        // 追加ファン ID配列
  };
  compatibilityIssues: CompatibilityIssue[]; // 互換性の問題
  totalPrice: number;      // 合計価格
  name: string | null;     // ユーザー定義の構成名 (オプション)
  accessCount: number;     // アクセス回数
}

interface CompatibilityIssue {
  type: string;            // 問題の種類
  severity: 'critical' | 'warning' | 'info'; // 深刻度
  message: string;         // 表示メッセージ
  components: string[];    // 関連コンポーネント
}
```

```prisma
// 将来的なPrismaスキーマ
model PCBuild {
  id              String    @id @default(cuid())
  createdAt       DateTime  @default(now())
  lastAccessedAt  DateTime  @default(now())
  expiresAt       DateTime
  name            String?
  totalPrice      Int
  accessCount     Int       @default(0)
  compatibilityIssues Json? // JSON形式で互換性問題を保存
  
  // コンポーネントリレーション
  cpu             CPU?      @relation(fields: [cpuId], references: [id])
  cpuId           String?
  
  motherboard     Motherboard? @relation(fields: [motherboardId], references: [id])
  motherboardId   String?
  
  memories        BuildMemory[]
  
  gpu             GPU?      @relation(fields: [gpuId], references: [id])
  gpuId           String?
  
  storages        BuildStorage[]
  
  psu             PSU?      @relation(fields: [psuId], references: [id])
  psuId           String?
  
  case            Case?     @relation(fields: [caseId], references: [id])
  caseId          String?
  
  cpuCooler       CPUCooler? @relation(fields: [cpuCoolerId], references: [id])
  cpuCoolerId     String?
  
  fans            BuildFan[]
  
  @@index([createdAt])
  @@index([lastAccessedAt])
  @@index([expiresAt])
}

// 多対多関係を表す中間テーブル
model BuildMemory {
  build           PCBuild    @relation(fields: [buildId], references: [id], onDelete: Cascade)
  buildId         String
  memory          Memory     @relation(fields: [memoryId], references: [id])
  memoryId        String
  quantity        Int        @default(1)
  
  @@id([buildId, memoryId])
}

model BuildStorage {
  build           PCBuild    @relation(fields: [buildId], references: [id], onDelete: Cascade)
  buildId         String
  storage         Storage    @relation(fields: [storageId], references: [id])
  storageId       String
  quantity        Int        @default(1)
  
  @@id([buildId, storageId])
}

model BuildFan {
  build           PCBuild    @relation(fields: [buildId], references: [id], onDelete: Cascade)
  buildId         String
  fan             Fan        @relation(fields: [fanId], references: [id])
  fanId           String
  quantity        Int        @default(1)
  mountPosition   String?   // "front", "top", "rear", "side", "bottom"
  
  @@id([buildId, fanId])
}
```

## おすすめ順の実装

各パーツには `recommendationScore` フィールドを追加しました。このフィールドを利用して、以下のようにおすすめ順を実装できます：

### おすすめ順の設定方法

**管理者による手動設定**
  - 管理ツールを通じて各パーツの `recommendationScore` を設定
  - 0〜100の範囲で設定し、デフォルト値は0
  - 値が高いほどおすすめ度が高い


## データシード戦略

### ダミーデータの実装

初期フェーズでは、以下のファイル構造でダミーデータを実装します。

```
src/lib/data/
├── index.ts           // すべてのデータをエクスポート
├── cpus.ts            // CPUデータ
├── motherboards.ts    // マザーボードデータ
├── memories.ts        // メモリデータ
├── gpus.ts            // GPUデータ
├── storages.ts        // ストレージデータ
├── psus.ts            // 電源データ
├── cases.ts           // ケースデータ
├── coolers.ts         // CPUクーラーデータ
└── fans.ts            // ファンデータ
```

例として、CPUのダミーデータファイル:

```typescript
// src/lib/data/cpus.ts
import { createId } from '@paralleldrive/cuid2';

export const cpus = [
  {
    id: createId(),
    manufacturer: 'Intel',
    model: 'Core i9-14900K',
    socket: 'LGA1700',
    cores: 24,
    threads: 32,
    baseClock: 3.2,
    boostClock: 6.0,
    tdp: 125,
    supportedMemoryType: ['DDR4', 'DDR5'],
    maxMemorySpeed: 5600,
    integratedGraphics: true,
    price: 69800,
    releaseDate: '2023-10-17',
    url: 'https://example.com/products/intel-i9-14900k',
    imageUrl: '/images/parts/cpu/intel_i9_14900k.jpg',
    recommendationScore: 90, // 高いおすすめ度
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // 他のCPUデータ...
];
```

### 本番データシード

開発フェーズや本番フェーズでは、Prismaのシード機能を使用して初期データを投入します。

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { cpus } from '../src/lib/data/cpus';
import { motherboards } from '../src/lib/data/motherboards';
// 他のデータをインポート

const prisma = new PrismaClient();

async function main() {
  // CPUデータのシード
  for (const cpu of cpus) {
    await prisma.cPU.upsert({
      where: { id: cpu.id },
      update: {},
      create: cpu,
    });
  }
  
  // マザーボードデータのシード
  for (const motherboard of motherboards) {
    await prisma.motherboard.upsert({
      where: { id: motherboard.id },
      update: {},
      create: motherboard,
    });
  }
  
  // 他のデータもシード
  // ...
  
  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

## インデックス戦略

主要な検索パターンに基づいて、以下のフィールドにインデックスを作成します：

1. **CPU**: `manufacturer`, `socket`, `price`, `recommendationScore`
2. **マザーボード**: `manufacturer`, `socket`, `formFactor`, `price`, `recommendationScore`
3. **メモリ**: `type`, `capacity`, `speed`, `price`, `recommendationScore`
4. **GPU**: `manufacturer`, `brand`, `memory`, `price`, `recommendationScore`
5. **ストレージ**: `type`, `formFactor`, `interface`, `capacity`, `price`, `recommendationScore`
6. **電源**: `wattage`, `formFactor`, `certification`, `price`, `recommendationScore`
7. **ケース**: `formFactor`, `price`, `recommendationScore`
8. **CPUクーラー**: `type`, `price`, `recommendationScore`
9. **ファン**: `size`, `price`, `recommendationScore`
10. **PCBuild**: `createdAt`, `lastAccessedAt`, `expiresAt`

## 期限切れデータの処理

アクセスがない構成データは自動的に削除するためのスケジュールタスクを実装します：

```typescript
// データ期限切れ確認のジョブ
async function cleanupExpiredBuilds() {
  const now = new Date();
  const expiredBuilds = await prisma.pCBuild.findMany({
    where: {
      expiresAt: {
        lt: now
      }
    }
  });
  
  console.log(`Deleting ${expiredBuilds.length} expired builds...`);
  
  await prisma.pCBuild.deleteMany({
    where: {
      expiresAt: {
        lt: now
      }
    }
  });
}
```

## データアクセスサービス

データアクセスを抽象化するサービス層を実装します：

```typescript
// src/services/parts-service.ts
import { cpus, motherboards, memories, gpus, storages, psus, cases, coolers, fans } from '../lib/data/index';

export class PartsService {
  // CPUの取得（おすすめ順対応）
  async getCPUs(filters = {}, sortBy = 'recommended') {
    let filteredCPUs = [...cpus];
    
    // フィルタリングロジック
    if (filters.manufacturer) {
      filteredCPUs = filteredCPUs.filter(cpu => 
        cpu.manufacturer === filters.manufacturer
      );
    }
    
    if (filters.socket) {
      filteredCPUs = filteredCPUs.filter(cpu => 
        cpu.socket === filters.socket
      );
    }
    
    // ソートロジック
    switch (sortBy) {
      case 'recommended':
        filteredCPUs.sort((a, b) => b.recommendationScore - a.recommendationScore);
        break;
      case 'price_asc':
        filteredCPUs.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredCPUs.sort((a, b) => b.price - a.price);
        break;
      case 'cores_desc':
        filteredCPUs.sort((a, b) => b.cores - a.cores);
        break;
      default:
        // デフォルトはおすすめ順
        filteredCPUs.sort((a, b) => b.recommendationScore - a.recommendationScore);
    }
    
    return filteredCPUs;
  }
  
  // CPU詳細の取得
  async getCPUById(id) {
    return cpus.find(cpu => cpu.id === id) || null;
  }
  
  // 他のパーツタイプに対する同様のメソッド...
}
```

## 互換性チェックサービスとPC構成管理サービス

互換性チェックの詳細なアルゴリズムとサービス層の実装については、[DEVELOPER.md](./DEVELOPER.md) を参照してください。アプリケーションの中心機能である互換性チェックやPC構成管理の実装詳細が記載されています。
```

## まとめ

本データベース設計では、alteePC（自作PC初心者向けパーツ互換性チェック＆見積もりサイト）のデータモデル、リレーション、インデックス、およびデータアクセス戦略を詳細に定義しました。初期フェーズではダミーデータを使用し、段階的にPostgreSQLとPrismaを導入する計画です。

互換性チェック、URL共有機能、PC構成の保存・取得など、アプリケーションの主要機能をサポートするデータモデルと処理ロジックを設計しており、パフォーマンスとセキュリティに配慮しています。
