// 互換性チェックのメインエントリーポイント
import { cpus, motherboards } from '../data';
import { checkCpuMotherboardCompatibility as checkCpuMoboCompat } from './cpu-motherboard';
import { 
  BuildComponents, 
  CompatibilityIssue,
  toCompatibilityCPU, 
  toCompatibilityMotherboard
} from './types';

// キャッシング機構
const compatibilityCache = new Map<string, CompatibilityIssue[]>();

function getCacheKey(cpuId: string, motherboardId: string): string {
  return `${cpuId}:${motherboardId}`;
}

/**
 * IDからCPUオブジェクトを取得する関数
 */
function getCpuById(id: string) {
  return cpus.find(cpu => cpu.id === id) || null;
}

/**
 * IDからマザーボードオブジェクトを取得する関数
 */
function getMotherboardById(id: string) {
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
    const cpuMotherboardIssues = cachedCheckCpuMotherboardCompatibility(
      components.cpu, 
      components.motherboard
    );
    issues.push(...cpuMotherboardIssues);
  }
  
  // 将来的に他のパーツの互換性チェックも追加予定
  
  return issues;
}

/**
 * CPUとマザーボードの互換性をIDを指定してチェックする関数
 * キャッシング機能付き
 * 
 * @param cpuId CPUのID
 * @param motherboardId マザーボードのID
 * @returns 互換性の問題点がある場合は問題点の配列、問題がなければ空配列
 */
export function cachedCheckCpuMotherboardCompatibility(
  cpuId: string, 
  motherboardId: string
): CompatibilityIssue[] {
  const cacheKey = getCacheKey(cpuId, motherboardId);
  
  // キャッシュにあればそれを返す
  if (compatibilityCache.has(cacheKey)) {
    return compatibilityCache.get(cacheKey)!;
  }
  
  const result = checkCpuMotherboardCompatibility(cpuId, motherboardId);
  compatibilityCache.set(cacheKey, result);
  return result;
}

/**
 * CPUとマザーボードの互換性をIDを指定してチェックする関数（キャッシュなし）
 * 
 * @param cpuId CPUのID
 * @param motherboardId マザーボードのID
 * @param options オプション設定 (earlyReturn: 重大な問題があれば処理を終了)
 * @returns 互換性の問題点がある場合は問題点の配列、問題がなければ空配列
 */
export function checkCpuMotherboardCompatibility(
  cpuId: string, 
  motherboardId: string,
  options = { earlyReturn: false }
): CompatibilityIssue[] {
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
  
  // 完全なオブジェクトから互換性チェック用の軽量オブジェクトに変換
  const compatibilityCpu = toCompatibilityCPU(cpu);
  const compatibilityMotherboard = toCompatibilityMotherboard(motherboard);
  
  // 軽量オブジェクトで互換性チェックを実行
  return checkCpuMoboCompat(compatibilityCpu, compatibilityMotherboard, options);
}

// 型エクスポート
export type { CompatibilityIssue } from './types';
export type { CompatibilitySeverity } from './types';
export type { BuildComponents } from './types';

// 将来追加予定の互換性チェック関数のプレースホルダー
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