import { PartsService } from './parts-service';
import { BuildService } from './build-service';
import { PrismaPartsService } from './prisma-parts-service';
import { PrismaBuildService } from './prisma-build-service';

// サービスの種類を環境変数から判断するための型
type DataSource = 'memory' | 'database';

// データソースの決定
function getDataSource(): DataSource {
  // 環境変数でデータソースを切り替え可能に
  const useDatabase = process.env.USE_DATABASE === 'true';
  return useDatabase ? 'database' : 'memory';
}

// サービスファクトリークラス
export class ServiceFactory {
  private static dataSource: DataSource = getDataSource();
  
  // データソースの変更（テスト用途など）
  static setDataSource(source: DataSource) {
    this.dataSource = source;
    console.log(`[ServiceFactory] データソースを ${source} に変更しました`);
  }
  
  // パーツサービスの取得
  static getPartsService() {
    if (this.dataSource === 'database') {
      console.log('[ServiceFactory] データベース版パーツサービスを使用します');
      return new PrismaPartsService();
    } else {
      console.log('[ServiceFactory] インメモリ版パーツサービスを使用します');
      return new PartsService();
    }
  }
  
  // ビルドサービスの取得
  static getBuildService() {
    if (this.dataSource === 'database') {
      console.log('[ServiceFactory] データベース版ビルドサービスを使用します');
      return new PrismaBuildService();
    } else {
      console.log('[ServiceFactory] インメモリ版ビルドサービスを使用します');
      return new BuildService();
    }
  }
}
