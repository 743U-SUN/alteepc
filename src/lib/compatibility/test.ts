import { cpus, motherboards } from '../data';
import { cachedCheckCpuMotherboardCompatibility as checkCpuMotherboardCompatibility } from './index';
import { CompatibilityIssue } from './types';
import fs from 'fs';
import path from 'path';

// ログディレクトリとファイルパスを設定
const logsDir = path.join(process.cwd(), 'logs');
const logFilePath = path.join(logsDir, 'compatibility-test.log');

// ログディレクトリが存在しない場合は作成
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// ログファイルの準備 (前回のログをクリア)
fs.writeFileSync(logFilePath, '');

// ログファイルへの書き込み関数
function writeLog(message: string) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFilePath, logEntry);
  console.log(logEntry.trim());
}

// テスト開始
writeLog('互換性チェックテスト開始 (軽量インターフェース版)');

// CPUとマザーボードのペアをテストする関数
function testCpuMotherboardCompatibility(cpuId: string, motherboardId: string) {
  const cpu = cpus.find(c => c.id === cpuId);
  const motherboard = motherboards.find(m => m.id === motherboardId);
  
  if (!cpu || !motherboard) {
    writeLog('エラー: テスト用のCPUまたはマザーボードが見つかりません');
    return;
  }
  
  writeLog(`テスト: CPU "${cpu.manufacturer} ${cpu.model}" と マザーボード "${motherboard.manufacturer} ${motherboard.model}"`);
  
  // 計測開始
  const startTime = performance.now();
  const issues = checkCpuMotherboardCompatibility(cpuId, motherboardId);
  const endTime = performance.now();
  
  // パフォーマンス結果
  const executionTime = (endTime - startTime).toFixed(2);
  writeLog(`  実行時間: ${executionTime}ms`);
  
  if (issues.length === 0) {
    writeLog('  結果: 互換性の問題はありません');
  } else {
    writeLog(`  結果: ${issues.length}件の互換性問題が検出されました`);
    issues.forEach(issue => {
      writeLog(`    - [${issue.severity}] ${issue.message}`);
    });
  }
  writeLog('');
  
  return { issues, executionTime };
}

// テストケースの定義
interface TestCase {
  name: string;
  findCpu: (cpus: any[]) => any;
  findMotherboard: (motherboards: any[]) => any;
  expectCompatible: boolean;
}

// テストケース定義
const testCases: TestCase[] = [
  {
    name: '同じソケットのCPUとマザーボード (互換性あり)',
    findCpu: (cpus) => cpus.find(c => c.socket === 'LGA1700'),
    findMotherboard: (motherboards) => motherboards.find(m => m.socket === 'LGA1700'),
    expectCompatible: true
  },
  {
    name: '異なるソケットのCPUとマザーボード (互換性なし)',
    findCpu: (cpus) => cpus.find(c => c.manufacturer === 'Intel'),
    findMotherboard: (motherboards) => motherboards.find(m => m.socket.includes('AM')),
    expectCompatible: false
  },
  {
    name: 'メモリタイプの互換性問題 (DDR5 CPU with DDR4 マザーボード)',
    findCpu: (cpus) => cpus.find(c => c.supportedMemoryType.includes('DDR5') && !c.supportedMemoryType.includes('DDR4')),
    findMotherboard: (motherboards) => motherboards.find(m => m.memoryType.includes('DDR4') && !m.memoryType.includes('DDR5')),
    expectCompatible: false
  },
  {
    name: 'メモリ速度の制限 (低速CPU, 高速マザーボード)',
    findCpu: (cpus) => cpus.reduce((prev, current) => 
      (prev.maxMemorySpeed < current.maxMemorySpeed) ? prev : current),
    findMotherboard: (motherboards) => motherboards.reduce((prev, current) => 
      (prev.maxMemorySpeed > current.maxMemorySpeed) ? prev : current),
    expectCompatible: true  // 警告はあるが互換性はある
  },
  {
    name: '高TDPのCPUと下位チップセットマザーボード (情報提供)',
    findCpu: (cpus) => cpus.find(c => c.tdp > 125),
    findMotherboard: (motherboards) => motherboards.find(m => m.chipset.includes('H6')),
    expectCompatible: true  // 情報レベルの警告のみ
  }
];

// 全テストケースを実行
testCases.forEach(testCase => {
  writeLog(`テストケース: ${testCase.name}`);
  
  const cpu = testCase.findCpu(cpus);
  const motherboard = testCase.findMotherboard(motherboards);
  
  if (!cpu || !motherboard) {
    writeLog('  スキップ: 適切なテストデータが見つかりませんでした');
    return;
  }
  
  const result = testCpuMotherboardCompatibility(cpu.id, motherboard.id);
  
  // 互換性の期待結果と実際の結果を比較
  const hasIssues = result.issues.some(issue => issue.severity === 'critical');
  const isCompatible = !hasIssues;
  
  if (isCompatible === testCase.expectCompatible) {
    writeLog('  ✅ テスト成功: 期待通りの結果');
  } else {
    writeLog('  ❌ テスト失敗: 期待と異なる結果');
  }
  writeLog('');
});

// キャッシング機能のテスト
writeLog('キャッシング機能のテスト');
if (cpus.length > 0 && motherboards.length > 0) {
  const cpu = cpus[0];
  const motherboard = motherboards[0];
  
  writeLog('1回目の呼び出し:');
  const firstResult = testCpuMotherboardCompatibility(cpu.id, motherboard.id);
  
  writeLog('2回目の呼び出し (キャッシュから取得されるはず):');
  const secondResult = testCpuMotherboardCompatibility(cpu.id, motherboard.id);
  
  // キャッシングの効果を検証
  const speedup = parseFloat(firstResult.executionTime) / parseFloat(secondResult.executionTime);
  writeLog(`キャッシングによる高速化: ${speedup.toFixed(2)}倍`);
}

writeLog('互換性チェックテスト終了');
