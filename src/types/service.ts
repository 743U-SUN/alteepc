import type { CompatibilityIssue } from './build';

// サービス層で使用される型定義

// PC構成のコンポーネント
export interface PCBuildComponents {
  cpu: string | null;
  motherboard: string | null;
  memory: string[] | null;
  gpu: string | null;
  storage: string[] | null;
  psu: string | null;
  case: string | null;
  cpuCooler: string | null;
  fans: string[] | null;
}

// サービス層のPC構成 - 名前をServicePCBuildに変更して衝突を解消
export interface ServicePCBuild {
  id: string;
  components: PCBuildComponents;
  compatibilityIssues: CompatibilityIssue[];
  totalPrice: number;
  name: string | null;
  createdAt: Date;
  lastAccessedAt: Date;
  expiresAt: Date;
  accessCount: number;
}

// 構成の保存結果
export interface SavedBuildResult {
  id: string;
  url: string;
  createdAt: Date;
  expiresAt: Date;
}