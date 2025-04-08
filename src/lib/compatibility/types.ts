/**
 * 互換性チェックのための軽量型定義ファイル
 * 型定義は@/types/compatibilityに移動されました
 */
import { CPU } from '../data/cpus';
import { Motherboard } from '../data/motherboards';
import { 
  CompatibilityCPU, 
  CompatibilityMotherboard, 
  CompatibilityIssue,
  CompatibilitySeverity,
  CompatibilityBuildComponents
} from '@/types/compatibility';

// 型をリエクスポート
export type { 
  CompatibilityIssue, 
  CompatibilitySeverity, 
  CompatibilityBuildComponents as BuildComponents, 
  CompatibilityCPU, 
  CompatibilityMotherboard 
};

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