import React, { createContext, useContext, useState, useEffect } from 'react';

// PCビルドコンポーネントの型定義
type BuildComponents = {
  cpu: string | null;
  motherboard: string | null;
  memory: string[] | null;
  gpu: string | null;
  storage: string[] | null;
  psu: string | null;
  case: string | null;
  cpuCooler: string | null;
  fans: string[] | null;
};

// 互換性問題の型定義
type CompatibilityIssue = {
  type: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  components: string[];
};

// PCビルド全体の型定義
type PCBuild = {
  components: BuildComponents;
  compatibilityIssues: CompatibilityIssue[];
  totalPrice: number;
};

// コンテキストの型定義
type BuildContextType = {
  currentBuild: PCBuild;
  updatePart: (partType: keyof BuildComponents, partId: string | null) => void;
  resetBuild: () => void;
};

// ローカルストレージのキー
const STORAGE_KEY = 'alteepc_current_build';

// デフォルトの空のビルド状態
const defaultBuild: PCBuild = {
  components: {
    cpu: null,
    motherboard: null,
    memory: null,
    gpu: null,
    storage: null,
    psu: null,
    case: null,
    cpuCooler: null,
    fans: null,
  },
  compatibilityIssues: [],
  totalPrice: 0,
};

// コンテキストの作成
const BuildContext = createContext<BuildContextType | null>(null);

// コンテキストプロバイダーコンポーネント
export function BuildProvider({ children }: { children: React.ReactNode }) {
  const [currentBuild, setCurrentBuild] = useState<PCBuild>(defaultBuild);

  // 初期ロード時にローカルストレージから状態を読み込む
  useEffect(() => {
    const savedBuild = localStorage.getItem(STORAGE_KEY);
    if (savedBuild) {
      try {
        setCurrentBuild(JSON.parse(savedBuild));
      } catch (error) {
        console.error('Failed to parse saved build:', error);
      }
    }
  }, []);

  // パーツ更新関数
  const updatePart = (partType: keyof BuildComponents, partId: string | null) => {
    const updatedComponents = { ...currentBuild.components, [partType]: partId };
    const updatedBuild = { ...currentBuild, components: updatedComponents };
    
    // TODO: ここで互換性チェックと価格計算を行う
    // 互換性チェックは将来的に実装

    setCurrentBuild(updatedBuild);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBuild));
  };

  // ビルドリセット関数
  const resetBuild = () => {
    setCurrentBuild(defaultBuild);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBuild));
  };

  return (
    <BuildContext.Provider value={{ currentBuild, updatePart, resetBuild }}>
      {children}
    </BuildContext.Provider>
  );
}

// カスタムフック
export function useBuild() {
  const context = useContext(BuildContext);
  if (!context) {
    throw new Error('useBuild must be used within a BuildProvider');
  }
  return context;
}
