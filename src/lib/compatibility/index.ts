// 互換性チェックの型定義と基本関数

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

// 基本互換性チェック関数 - 将来的に実装予定
export function checkBuildCompatibility(components: BuildComponents): CompatibilityIssue[] {
  // プレースホルダー - 将来的に実装する互換性チェックロジック
  const issues: CompatibilityIssue[] = [];
  
  // フェーズ1-2ではダミーの互換性チェックとして空配列を返す
  return issues;
}

// 将来的に実装する特定の互換性チェック関数
export function checkCpuMotherboardCompatibility(cpuId: string, motherboardId: string): CompatibilityIssue[] {
  return [];
}

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
