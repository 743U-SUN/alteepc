// prisma/import-cpus.ts
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
// PapaParseをインポート
import Papa from 'papaparse';
// PapaParseの型定義を利用
import { ParseError } from 'papaparse';
import path from 'path';

const prisma = new PrismaClient();

/**
 * CPUデータインポートスクリプト
 * 
 * 使用方法:
 * npx ts-node prisma/import-cpus.ts [CSVファイルパス]
 * 
 * CSVファイルの形式:
 * - ヘッダー行が必要です
 * - 必須フィールド: manufacturer, model, socket, cores, threads
 * - 他のフィールドはオプションですが、可能な限り入力することを推奨します
 */

// CSVファイルのパス（引数から取得するか、デフォルトを使用）
const csvFilePath = process.argv[2] || './prisma/alteePC_cpu.csv';

// 文字列を安全に数値に変換するヘルパー関数（無効な値はnullを返す）
function safeParseInt(value: string | undefined): number | null {
  if (!value || value.trim() === '') return null;
  const cleaned = value.replace(/[^\d.-]/g, '');
  const parsed = parseInt(cleaned, 10);
  return isNaN(parsed) ? null : parsed;
}

function safeParseFloat(value: string | undefined): number | null {
  if (!value || value.trim() === '') return null;
  const cleaned = value.replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
}

// 日付文字列を安全にDateTimeに変換するヘルパー関数
function safeParseDate(value: string | undefined): Date | null {
  if (!value || value.trim() === '') return null;
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
}

// 配列文字列（パイプ区切り）を安全に配列に変換するヘルパー関数
function safeParseArray(value: string | undefined): string[] {
  if (!value || value.trim() === '') return [];
  return value.includes('|') ? value.split('|').map(item => item.trim()) : [value.trim()];
}

// Yes/No文字列を安全にブーリアンに変換するヘルパー関数
function safeParseBoolean(value: string | undefined): boolean | null {
  if (!value || value.trim() === '') return null;
  const lowered = value.toLowerCase().trim();
  if (lowered === 'yes' || lowered === 'true' || lowered === '1') return true;
  if (lowered === 'no' || lowered === 'false' || lowered === '0') return false;
  return null;
}

// レコードの型定義
interface CsvRecord {
  [key: string]: string | undefined;
  manufacturer: string;
  model: string;
  socket: string;
  cores: string;
  threads: string;
  baseClock?: string;
  boostClock?: string;
  tdp?: string;
  supportedMemoryType?: string;
  maxMemorySpeed?: string;
  integratedGraphics?: string;
  integratedGraphicsModel?: string;
  price?: string;
  releaseDate?: string;
  imageUrl?: string;
  url?: string;
  recommendationScore?: string;
  description?: string;
}

// バリデーション結果の型定義
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// インポート結果の型定義
interface ImportResult {
  status: 'success' | 'error';
  record: string;
  operation?: 'create' | 'update';
  id?: string;
  error?: string;
}

// データ検証用の関数
function validateCPURecord(record: CsvRecord): ValidationResult {
  const errors: string[] = [];
  
  // 必須フィールドの検証
  const requiredFields = ['manufacturer', 'model', 'socket', 'cores', 'threads'];
  for (const field of requiredFields) {
    if (!record[field] || record[field].trim() === '') {
      errors.push(`必須項目 '${field}' が未入力です`);
    }
  }
  
  // 値域チェック
  if (record.cores && safeParseInt(record.cores) !== null) {
    const cores = safeParseInt(record.cores);
    if (cores! <= 0 || cores! > 128) {
      errors.push(`コア数 (${cores}) が妥当な範囲外です (1-128)`);
    }
  }
  
  if (record.threads && safeParseInt(record.threads) !== null) {
    const threads = safeParseInt(record.threads);
    if (threads! <= 0 || threads! > 256) {
      errors.push(`スレッド数 (${threads}) が妥当な範囲外です (1-256)`);
    }
  }
  
  if (record.baseClock && safeParseFloat(record.baseClock) !== null) {
    const baseClock = safeParseFloat(record.baseClock);
    if (baseClock! <= 0 || baseClock! > 10) {
      errors.push(`ベースクロック (${baseClock}) が妥当な範囲外です (0-10 GHz)`);
    }
  }
  
  if (record.boostClock && safeParseFloat(record.boostClock) !== null) {
    const boostClock = safeParseFloat(record.boostClock);
    if (boostClock! <= 0 || boostClock! > 10) {
      errors.push(`ブーストクロック (${boostClock}) が妥当な範囲外です (0-10 GHz)`);
    }
  }
  
  if (record.tdp && safeParseInt(record.tdp) !== null) {
    const tdp = safeParseInt(record.tdp);
    if (tdp! < 0 || tdp! > 500) {
      errors.push(`TDP (${tdp}) が妥当な範囲外です (0-500 W)`);
    }
  }
  
  if (record.price && safeParseInt(record.price) !== null) {
    const price = safeParseInt(record.price);
    if (price! <= 0) {
      errors.push(`価格 (${price}) が0以下です`);
    }
  }
  
  if (record.releaseDate && safeParseDate(record.releaseDate) !== null) {
    const releaseDate = safeParseDate(record.releaseDate);
    if (releaseDate! > new Date()) {
      errors.push(`発売日 (${record.releaseDate}) が未来の日付です`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// トランザクションを使用したインポート処理
async function importCPUs() {
  console.log(`CSVファイル "${csvFilePath}" からCPUデータをインポートします...`);
  
  try {
    // ファイルが存在するか確認
    if (!fs.existsSync(csvFilePath)) {
      throw new Error(`CSVファイル "${csvFilePath}" が見つかりません`);
    }
    
    const csvData = fs.readFileSync(csvFilePath, 'utf8');
    
    // PapaParseを使用してCSVデータをパース
    const parseResult = Papa.parse<CsvRecord>(csvData, {
      header: true,         // 最初の行をヘッダーとして扱う
      skipEmptyLines: true, // 空行をスキップ
      dynamicTyping: false, // 文字列として全ての値を取得（後で手動変換）
      // trimHeadersオプションはPapaParseの型定義に存在しないため削除
      transform: (value: string): string => value.trim() // 全ての値の前後の空白を削除
    });
    
    // エラーチェック
    if (parseResult.errors && parseResult.errors.length > 0) {
      console.warn('CSVパース中に警告またはエラーが発生しました:');
      parseResult.errors.forEach((error, index) => {
        console.warn(`  ${index + 1}. 行 ${error.row || '不明'}: ${error.message}`);
      });
    }
    
    const records = parseResult.data;
    console.log(`パース完了: ${records.length}件のCPUレコードを読み込みました`);
    
    // 各レコードの検証
    const validationResults = records.map((record: CsvRecord) => ({
      record,
      validation: validateCPURecord(record)
    }));
    
    const invalidRecords = validationResults.filter(r => !r.validation.isValid);
    
    // 無効なレコードの警告
    if (invalidRecords.length > 0) {
      console.warn(`警告: ${invalidRecords.length}件のレコードに問題があります:`);
      invalidRecords.forEach((r, index) => {
        console.warn(`  ${index + 1}. ${r.record.manufacturer || '不明'} ${r.record.model || '不明'}:`);
        r.validation.errors.forEach(error => {
          console.warn(`     - ${error}`);
        });
      });
      
      console.log('問題のあるレコードはスキップします。');
    }
    
    // 有効なレコードのみ処理
    const validRecords = validationResults
      .filter(r => r.validation.isValid)
      .map(r => r.record);
    
    console.log(`${validRecords.length}件の有効なレコードを処理します...`);
    
    // 重複チェック
    const modelGroups = new Map<string, CsvRecord[]>();
    for (const record of validRecords) {
      const key = `${record.manufacturer}:${record.model}`.toLowerCase();
      if (!modelGroups.has(key)) {
        modelGroups.set(key, []);
      }
      modelGroups.get(key)!.push(record);
    }
    
    const duplicates = Array.from(modelGroups.entries())
      .filter(([_, records]) => records.length > 1);
    
    if (duplicates.length > 0) {
      console.warn(`警告: ${duplicates.length}件のモデルに重複があります:`);
      duplicates.forEach(([key, records], index) => {
        console.warn(`  ${index + 1}. ${key}: ${records.length}件`);
      });
      
      // 重複がある場合は最初のレコードのみを使用
      console.log('重複があるモデルは最初のレコードのみ使用します。');
    }
    
    // 重複を除去した有効なレコード
    const uniqueValidRecords = Array.from(modelGroups.values())
      .map(records => records[0]);
    
    console.log(`${uniqueValidRecords.length}件の一意なレコードを処理します...`);
    
    // 全レコードをトランザクションで一括処理
    const result = await prisma.$transaction(async (tx) => {
      const importResults: ImportResult[] = [];
      
      for (const record of uniqueValidRecords) {
        try {
          // 既存レコードの確認（製造元とモデルで一意と仮定）
          const existingCPU = await tx.cPU.findFirst({
            where: {
              AND: [
                { manufacturer: record.manufacturer },
                { model: record.model }
              ]
            }
          });
          
          // データの準備
          const cpuData = {
            manufacturer: record.manufacturer,
            model: record.model,
            socket: record.socket,
            cores: safeParseInt(record.cores) || 0,
            threads: safeParseInt(record.threads) || 0,
            baseClock: safeParseFloat(record.baseClock) || 0,
            boostClock: safeParseFloat(record.boostClock) || 0,
            tdp: safeParseInt(record.tdp) || 0,
            supportedMemoryType: safeParseArray(record.supportedMemoryType),
            maxMemorySpeed: safeParseInt(record.maxMemorySpeed) || 0,
            
            // 内蔵グラフィックスの処理（2つのフィールドを適切に処理）
            integratedGraphics: safeParseBoolean(record.integratedGraphics) ? 'Yes' : null,
            integratedGraphicsModel: record.integratedGraphicsModel || null,
            
            price: safeParseInt(record.price) || 0,
            releaseDate: safeParseDate(record.releaseDate),
            imageUrl: record.imageUrl || null,
            url: record.url || null,
            recommendationScore: safeParseInt(record.recommendationScore) || 50,
            description: record.description || null,
          };
          
          let result;
          
          if (existingCPU) {
            // 既存レコードの更新
            result = await tx.cPU.update({
              where: { id: existingCPU.id },
              data: cpuData
            });
            console.log(`更新: ${record.manufacturer} ${record.model}`);
          } else {
            // 新規レコードの作成
            result = await tx.cPU.create({
              data: cpuData
            });
            console.log(`作成: ${record.manufacturer} ${record.model}`);
          }
          
          importResults.push({
            status: 'success',
            record: `${record.manufacturer} ${record.model}`,
            operation: existingCPU ? 'update' : 'create',
            id: result.id
          });
        } catch (error: any) { // エラータイプを any として指定
          console.error(`エラー: ${record.manufacturer} ${record.model}:`, error);
          importResults.push({
            status: 'error',
            record: `${record.manufacturer} ${record.model}`,
            error: error.message
          });
        }
      }
      
      return importResults;
    });
    
    // 結果のサマリー
    const successCount = result.filter(r => r.status === 'success').length;
    const errorCount = result.filter(r => r.status === 'error').length;
    const createCount = result.filter(r => r.status === 'success' && r.operation === 'create').length;
    const updateCount = result.filter(r => r.status === 'success' && r.operation === 'update').length;
    
    console.log(`インポート完了:`);
    console.log(`- 成功: ${successCount}件（新規: ${createCount}件, 更新: ${updateCount}件）`);
    console.log(`- 失敗: ${errorCount}件`);
    
    // エラーの詳細を表示
    if (errorCount > 0) {
      console.log(`\nエラー詳細:`);
      result
        .filter(r => r.status === 'error')
        .forEach((r, i) => {
          console.log(`${i + 1}. ${r.record}: ${r.error}`);
        });
    }
    
    // インポート結果をログファイルに保存
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const logDir = './logs';
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    const logFilePath = `${logDir}/cpu-import-${timestamp}.json`;
    fs.writeFileSync(logFilePath, JSON.stringify({
      timestamp: new Date().toISOString(),
      sourceFile: csvFilePath,
      summary: {
        total: records.length,
        valid: validRecords.length,
        unique: uniqueValidRecords.length,
        success: successCount,
        created: createCount,
        updated: updateCount,
        failed: errorCount
      },
      results: result
    }, null, 2));
    
    console.log(`インポートログが保存されました: ${logFilePath}`);
    
    return result;
  } catch (error: any) { // エラータイプを any として指定
    console.error('CSVファイルの読み込みまたは処理中にエラーが発生しました:', error);
    throw error;
  }
}

// スクリプト実行
importCPUs()
  .catch((e) => {
    console.error('エラー:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });