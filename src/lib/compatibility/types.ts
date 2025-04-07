/**
 * 互換性チェックのための軽量型定義ファイル
 * パフォーマンス改善と将来の拡張性を考慮した設計
 */
import { CPU } from '../data/cpus';
import { Motherboard } from '../data/motherboards';

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

// PC構成のコンポーネントIDs
export interface BuildComponents {
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

/**
 * 完全なCPUオブジェクトから互換性チェック用の軽量オブジェクトに変換する関数
 */
export function toCompatibilityCPU(cpu: CPU): CompatibilityCPU {
  return {
    id: cpu.id,
    manufacturer: cpu.manufacturer,
    model: cpu.model,
    socket: cpu.socket,
    supportedMemoryType: cpu.supportedMemoryType,
    maxMemorySpeed: cpu.maxMemorySpeed,
    tdp: cpu.tdp
  };
}

/**
 * 完全なマザーボードオブジェクトから互換性チェック用の軽量オブジェクトに変換する関数
 */
export function toCompatibilityMotherboard(motherboard: Motherboard): CompatibilityMotherboard {
  return {
    id: motherboard.id,
    manufacturer: motherboard.manufacturer,
    model: motherboard.model,
    socket: motherboard.socket,
    chipset: motherboard.chipset,
    memoryType: motherboard.memoryType,
    maxMemorySpeed: motherboard.maxMemorySpeed
  };
}

/**
 * 互換性の問題を作成するヘルパー関数
 */
export function createCompatibilityIssue(
  type: string,
  severity: CompatibilitySeverity,
  message: string,
  components: string[]
): CompatibilityIssue {
  return { type, severity, message, components };
}
