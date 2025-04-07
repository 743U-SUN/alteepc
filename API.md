# alteePC API設計

このドキュメントはalteePC（自作PC初心者向けパーツ互換性チェック＆見積もりサイト）のAPI設計を記述したものです。

## API概要

初期実装ではクライアントサイドでダミーデータを使用しますが、将来的にはREST APIを通じてデータを取得・操作します。

## エンドポイント一覧

### パーツデータAPI

#### パーツ一覧取得

```
GET /api/parts/:category
```

- **説明**: 特定カテゴリのパーツ一覧を取得
- **パスパラメータ**:
  - `category`: パーツカテゴリ (cpu, motherboard, memory, gpu, case, psu, cpu-cooler, storage, fan)
- **クエリパラメータ**:
  - `filter`: フィルタリング条件 (オプション)
  - `sort`: ソート条件 (オプション)
  - `page`: ページ番号 (オプション、デフォルト: 1)
  - `limit`: 1ページあたりの件数 (オプション、デフォルト: 20)
- **レスポンス例**:

```json
{
  "items": [
    {
      "id": "cpu_001",
      "manufacturer": "Intel",
      "model": "Core i7-13700K",
      "socket": "LGA1700",
      "cores": 16,
      "threads": 24,
      "price": 39980,
      "imageUrl": "/images/cpu/intel_i7_13700k.jpg"
    },
    ...
  ],
  "total": 120,
  "page": 1,
  "limit": 20
}
```

#### パーツ詳細取得

```
GET /api/parts/:category/:id
```

- **説明**: 特定パーツの詳細情報を取得
- **パスパラメータ**:
  - `category`: パーツカテゴリ
  - `id`: パーツID
- **レスポンス例**:

```json
{
  "id": "cpu_001",
  "manufacturer": "Intel",
  "model": "Core i7-13700K",
  "socket": "LGA1700",
  "cores": 16,
  "threads": 24,
  "baseClock": 3.4,
  "boostClock": 5.4,
  "tdp": 125,
  "supportedMemoryType": ["DDR4", "DDR5"],
  "maxMemorySpeed": 5600,
  "integratedGraphics": true,
  "price": 39980,
  "releaseDate": "2022-10-20",
  "url": "https://example.com/products/intel-i7-13700k",
  "imageUrl": "/images/cpu/intel_i7_13700k.jpg"
}
```

### 互換性チェックAPI

```
POST /api/compatibility/check
```

- **説明**: 選択したパーツの互換性をチェック
- **リクエストボディ**:

```json
{
  "components": {
    "cpu": "cpu_001",
    "motherboard": "mb_003",
    "memory": ["ram_002", "ram_002"],
    "gpu": "gpu_005",
    "storage": ["storage_001", "storage_004"],
    "psu": "psu_002",
    "case": "case_001",
    "cpuCooler": "cooler_002",
    "fans": ["fan_001", "fan_001", "fan_001"]
  }
}
```

- **レスポンス例**:

```json
{
  "compatible": false,
  "issues": [
    {
      "type": "gpu_length",
      "severity": "critical",
      "message": "選択したGPUの長さ(320mm)がケースの最大GPU長(300mm)を超えています。",
      "components": ["gpu", "case"]
    },
    {
      "type": "memory_speed",
      "severity": "warning",
      "message": "選択したメモリの速度(6000MHz)がCPUの最大サポート速度(5600MHz)を超えています。メモリは低い速度で動作する可能性があります。",
      "components": ["memory", "cpu"]
    }
  ]
}
```

### PC構成保存・共有API

#### 構成の保存

```
POST /api/builds
```

- **説明**: PC構成を保存し、共有URLを生成
- **リクエストボディ**:

```json
{
  "components": {
    "cpu": "cpu_001",
    "motherboard": "mb_003",
    "memory": ["ram_002", "ram_002"],
    "gpu": "gpu_005",
    "storage": ["storage_001", "storage_004"],
    "psu": "psu_002",
    "case": "case_001",
    "cpuCooler": "cooler_002",
    "fans": ["fan_001", "fan_001", "fan_001"]
  }
}
```

- **レスポンス例**:

```json
{
  "id": "abcdef12",
  "url": "https://alteepc.jp/abcdef12",
  "createdAt": "2025-04-07T10:15:30Z",
  "expiresAt": "2025-07-06T10:15:30Z"
}
```

#### 構成の取得

```
GET /api/builds/:id
```

- **説明**: 保存されたPC構成を取得
- **パスパラメータ**:
  - `id`: 構成ID
- **レスポンス例**:

```json
{
  "id": "abcdef12",
  "createdAt": "2025-04-07T10:15:30Z",
  "components": {
    "cpu": "cpu_001",
    "motherboard": "mb_003",
    "memory": ["ram_002", "ram_002"],
    "gpu": "gpu_005",
    "storage": ["storage_001", "storage_004"],
    "psu": "psu_002",
    "case": "case_001",
    "cpuCooler": "cooler_002",
    "fans": ["fan_001", "fan_001", "fan_001"]
  },
  "compatibilityIssues": [
    {
      "type": "gpu_length",
      "severity": "critical",
      "message": "選択したGPUの長さ(320mm)がケースの最大GPU長(300mm)を超えています。",
      "components": ["gpu", "case"]
    }
  ],
  "totalPrice": 198650
}
```

## エラーレスポンス

すべてのAPIは以下の形式でエラーを返します：

```json
{
  "error": {
    "code": "invalid_part_id",
    "message": "指定されたパーツIDは存在しません",
    "details": {
      "partId": "cpu_999",
      "category": "cpu"
    }
  }
}
```

## データモックの実装

初期開発段階ではAPI呼び出しをモックします。以下はフロントエンドでの実装例です：

```typescript
// src/lib/api/mockApi.ts

import { cpus, motherboards, memories, gpus, cases, psus, coolers, storages, fans } from '../data/mockData';

export async function fetchParts(category: string, options = {}) {
  // 実際のAPIが実装されるまで、モックデータを返す
  switch (category) {
    case 'cpu':
      return { items: cpus, total: cpus.length, page: 1, limit: 100 };
    case 'motherboard':
      return { items: motherboards, total: motherboards.length, page: 1, limit: 100 };
    // 他のカテゴリも同様
    default:
      throw new Error(`Unknown category: ${category}`);
  }
}

export async function fetchPartDetail(category: string, id: string) {
  // 実際のAPIが実装されるまで、モックデータから対応するアイテムを探して返す
  let item;
  
  switch (category) {
    case 'cpu':
      item = cpus.find(cpu => cpu.id === id);
      break;
    case 'motherboard':
      item = motherboards.find(mb => mb.id === id);
      break;
    // 他のカテゴリも同様
    default:
      throw new Error(`Unknown category: ${category}`);
  }
  
  if (!item) {
    throw new Error(`Item not found: ${category}/${id}`);
  }
  
  return item;
}

// 他のAPIメソッドも同様にモック実装
```

## API実装計画

1. フェーズ1: ダミーデータを使用したクライアントサイド実装
2. フェーズ2: Next.js API Routesを利用したサーバーサイド実装
3. フェーズ3: Prismaを使用したデータベース連携
