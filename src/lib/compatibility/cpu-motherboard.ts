import { 
  CompatibilityCPU, 
  CompatibilityMotherboard, 
  CompatibilityIssue,
  createCompatibilityIssue
} from './types';

/**
 * 配列の交差を確認するヘルパー関数
 */
function hasArrayIntersection<T>(arr1: T[], arr2: T[]): boolean {
  return arr1.some(item => arr2.includes(item));
}

/**
 * 軽量化されたCPUとマザーボードの互換性チェック関数
 * 
 * @param cpu チェック対象のCPU (軽量版)
 * @param motherboard チェック対象のマザーボード (軽量版)
 * @param options オプション設定 (earlyReturn: 重大な問題があれば処理を終了)
 * @returns 互換性の問題点がある場合は問題点の配列、問題がなければ空配列
 */
export function checkCpuMotherboardCompatibility(
  cpu: CompatibilityCPU,
  motherboard: CompatibilityMotherboard,
  options = { earlyReturn: false }
): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];
  
  // 1. ソケットの互換性チェック（最も重要）
  if (cpu.socket !== motherboard.socket) {
    issues.push(createCompatibilityIssue(
      'socket_mismatch',
      'critical',
      `CPUソケット「${cpu.socket}」とマザーボードソケット「${motherboard.socket}」が一致しません。`,
      ['cpu', 'motherboard']
    ));
    
    // 早期リターンオプションが有効なら終了
    if (options.earlyReturn) {
      return issues;
    }
  }
  
  // 2. メモリタイプの互換性チェック
  const hasCommonMemoryType = hasArrayIntersection(
    cpu.supportedMemoryType, 
    motherboard.memoryType
  );
  
  if (!hasCommonMemoryType && cpu.supportedMemoryType.length > 0 && motherboard.memoryType.length > 0) {
    issues.push(createCompatibilityIssue(
      'memory_type_mismatch',
      'critical',
      `CPUがサポートするメモリタイプ「${cpu.supportedMemoryType.join(', ')}」とマザーボードがサポートするメモリタイプ「${motherboard.memoryType.join(', ')}」に互換性がありません。`,
      ['cpu', 'motherboard']
    ));
    
    // 早期リターンオプションが有効なら終了
    if (options.earlyReturn) {
      return issues;
    }
  }
  
  // 3. メモリ速度の互換性チェック（警告レベル）
  if (cpu.maxMemorySpeed < motherboard.maxMemorySpeed) {
    issues.push(createCompatibilityIssue(
      'memory_speed_limitation',
      'warning',
      `CPUがサポートする最大メモリ速度「${cpu.maxMemorySpeed}MHz」はマザーボードがサポートする最大速度「${motherboard.maxMemorySpeed}MHz」より低いため、メモリの動作速度が制限されます。`,
      ['cpu', 'motherboard']
    ));
  }

  // 4. TDPと電力管理の互換性チェック（情報レベル）
  // 条件式を読みやすく改善
  const isH6WithHighTDP = motherboard.chipset.includes('H6') && cpu.tdp > 105;
  const isB7WithVeryHighTDP = motherboard.chipset.includes('B7') && cpu.tdp > 125;
  
  if (isH6WithHighTDP || isB7WithVeryHighTDP) {
    issues.push(createCompatibilityIssue(
      'tdp_chipset_info',
      'info',
      `高TDP(${cpu.tdp}W)のCPUを${motherboard.chipset}チップセットのマザーボードで使用する場合、長時間の高負荷時にパフォーマンスが制限される可能性があります。`,
      ['cpu', 'motherboard']
    ));
  }
  
  return issues;
}
