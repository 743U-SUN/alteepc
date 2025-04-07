import { cpus, motherboards } from '../data';
import { checkCpuMotherboardCompatibility } from './index';
import { CompatibilityIssue } from './index';
import fs from 'fs';
import path from 'path';

// ログディレクトリとファイルパスを設定
const logsDir = path.join(process.cwd(), 'logs');
const logFilePath = path.join(logsDir, 'compatibility-test.log');

// ログディレクトリが存在しない場合は作成
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// ログファイルへの書き込み関数
function writeLog(message: string) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFilePath, logEntry);
  console.log(logEntry.trim());
}

// テスト開始
writeLog('互換性チェックテスト開始');

// CPUとマザーボードのペアをテストする関数
function testCpuMotherboardCompatibility(cpuId: string, motherboardId: string) {
  const cpu = cpus.find(c => c.id === cpuId);
  const motherboard = motherboards.find(m => m.id === motherboardId);
  
  if (!cpu || !motherboard) {
    writeLog('エラー: テスト用のCPUまたはマザーボードが見つかりません');
    return;
  }
  
  writeLog(`テスト: CPU "${cpu.manufacturer} ${cpu.model}" と マザーボード "${motherboard.manufacturer} ${motherboard.model}"`);
  
  const issues = checkCpuMotherboardCompatibility(cpuId, motherboardId);
  
  if (issues.length === 0) {
    writeLog('  結果: 互換性の問題はありません');
  } else {
    writeLog(`  結果: ${issues.length}件の互換性問題が検出されました`);
    issues.forEach(issue => {
      writeLog(`    - [${issue.severity}] ${issue.message}`);
    });
  }
  writeLog('');
}

// テストケース1: 同じソケットのCPUとマザーボード (互換性あり)
// Intel LGA1700 CPUとLGA1700マザーボード
const intelCpu = cpus.find(c => c.socket === 'LGA1700');
const intelMotherboard = motherboards.find(m => m.socket === 'LGA1700');

if (intelCpu && intelMotherboard) {
  testCpuMotherboardCompatibility(intelCpu.id, intelMotherboard.id);
}

// テストケース2: 異なるソケットのCPUとマザーボード (互換性なし)
// Intel CPUとAMDマザーボード
const intelCpu2 = cpus.find(c => c.manufacturer === 'Intel');
const amdMotherboard = motherboards.find(m => m.socket.includes('AM'));

if (intelCpu2 && amdMotherboard) {
  testCpuMotherboardCompatibility(intelCpu2.id, amdMotherboard.id);
}

// テストケース3: メモリタイプの互換性問題
// DDR5のみのCPUとDDR4のみのマザーボード
const ddr5Cpu = cpus.find(c => c.supportedMemoryType.includes('DDR5') && !c.supportedMemoryType.includes('DDR4'));
const ddr4Motherboard = motherboards.find(m => m.memoryType.includes('DDR4') && !m.memoryType.includes('DDR5'));

if (ddr5Cpu && ddr4Motherboard) {
  testCpuMotherboardCompatibility(ddr5Cpu.id, ddr4Motherboard.id);
} else {
  // このケースに合致するデータがない場合は手動でテスト
  writeLog('メモリタイプ互換性テスト: 適切なテストデータが見つかりませんでした');
  
  // 第1世代Ryzen (AM4, DDR4)をテスト
  const amdCpu = cpus.find(c => c.socket === 'AM4');
  const am5Motherboard = motherboards.find(m => m.socket === 'AM5');
  
  if (amdCpu && am5Motherboard) {
    testCpuMotherboardCompatibility(amdCpu.id, am5Motherboard.id);
  }
}

// テストケース4: メモリ速度の制限
// より低いメモリ速度のCPUと高いメモリ速度のマザーボード
const lowMemSpeedCpu = cpus.reduce((prev, current) => 
  (prev.maxMemorySpeed < current.maxMemorySpeed) ? prev : current
);

const highMemSpeedMotherboard = motherboards.reduce((prev, current) => 
  (prev.maxMemorySpeed > current.maxMemorySpeed) ? prev : current
);

if (lowMemSpeedCpu && highMemSpeedMotherboard) {
  testCpuMotherboardCompatibility(lowMemSpeedCpu.id, highMemSpeedMotherboard.id);
}

writeLog('互換性チェックテスト終了');
