import { createId } from '@paralleldrive/cuid2';
import { PartsService } from './parts-service';
import { generateBuildId } from '@/lib/url/build-url';
import { ServicePCBuild, PCBuildComponents, SavedBuildResult } from '@/types/service';
import { CompatibilityIssue } from '@/types/compatibility';

// シングルトンパターンでBuildServiceを実装
// これにより、サーバー起動中はメモリ内にビルドデータが保持される
let instance: BuildService | null = null;

export class BuildService {
  private builds: ServicePCBuild[] = [];
  private partsService!: PartsService;
  
  constructor() {
    // シングルトンインスタンスの確認
    if (instance) {
      return instance;
    }
    
    this.partsService = new PartsService();
    instance = this;
    
    // アプリケーション起動時にログを出力
    console.log('[BuildService] Initialized');
  }
  
  // PC構成の保存
  async saveBuild(buildData: {
    components: PCBuildComponents;
    name?: string;
  }): Promise<SavedBuildResult> {
    // 新しいbuildIdを生成
    const buildId = generateBuildId();
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + 90); // 90日後の有効期限
    
    // 互換性チェック（ここではダミーデータとして空の配列を返す - 後で実装）
    const compatibilityIssues: CompatibilityIssue[] = [];
    
    // 価格計算
    const totalPrice = await this.calculateTotalPrice(buildData.components);
    
    // 新しい構成データを作成
    const newBuild: ServicePCBuild = {
      id: buildId,
      components: buildData.components,
      compatibilityIssues,
      totalPrice,
      name: buildData.name || null,
      createdAt: now,
      lastAccessedAt: now,
      expiresAt,
      accessCount: 0
    };
    
    // メモリ上に保存（将来的にデータベースに保存）
    this.builds.push(newBuild);
    
    console.log(`[BuildService] Saved build with ID: ${buildId}`);
    
    return {
      id: buildId,
      url: `/build/${buildId}`,
      createdAt: now,
      expiresAt
    };
  }
  
  // PC構成の取得
  async getBuild(buildId: string): Promise<ServicePCBuild | null> {
    console.log(`[BuildService] Getting build with ID: ${buildId}`);
    console.log(`[BuildService] Available builds: ${this.builds.length}`);
    
    const build = this.builds.find(b => b.id === buildId);
    
    if (!build) {
      console.log(`[BuildService] Build not found: ${buildId}`);
      return null;
    }
    
    // アクセス回数と最終アクセス日時の更新
    build.accessCount += 1;
    build.lastAccessedAt = new Date();
    console.log(`[BuildService] Build found, access count: ${build.accessCount}`);
    
    return build;
  }
  
  // すべてのPC構成を取得
  async getAllBuilds(): Promise<ServicePCBuild[]> {
    return this.builds;
  }
  
  // 期限切れの構成を削除
  async cleanupExpiredBuilds(): Promise<number> {
    const now = new Date();
    const initialCount = this.builds.length;
    
    this.builds = this.builds.filter(build => build.expiresAt > now);
    
    const removedCount = initialCount - this.builds.length;
    console.log(`[BuildService] Cleaned up ${removedCount} expired builds`);
    
    return removedCount;
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
    
    // メモリ価格
    if (components.memory && components.memory.length > 0) {
      for (const memoryId of components.memory) {
        const memory = await this.partsService.getMemoryById(memoryId);
        if (memory) {
          totalPrice += memory.price;
        }
      }
    }
    
    // GPU価格
    if (components.gpu) {
      const gpu = await this.partsService.getGPUById(components.gpu);
      if (gpu) {
        totalPrice += gpu.price;
      }
    }
    
    // ストレージ価格
    if (components.storage && components.storage.length > 0) {
      for (const storageId of components.storage) {
        const storage = await this.partsService.getStorageById(storageId);
        if (storage) {
          totalPrice += storage.price;
        }
      }
    }
    
    // 電源価格
    if (components.psu) {
      const psu = await this.partsService.getPSUById(components.psu);
      if (psu) {
        totalPrice += psu.price;
      }
    }
    
    // ケース価格
    if (components.case) {
      const pcCase = await this.partsService.getCaseById(components.case);
      if (pcCase) {
        totalPrice += pcCase.price;
      }
    }
    
    // CPUクーラー価格
    if (components.cpuCooler) {
      const cooler = await this.partsService.getCoolerById(components.cpuCooler);
      if (cooler) {
        totalPrice += cooler.price;
      }
    }
    
    // ファン価格
    if (components.fans && components.fans.length > 0) {
      for (const fanId of components.fans) {
        const fan = await this.partsService.getFanById(fanId);
        if (fan) {
          totalPrice += fan.price;
        }
      }
    }
    
    return totalPrice;
  }
}