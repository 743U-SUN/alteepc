import { CPU } from '../data/cpus';
import { Motherboard } from '../data/motherboards';
import { CompatibilityIssue } from './index';

/**
 * CPUとマザーボードの互換性をチェックする関数
 * 
 * @param cpu チェック対象のCPU
 * @param motherboard チェック対象のマザーボード
 * @returns 互換性の問題点がある場合は問題点の配列、問題がなければ空配列
 */
export function checkCpuMotherboardCompatibility(
  cpu: CPU,
  motherboard: Motherboard
): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];
  
  // 1. ソケットの互換性チェック（最も重要）
  if (cpu.socket !== motherboard.socket) {
    issues.push({
      type: 'socket_mismatch',
      severity: 'critical',
      message: `CPUソケット「${cpu.socket}」とマザーボードソケット「${motherboard.socket}」が一致しません。`,
      components: ['cpu', 'motherboard']
    });
  }
  
  // 2. メモリタイプの互換性チェック
  const hasCommonMemoryType = cpu.supportedMemoryType.some(type => 
    motherboard.memoryType.includes(type)
  );
  
  if (!hasCommonMemoryType && cpu.supportedMemoryType.length > 0 && motherboard.memoryType.length > 0) {
    issues.push({
      type: 'memory_type_mismatch',
      severity: 'critical',
      message: `CPUがサポートするメモリタイプ「${cpu.supportedMemoryType.join(', ')}」とマザーボードがサポートするメモリタイプ「${motherboard.memoryType.join(', ')}」に互換性がありません。`,
      components: ['cpu', 'motherboard']
    });
  }
  
  // 3. メモリ速度の互換性チェック（警告レベル）
  if (cpu.maxMemorySpeed < motherboard.maxMemorySpeed) {
    issues.push({
      type: 'memory_speed_limitation',
      severity: 'warning',
      message: `CPUがサポートする最大メモリ速度「${cpu.maxMemorySpeed}MHz」はマザーボードがサポートする最大速度「${motherboard.maxMemorySpeed}MHz」より低いため、メモリの動作速度が制限されます。`,
      components: ['cpu', 'motherboard']
    });
  }

  // 4. TDPと電力管理の互換性チェック（情報レベル）
  if (cpu.tdp > 105 && motherboard.chipset.includes('H6') || cpu.tdp > 125 && motherboard.chipset.includes('B7')) {
    issues.push({
      type: 'tdp_chipset_info',
      severity: 'info',
      message: `高TDP(${cpu.tdp}W)のCPUを${motherboard.chipset}チップセットのマザーボードで使用する場合、長時間の高負荷時にパフォーマンスが制限される可能性があります。`,
      components: ['cpu', 'motherboard']
    });
  }
  
  return issues;
}
