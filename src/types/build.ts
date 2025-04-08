// PCビルドコンポーネントの型定義
export type BuildComponents = {
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

// 互換性問題の型定義は compatibility.ts に移動
import { CompatibilityIssue } from './compatibility';
// 後方互換性のために再エクスポート
export type { CompatibilityIssue };

// PCビルド全体の型定義
export type PCBuild = {
  components: BuildComponents;
  compatibilityIssues: CompatibilityIssue[];
  totalPrice: number;
  name?: string;
};

// 保存された構成の型定義
export type SavedBuild = PCBuild & {
  id: string;
  createdAt: Date;
  lastAccessedAt: Date;
  expiresAt: Date;
  accessCount: number;
};

// 共有リンクの型定義
export type BuildShareInfo = {
  id: string;
  url: string;
  createdAt: Date;
  expiresAt: Date;
};
