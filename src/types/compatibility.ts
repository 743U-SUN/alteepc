/**
 * 互換性チェックのための型定義
 */

// 互換性の問題の重要度
export type CompatibilitySeverity = 'critical' | 'warning' | 'info';

// 互換性の問題
export interface CompatibilityIssue {
  type: string;                   // 問題の種類（識別子）
  severity: CompatibilitySeverity; // 深刻度
  message: string;                // 表示メッセージ
  components: string[];           // 関連コンポーネント
}

// CPU互換性チェック用の軽量インターフェース
export interface CompatibilityCPU {
  id: string;
  manufacturer: string;    // エラーメッセージ用
  model: string;           // エラーメッセージ用
  socket: string;
  supportedMemoryType: string[];
  maxMemorySpeed: number;
  tdp: number;
}

// マザーボード互換性チェック用の軽量インターフェース
export interface CompatibilityMotherboard {
  id: string;
  manufacturer: string;    // エラーメッセージ用
  model: string;           // エラーメッセージ用
  socket: string;
  chipset: string;
  memoryType: string[];
  maxMemorySpeed: number;
}

// PC構成のコンポーネントIDs（compatibility用に名前を変更）
export interface CompatibilityBuildComponents {
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