import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';
import { generateBuildId } from '@/lib/url/build-url';
import { PrismaPartsService } from './prisma-parts-service';
import type { PCBuildComponents } from '@/types/service';
import type { CompatibilityIssue } from '@/types/compatibility';

export class PrismaBuildService {
  private partsService: PrismaPartsService;
  
  constructor() {
    this.partsService = new PrismaPartsService();
  }
  
  // PC構成の保存
  async saveBuild(buildData: {
    components: PCBuildComponents;
    name?: string;
  }): Promise<{
    id: string;
    url: string;
    createdAt: Date;
    expiresAt: Date;
  }> {
    // 新しいbuildIdを生成
    const buildId = generateBuildId();
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + 90); // 90日後の有効期限
    
    // 互換性チェック（現時点ではダミーデータとして空の配列）
    const compatibilityIssues: CompatibilityIssue[] = [];
    
    // 価格計算
    const totalPrice = await this.calculateTotalPrice(buildData.components);
    
    try {
      // データベースにPC構成を保存
      const build = await prisma.pCBuild.create({
        data: {
          id: buildId,
          name: buildData.name || null,
          totalPrice,
          compatibilityIssues: compatibilityIssues.length > 0 ? JSON.stringify(compatibilityIssues) : Prisma.JsonNull,
          lastAccessedAt: now,
          expiresAt,
          accessCount: 0,
          
          // リレーションの設定
          cpu: buildData.components.cpu ? {
            connect: { id: buildData.components.cpu }
          } : undefined,
          
          motherboard: buildData.components.motherboard ? {
            connect: { id: buildData.components.motherboard }
          } : undefined,
          
          // Note: メモリ、ストレージ、ファンなどの配列は中間テーブルが必要
          // 現段階では実装されていないため、将来的に実装予定
        }
      });
      
      console.log(`[PrismaBuildService] Saved build with ID: ${buildId}`);
      
      return {
        id: buildId,
        url: `/build/${buildId}`,
        createdAt: build.createdAt,
        expiresAt: build.expiresAt
      };
    } catch (error) {
      console.error('[PrismaBuildService] Error saving build:', error);
      throw error;
    }
  }
  
  // PC構成の取得
  async getBuild(buildId: string) {
    try {
      const build = await prisma.pCBuild.findUnique({
        where: { id: buildId },
        include: {
          cpu: true,
          motherboard: true,
          // 将来的に他のコンポーネントも含める
        }
      });
      
      if (!build) {
        console.log(`[PrismaBuildService] Build not found: ${buildId}`);
        return null;
      }
      
      // アクセス回数と最終アクセス日時の更新
      await prisma.pCBuild.update({
        where: { id: buildId },
        data: {
          accessCount: { increment: 1 },
          lastAccessedAt: new Date()
        }
      });
      
      console.log(`[PrismaBuildService] Build found, access count: ${build.accessCount + 1}`);
      
      // 構成データを返却
      return {
        ...build,
        // 互換性の問題をJSON文字列からオブジェクトに変換
        compatibilityIssues: build.compatibilityIssues 
          ? JSON.parse(build.compatibilityIssues as string) 
          : [],
        // コンポーネントを適切な形式に整形
        components: {
          cpu: build.cpuId,
          motherboard: build.motherboardId,
          memory: null, // 将来的に実装
          gpu: null, // 将来的に実装
          storage: null, // 将来的に実装
          psu: null, // 将来的に実装
          case: null, // 将来的に実装
          cpuCooler: null, // 将来的に実装
          fans: null, // 将来的に実装
        }
      };
    } catch (error) {
      console.error(`[PrismaBuildService] Error getting build ${buildId}:`, error);
      throw error;
    }
  }
  
  // すべてのPC構成を取得
  async getAllBuilds() {
    try {
      const builds = await prisma.pCBuild.findMany({
        include: {
          cpu: true,
          motherboard: true,
          // 将来的に他のコンポーネントも含める
        }
      });
      
      // 構成データを整形して返却
      return builds.map(build => ({
        ...build,
        // 互換性の問題をJSON文字列からオブジェクトに変換
        compatibilityIssues: build.compatibilityIssues 
          ? JSON.parse(build.compatibilityIssues as string) 
          : [],
        // コンポーネントを適切な形式に整形
        components: {
          cpu: build.cpuId,
          motherboard: build.motherboardId,
          memory: null, // 将来的に実装
          gpu: null, // 将来的に実装
          storage: null, // 将来的に実装
          psu: null, // 将来的に実装
          case: null, // 将来的に実装
          cpuCooler: null, // 将来的に実装
          fans: null, // 将来的に実装
        }
      }));
    } catch (error) {
      console.error('[PrismaBuildService] Error getting all builds:', error);
      throw error;
    }
  }
  
  // 期限切れの構成を削除
  async cleanupExpiredBuilds() {
    try {
      const now = new Date();
      const result = await prisma.pCBuild.deleteMany({
        where: {
          expiresAt: {
            lt: now
          }
        }
      });
      
      console.log(`[PrismaBuildService] Cleaned up ${result.count} expired builds`);
      return result.count;
    } catch (error) {
      console.error('[PrismaBuildService] Error cleaning up expired builds:', error);
      throw error;
    }
  }
  
  // 合計価格の計算
  async calculateTotalPrice(components: PCBuildComponents): Promise<number> {
    let totalPrice = 0;
    
    // CPU価格
    if (components.cpu) {
      const cpu = await this.partsService.getCPUById(components.cpu);
      if (cpu) {
        totalPrice += cpu.price;
      }
    }
    
    // マザーボード価格
    if (components.motherboard) {
      const motherboard = await this.partsService.getMotherboardById(components.motherboard);
      if (motherboard) {
        totalPrice += motherboard.price;
      }
    }
    
    // 将来的に他のコンポーネントの価格も追加
    
    return totalPrice;
  }
}
