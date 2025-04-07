// 互換性チェックの型定義と基本関数
import { cpus, motherboards } from '../data';
import { checkCpuMotherboardCompatibility as checkCpuMoboCompat } from './cpu-motherboard';
import { CPU } from '../data/cpus';
import { Motherboard } from '../data/motherboards';

// 互換性の問題の重要度
export type CompatibilitySeverity = 'critical' | 'warning' | 'info';

// 互換性の問題
export interface CompatibilityIssue {
  type: string;          // 問題の種類（識別子）
  severity: CompatibilitySeverity; // 深刻度
  message: string;       // 表示メッセージ
  components: string[];  // 関連コンポーネント
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
 * IDからCPUオブジェクトを取得する関数
 */
function getCpuById(id: string): CPU | null {
  return cpus.find(cpu => cpu.id === id) || null;
}

/**
 * IDからマザーボードオブジェクトを取得する関数
 */
function getMotherboardById(id: string): Motherboard | null {
  return motherboards.find(mobo => mobo.id === id) || null;
}

/**
 * PC構成全体の互換性をチェックする関数
 * 
 * @param components チェック対象のPC構成コンポーネント
 * @returns 互換性の問題点がある場合は問題点の配列、問題がなければ空配列
 */
export function checkBuildCompatibility(components: BuildComponents): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];
  
  // CPUとマザーボードの互換性チェック
  if (components.cpu && components.motherboard) {
    const cpu = getCpuById(components.cpu);
    const motherboard = getMotherboardById(components.motherboard);
    
    if (cpu && motherboard) {
      const cpuMotherboardIssues = checkCpuMoboCompat(cpu, motherboard);
      issues.push(...cpuMotherboardIssues);
    }
  }
  
  // 将来的に他のパーツの互換性チェックも追加予定
  
  return issues;
}

/**
 * CPUとマザーボードの互換性をIDを指定してチェックする関数
 * 
 * @param cpuId CPUのID
 * @param motherboardId マザーボードのID
 * @returns 互換性の問題点がある場合は問題点の配列、問題がなければ空配列
 */
export function checkCpuMotherboardCompatibility(cpuId: string, motherboardId: string): CompatibilityIssue[] {
  const cpu = getCpuById(cpuId);
  const motherboard = getMotherboardById(motherboardId);
  
  if (!cpu || !motherboard) {
    return [{
      type: 'component_not_found',
      severity: 'critical',
      message: '指定されたCPUまたはマザーボードが見つかりません。',
      components: ['cpu', 'motherboard']
    }];
  }
  
  return checkCpuMoboCompat(cpu, motherboard);
}

// 他の互換性チェック関数（将来的に実装予定）
export function checkMemoryCompatibility(memoryIds: string[], motherboardId: string): CompatibilityIssue[] {
  return [];
}

export function checkGpuCaseCompatibility(gpuId: string, caseId: string): CompatibilityIssue[] {
  return [];
}

export function checkCoolerCaseCompatibility(coolerId: string, caseId: string): CompatibilityIssue[] {
  return [];
}

export function checkPsuCaseCompatibility(psuId: string, caseId: string): CompatibilityIssue[] {
  return [];
}

export function checkMotherboardCaseCompatibility(motherboardId: string, caseId: string): CompatibilityIssue[] {
  return [];
}

export function checkPowerRequirements(components: BuildComponents): CompatibilityIssue[] {
  return [];
}
