import { PrismaClient } from '@prisma/client';

// PrismaClientのグローバルシングルトンインスタンス
// これにより、ホットリロード時に複数のインスタンスが作成されるのを防ぎます
declare global {
  var prisma: PrismaClient | undefined;
}

// Prisma 6用の設定
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

// 本番環境では通常のインスタンス、開発環境ではグローバルに保存されたインスタンスを使用
export const prisma = globalThis.prisma ?? prismaClientSingleton();

// 開発環境でのみグローバル変数にインスタンスを保存
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// データベース接続の初期化と接続テスト
export async function initDatabase() {
  try {
    // Prisma 6では$connectメソッドが自動で呼ばれるので必要ない
    console.log('📬 データベースに接続しました');
    
    // テーブルの存在確認（CPUテーブルを確認）
    const tableExists = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'CPU'
      );
    `;
    
    console.log('テーブル確認結果:', tableExists);
    
    return true;
  } catch (error) {
    console.error('❌ データベース接続エラー:', error);
    return false;
  }
}
