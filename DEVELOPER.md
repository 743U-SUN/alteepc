# alteePC 開発者向けガイド

このドキュメントはalteePC（自作PC初心者向けパーツ互換性チェック＆見積もりサイト）の開発者向けガイドです。

## システムアーキテクチャ

### データフロー

1. ユーザーがトップページからPCビルドページに移動
2. PCビルドページで各パーツの「選択」ボタンをクリック
3. パーツの種類に応じた一覧ページ（CPU一覧、GPU一覧など）に移動
4. 一覧ページで希望のパーツの「選択」ボタンをクリック
5. 選択したパーツの情報と共にPCビルドページに戻る
6. 互換性チェックエンジンがリアルタイムで互換性を検証
7. 価格情報管理サービスが最新の価格情報を提供
8. ユーザーが構成を保存すると、URL生成サービスが一意のURLを生成
9. 構成保存サービスがパーツ選択情報を保存

## プロジェクト構造

```
alteepc/
├── public/                  # 静的ファイル
│   ├── images/              # 画像ファイル
│   │   └── parts/           # パーツ画像
│   └── icons/               # アイコンファイル
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx         # トップページ
│   │   ├── build/           # PCビルドページ
│   │   │   ├── page.tsx     # PC構成作成ページ
│   │   │   └── [id]/        # 共有URL用の動的ルート
│   │   │       └── page.tsx # 共有された構成表示ページ
│   │   ├── parts/           # パーツ選択ページ
│   │   │   ├── cpu/         # CPU選択ページ
│   │   │   │   └── page.tsx
│   │   │   ├── motherboard/ # マザーボード選択ページ
│   │   │   │   └── page.tsx
│   │   │   ├── memory/      # メモリ選択ページ
│   │   │   │   └── page.tsx
│   │   │   ├── gpu/         # GPU選択ページ
│   │   │   │   └── page.tsx
│   │   │   ├── storage/     # ストレージ選択ページ
│   │   │   │   └── page.tsx
│   │   │   ├── psu/         # 電源選択ページ
│   │   │   │   └── page.tsx
│   │   │   ├── case/        # ケース選択ページ
│   │   │   │   └── page.tsx
│   │   │   └── cooler/      # CPUクーラー選択ページ
│   │   │       └── page.tsx
│   │   ├── api/             # APIルート
│   │   │   ├── parts/       # パーツAPI
│   │   │   ├── builds/      # 構成保存API
│   │   │   └── compatibility/ # 互換性チェックAPI
│   │   └── layout.tsx       # ルートレイアウト
│   ├── components/          # Reactコンポーネント
│   │   ├── ui/              # 基本的なUIコンポーネント
│   │   │   ├── button.tsx   # ボタンコンポーネント
│   │   │   ├── card.tsx     # カードコンポーネント
│   │   │   └── select.tsx   # セレクトコンポーネント
│   │   ├── layout/          # レイアウトコンポーネント
│   │   │   ├── header.tsx   # ヘッダーコンポーネント
│   │   │   ├── footer.tsx   # フッターコンポーネント
│   │   │   └── sidebar.tsx  # サイドバーコンポーネント
│   │   └── parts/           # パーツ選択関連コンポーネント
│   │       ├── part-card.tsx # パーツカードコンポーネント
│   │       ├── part-list.tsx # パーツリストコンポーネント
│   │       ├── build-summary.tsx # 構成サマリーコンポーネント
│   │       └── compatibility-warning.tsx # 互換性警告コンポーネント
│   ├── lib/                 # ユーティリティ関数
│   │   ├── compatibility/   # 互換性チェックロジック
│   │   │   ├── index.ts     # エントリーポイント
│   │   │   ├── cpu-motherboard.ts # CPU-マザーボード互換性チェック
│   │   │   ├── memory-compatibility.ts # メモリ互換性チェック
│   │   │   └── power-requirement.ts # 電力要件チェック
│   │   ├── data/            # ダミーデータと初期データ
│   │   │   ├── cpus.ts      # CPUデータ
│   │   │   ├── motherboards.ts # マザーボードデータ
│   │   │   ├── gpus.ts      # GPUデータ
│   │   │   └── index.ts     # データエクスポート
│   │   └── url/             # URL生成・管理ロジック
│   │       └── build-url.ts # 構成URL生成
│   ├── models/              # データモデル定義
│   │   ├── parts.ts         # パーツモデル
│   │   └── build.ts         # 構成モデル
│   ├── services/            # サービス層
│   │   ├── parts-service.ts # パーツサービス
│   │   └── build-service.ts # 構成サービス
│   ├── hooks/               # カスタムフック
│   │   ├── use-build.ts     # 構成管理フック
│   │   └── use-compatibility.ts # 互換性チェックフック
│   ├── context/             # Reactコンテキスト
│   │   └── build-context.tsx # 構成コンテキスト
│   └── styles/              # グローバルスタイル
│       └── globals.css      # グローバルCSS
├── prisma/                  # Prismaの設定（将来的に使用）
│   ├── schema.prisma        # データベーススキーマ
│   └── seed.ts              # シードスクリプト
├── logs/                    # ログファイル
├── docker-compose.yml       # Docker設定
├── .env.example             # 環境変数サンプル
├── .env.local               # ローカル環境変数（gitignore）
├── README.md                # プロジェクト概要
├── DEVELOPER.md             # 開発者向けガイド
└── API.md                   # API設計ドキュメント
```

## 実装計画
まずはCPUとマザーボード部分のみ実装->様々な機能を確認する。

### フェーズ1: 基本機能実装（推定期間: 2週間）

1. プロジェクト初期セットアップ
   - Next.js環境構築
   - TailwindCSSセットアップ
   - ディレクトリ構造作成

2. ダミーデータ作成
   - 各種PCパーツのサンプルデータ作成
   - 価格情報のモックデータ

3. 基本UI実装
   - パーツ選択インターフェース
   - 互換性表示コンポーネント
   - 合計金額表示

4. 互換性チェックロジック実装
   - 基本的な互換性ルールの実装

### フェーズ2: 機能拡張（推定期間: 2週間）

1. URL生成機能実装
   - cuid2を使ったユニークID生成
   - 構成保存ロジック

2. 追加互換性チェック
   - 高度な互換性ルールの追加
   - エッジケース対応

3. UI/UX改善
   - レスポンシブデザイン対応
   - ユーザビリティ改善

4. パフォーマンス最適化

### フェーズ3: 評価・改善（推定期間: 1週間）

1. ユーザーフィードバック収集
2. 不具合修正
3. 追加機能検討

### ライブラリ使用方針
サードパーティー製ライブラリはなるべく使用しないでください。
必要な場合は確認を取ってから使用すること。

## データモデル

アプリケーションで使用する主要なデータモデルの概要です。詳細なデータベース設計については [DATABASE.md](./DATABASE.md) を参照してください。

初期開発段階ではダミーデータを使用し、将来的にPrismaとPostgreSQLを使用したデータベース実装を予定しています。DATABASE.mdには各パーツのデータモデル定義、リレーション、インデックス戦略、データシード方法などの詳細情報が記載されています。

## 互換性チェックアルゴリズムとサービス

パーツ間の互換性を検証するアルゴリズムとサービス層の実装について詳述します。

### 基本チェック項目

1. **CPUとマザーボードの互換性**
   - ソケットの一致確認
   - チップセットの対応確認

```typescript
function checkCpuMotherboardCompatibility(cpu: CPU, motherboard: Motherboard): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];
  
  // ソケット互換性チェック
  if (cpu.socket !== motherboard.socket) {
    issues.push({
      type: 'socket_mismatch',
      severity: 'critical',
      message: `CPUソケット(${cpu.socket})とマザーボードソケット(${motherboard.socket})が一致しません。`,
      components: ['cpu', 'motherboard']
    });
  }
  
  // メモリタイプ互換性チェック
  const hasCommonMemoryType = cpu.supportedMemoryType.some(type => 
    motherboard.memoryType.includes(type)
  );
  
  if (!hasCommonMemoryType) {
    issues.push({
      type: 'memory_type_mismatch',
      severity: 'critical',
      message: `CPUがサポートするメモリタイプ(${cpu.supportedMemoryType.join(', ')})とマザーボードがサポートするメモリタイプ(${motherboard.memoryType.join(', ')})に互換性がありません。`,
      components: ['cpu', 'motherboard']
    });
  }
  
  return issues;
}
```

2. **メモリとマザーボードの互換性**
   - メモリタイプの一致確認
   - メモリ速度の確認
   - メモリスロット数の確認

3. **GPUとケースの互換性**
   - GPUの長さとケースの制限確認
   - 電源要件の確認

4. **CPUクーラーとケースの互換性**
   - クーラーの高さとケースの制限確認

5. **電源とケースの互換性**
   - 電源の奥行きとケースの制限確認
   - 電源規格の確認

6. **マザーボードとケースの互換性**
   - フォームファクターの確認

7. **総消費電力と電源容量の確認**
   - 全パーツの消費電力合計と電源容量の比較

### 互換性チェック呼び出しフロー

```typescript
function checkFullCompatibility(build: PCBuild): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];
  
  // コンポーネントの取得
  const cpu = getCpuById(build.components.cpu);
  const motherboard = getMotherboardById(build.components.motherboard);
  const memory = getMemoryById(build.components.memory);
  const gpu = getGpuById(build.components.gpu);
  const cpuCooler = getCpuCoolerById(build.components.cpuCooler);
  const pcCase = getCaseById(build.components.case);
  const psu = getPsuById(build.components.psu);
  
  // 各種互換性チェック
  if (cpu && motherboard) {
    issues.push(...checkCpuMotherboardCompatibility(cpu, motherboard));
  }
  
  if (motherboard && memory) {
    issues.push(...checkMemoryMotherboardCompatibility(memory, motherboard));
  }
  
  if (gpu && pcCase) {
    issues.push(...checkGpuCaseCompatibility(gpu, pcCase));
  }
  
  if (cpuCooler && pcCase) {
    issues.push(...checkCoolerCaseCompatibility(cpuCooler, pcCase));
  }
  
  if (psu && pcCase) {
    issues.push(...checkPsuCaseCompatibility(psu, pcCase));
  }
  
  if (motherboard && pcCase) {
    issues.push(...checkMotherboardCaseCompatibility(motherboard, pcCase));
  }
  
  // 消費電力チェック
  if (cpu && gpu && psu) {
    issues.push(...checkPowerConsumption(cpu, gpu, psu));
  }
  
  return issues;
}
```

## UI/UXガイドライン

### 基本方針

- シンプルで直感的なインターフェース
- 初心者でも理解しやすい表現
- レスポンシブデザイン（モバイル、タブレット、デスクトップ対応）

### ページ構成とユーザーフロー

1. **トップページ**
   - サイトの概要と目的の説明
   - 「PC構成作成を開始」ボタン
   - 人気の構成例の表示

2. **PC構成ページ**
   - パーツ選択セクション（CPU、マザーボード、メモリなど）
   - 各パーツに「選択」ボタンを設置
   - 互換性ステータス表示
   - 合計金額表示
   - 「構成を保存して共有」ボタン

3. **パーツ選択ページ**
   - 各パーツカテゴリの別ページ（CPU、GPUなど）
   - フィルタリング機能
   - ソート機能
   - 各パーツの詳細情報表示
   - 「このパーツを選択」ボタン

4. **構成共有ページ**
   - 生成されたURLとコピーボタン
   - 選択した構成の詳細表示
   - 互換性ステータス表示

### ページ遷移フロー

```
トップページ → PC構成ページ ←→ パーツ選択ページ（CPU/GPU/マザーボードなど） → PC構成ページ → 構成共有ページ
```

- ユーザーがトップページからPC構成ページに移動
- PC構成ページで「選択」ボタンをクリックして各パーツ選択ページに移動
- パーツ選択ページでパーツを選び、PC構成ページに戻る
- このプロセスを各パーツに対して繰り返す
- 構成が完了したら「構成を保存して共有」ボタンでURLを生成

### 色彩計画

- プライマリカラー: #3B82F6 (青)
- セカンダリカラー: #10B981 (緑)
- アクセントカラー: #F59E0B (オレンジ)
- 警告カラー: #EF4444 (赤)
- 背景色: #F3F4F6 (ライトグレー)

### 重要UI要素

1. パーツ選択カード - 各パーツをカード形式で表示
2. 互換性アラート - 問題があれば赤色で警告表示
3. 価格サマリー - 合計金額をわかりやすく表示
4. 選択ボタン - 青色の目立つボタン
5. 共有URL - 生成されたURLとコピー機能

---

## コンテキストに基づくフィルタリング機能

### 概要

ユーザーがPCビルドページで既に選択したパーツ情報に基づいて、他のパーツ選択ページのフィルターを自動的に設定する機能です。これによりユーザーは互換性のあるパーツをより容易に選択できます。

### 例となるシナリオ

1. **CPU→マザーボードのフロー**
   - ユーザーがIntel CPUを選択した場合
   - マザーボード選択ページではチップセットフィルターがIntelソケットに自動設定される

2. **マザーボード→CPUのフロー**
   - ユーザーがAMDソケットのマザーボードを選択した場合
   - CPU選択ページではメーカーフィルターがAMDに自動設定される

3. **メモリの互換性**
   - マザーボードとCPUが選択されている場合
   - メモリ選択ページでは互換性のあるメモリタイプ（DDR4/DDR5など）に自動フィルタリング

### 実装方法

```typescript
// ビルドコンテキストにアクセスしてフィルターを構築する関数

function generateFilters(buildContext, partType) {
  const filters = {};
  
  switch(partType) {
    case 'cpu':
      // マザーボードが選択されている場合の処理
      if (buildContext.motherboard) {
        const motherboard = getMotherboardById(buildContext.motherboard);
        filters.socket = motherboard.socket;
        // IntelかAMDかを判別
        if (motherboard.socket.includes('LGA')) {
          filters.manufacturer = 'Intel';
        } else if (motherboard.socket.includes('AM')) {
          filters.manufacturer = 'AMD';
        }
      }
      break;
      
    case 'motherboard':
      // CPUが選択されている場合の処理
      if (buildContext.cpu) {
        const cpu = getCpuById(buildContext.cpu);
        filters.socket = cpu.socket;
        // IntelかAMDかを判別
        if (cpu.manufacturer === 'Intel') {
          filters.chipsetBrand = 'Intel';
        } else if (cpu.manufacturer === 'AMD') {
          filters.chipsetBrand = 'AMD';
        }
      }
      break;
      
    case 'memory':
      // CPUとマザーボードのメモリタイプに基づくフィルタリング
      if (buildContext.cpu && buildContext.motherboard) {
        const cpu = getCpuById(buildContext.cpu);
        const motherboard = getMotherboardById(buildContext.motherboard);
        
        // 両方がサポートするメモリタイプを求める
        const supportedTypes = cpu.supportedMemoryType.filter(type => 
          motherboard.memoryType.includes(type)
        );
        
        if (supportedTypes.length > 0) {
          filters.type = supportedTypes;
        }
        
        // 最大メモリ速度フィルター
        filters.maxSpeed = Math.min(cpu.maxMemorySpeed, motherboard.maxMemorySpeed);
      }
      break;
      
    // 他のパーツタイプについても同様に実装
  }
  
  return filters;
}
```

### 状態管理

ページ間での状態管理はローカルストレージを使用して実装します：

1. **ローカルストレージを使った状態保存**
   - 選択したパーツ情報をローカルストレージに保存
   - ページ遷移やリロード後も状態を維持

2. **Reactカスタムフックによる抽象化**
   - `useBuildState` フックでローカルストレージの操作を抽象化
   - 複数コンポーネント間で共通のロジックを再利用

3. **一貫性のある状態管理**
   - バックボタン対応のための追加処理
   - ブラウザの履歴管理との連携

```typescript
// ローカルストレージを使ったビルド状態管理フック

import { useState, useEffect } from 'react';
import { PCBuild } from '../models/build';

const STORAGE_KEY = 'alteepc_current_build';

export function useBuildState() {
  // 初期状態は空のビルド
  const [currentBuild, setCurrentBuild] = useState<PCBuild>({
    components: {
      cpu: null,
      motherboard: null,
      memory: [],
      gpu: null,
      storage: [],
      psu: null,
      case: null,
      cpuCooler: null,
      fans: []
    },
    compatibilityIssues: [],
    totalPrice: 0
  });
  
  // コンポーネントマウント時にローカルストレージから状態を読み込む
  useEffect(() => {
    const savedBuild = localStorage.getItem(STORAGE_KEY);
    if (savedBuild) {
      try {
        setCurrentBuild(JSON.parse(savedBuild));
      } catch (error) {
        console.error('Failed to parse saved build:', error);
      }
    }
    
    // バックボタン時の処理
    const handlePopState = () => {
      const savedBuild = localStorage.getItem(STORAGE_KEY);
      if (savedBuild) {
        try {
          setCurrentBuild(JSON.parse(savedBuild));
        } catch (error) {
          console.error('Failed to parse saved build on popstate:', error);
        }
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  // ビルド情報更新時にローカルストレージに保存
  const updateBuild = (newBuild: Partial<PCBuild>) => {
    const updatedBuild = { ...currentBuild, ...newBuild };
    setCurrentBuild(updatedBuild);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBuild));
  };
  
  // 特定のパーツを更新
  const updatePart = (partType: string, partId: string | null) => {
    const updatedComponents = { ...currentBuild.components, [partType]: partId };
    const updatedBuild = { ...currentBuild, components: updatedComponents };
    setCurrentBuild(updatedBuild);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBuild));
    
    // フィルター状態も保存
    const filterState = generateFilters(updatedBuild, null);
    localStorage.setItem('alteepc_filters', JSON.stringify(filterState));
  };
  
  // 状態リセット
  const resetBuild = () => {
    const emptyBuild = {
      components: {
        cpu: null,
        motherboard: null,
        memory: [],
        gpu: null,
        storage: [],
        psu: null,
        case: null,
        cpuCooler: null,
        fans: []
      },
      compatibilityIssues: [],
      totalPrice: 0
    };
    setCurrentBuild(emptyBuild);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyBuild));
    localStorage.removeItem('alteepc_filters');
  };
  
  return { 
    currentBuild, 
    updateBuild, 
    updatePart, 
    resetBuild 
  };
}
```

```typescript
// パーツ選択ページでフィルター設定をロードするフック
export function usePartFilters(partType: string) {
  const [filters, setFilters] = useState({});
  
  useEffect(() => {
    // 現在のビルド状態を読み込む
    const savedBuild = localStorage.getItem('alteepc_current_build');
    if (savedBuild) {
      try {
        const buildData = JSON.parse(savedBuild);
        // パーツタイプに基づいてフィルターを生成
        const newFilters = generateFilters(buildData, partType);
        setFilters(newFilters);
      } catch (error) {
        console.error('Failed to load filters:', error);
      }
    }
  }, [partType]);
  
  // フィルター更新用の関数
  const updateFilters = (newFilters: object) => {
    setFilters({ ...filters, ...newFilters });
  };
  
  return { filters, updateFilters };
}
```

### パーツ選択ページでの実装例

```typescript
// CPU選択ページのフィルター実装
export default function CPUSelectionPage() {
  // フィルター状態をロード
  const { filters, updateFilters } = usePartFilters('cpu');
  const { updatePart } = useBuildState();
  const [cpuList, setCpuList] = useState([]);
  
  useEffect(() => {
    // CPUリストを取得
    fetchCPUs().then(data => {
      // フィルターがあれば適用
      if (filters.manufacturer) {
        data = data.filter(cpu => cpu.manufacturer === filters.manufacturer);
      }
      if (filters.socket) {
        data = data.filter(cpu => cpu.socket === filters.socket);
      }
      setCpuList(data);
    });
  }, [filters]);
  
  // CPU選択時の処理
  const handleSelectCPU = (cpuId) => {
    updatePart('cpu', cpuId);
    // PCビルドページに戻る
    router.push('/build');
  };
  
  return (
    <div>
      <h1>CPU選択</h1>
      
      {/* フィルター UI */}
      <div className="filters">
        <select 
          value={filters.manufacturer || ''} 
          onChange={(e) => updateFilters({ manufacturer: e.target.value })}
        >
          <option value="">All Manufacturers</option>
          <option value="Intel">Intel</option>
          <option value="AMD">AMD</option>
        </select>
        
        {/* その他のフィルターコントロール */}
      </div>
      
      {/* CPUリスト表示 */}
      <div className="cpu-list">
        {cpuList.map(cpu => (
          <div key={cpu.id} className="cpu-card">
            <h3>{cpu.manufacturer} {cpu.model}</h3>
            <p>Socket: {cpu.socket}</p>
            <p>Cores: {cpu.cores} / Threads: {cpu.threads}</p>
            <p>Price: ¥{cpu.price.toLocaleString()}</p>
            <button onClick={() => handleSelectCPU(cpu.id)}>
              このCPUを選択
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### ユーザー体験の向上

このコンテキストを考慮したフィルタリングにより、以下のメリットが得られます：

1. ユーザーは毎回フィルターを手動で設定する必要がない
2. 互換性エラーを事前に防止できる
3. 選択したパーツに対して最適なオプションのみを表示することでUIが単純化される

・ユーザーが希望すればフィルターを手動でオーバーライドすることも可能
・自動フィルターが適用されていることを明確にユーザーに表示

## PC構成管理サービス

PC構成の保存、取得、URL生成を行うサービスを実装します：

```typescript
// src/services/build-service.ts
import { createId } from '@paralleldrive/cuid2';
import { PartsService } from './parts-service';
import { CompatibilityService } from './compatibility-service';

export class BuildService {
  private partsService: PartsService;
  private compatibilityService: CompatibilityService;
  
  constructor() {
    this.partsService = new PartsService();
    this.compatibilityService = new CompatibilityService();
  }
  
  // PC構成の保存
  async saveBuild(buildData) {
    const buildId = createId();
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + 90); // 90日後の有効期限
    
    // 互換性チェック
    const compatibilityIssues = await this.compatibilityService.checkFullCompatibility(
      buildData.components
    );
    
    // 価格計算
    const totalPrice = await this.calculateTotalPrice(buildData.components);
    
    // 新しい構成データを作成
    const newBuild = {
      id: buildId,
      components: buildData.components,
      compatibilityIssues,
      totalPrice,
      name: buildData.name || null,
      createdAt: now,
      lastAccessedAt: now,
      expiresAt,
      accessCount: 0
    };
    
    // この初期実装ではデータをメモリに保存
    // 将来的にはデータベースに保存
    this.builds = this.builds || [];
    this.builds.push(newBuild);
    
    return {
      id: buildId,
      url: `https://alteepc.jp/${buildId}`,
      createdAt: now,
      expiresAt
    };
  }
  
  // PC構成の取得
  async getBuild(buildId) {
    // 初期実装ではメモリから取得
    // 将来的にはデータベースから取得
    const build = this.builds?.find(b => b.id === buildId);
    
    if (!build) {
      return null;
    }
    
    // アクセス回数と最終アクセス日時の更新
    build.accessCount += 1;
    build.lastAccessedAt = new Date();
    
    return build;
  }
  
  // 合計価格の計算
  async calculateTotalPrice(components) {
    let totalPrice = 0;
    
    // CPU価格
    if (components.cpu) {
      const cpu = await this.partsService.getCPUById(components.cpu);
      if (cpu) {
        totalPrice += cpu.price;
      }
    }
    
    // マザーボード価格
    if (components.motherboard) {
      const motherboard = await this.partsService.getMotherboardById(components.motherboard);
      if (motherboard) {
        totalPrice += motherboard.price;
      }
    }
    
    // 他のコンポーネント価格も同様に追加...
    
    return totalPrice;
  }
}
```

## 補足情報

### API設計

API設計の詳細については [API.md](./API.md) を参照してください。
