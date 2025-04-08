import { prisma } from '@/lib/db';
import type { FilterOptions, SortOption } from '@/types/parts';

// データベースを利用するパーツサービス
export class PrismaPartsService {
  // CPUの取得
  async getCPUs(filters: FilterOptions = {}, sortBy: SortOption = 'recommended') {
    try {
      // Where句の構築
      const where: any = {};
      
      if (filters.manufacturer) {
        where.manufacturer = {
          equals: filters.manufacturer,
          mode: 'insensitive'
        };
      }
      
      if (filters.socket) {
        where.socket = {
          equals: filters.socket,
          mode: 'insensitive'
        };
      }

      if (filters.minCores) {
        where.cores = {
          gte: parseInt(filters.minCores)
        };
      }

      if (filters.maxPrice) {
        where.price = {
          lte: parseInt(filters.maxPrice)
        };
      }

      if (filters.integratedGraphics !== undefined) {
        where.integratedGraphics = filters.integratedGraphics === 'true' || filters.integratedGraphics === true;
      }
      
      // ソート条件の構築
      let orderBy: any;
      switch (sortBy) {
        case 'recommended':
          orderBy = { recommendationScore: 'desc' };
          break;
        case 'price_asc':
          orderBy = { price: 'asc' };
          break;
        case 'price_desc':
          orderBy = { price: 'desc' };
          break;
        case 'cores_desc':
          orderBy = { cores: 'desc' };
          break;
        default:
          orderBy = { recommendationScore: 'desc' };
      }
      
      // データベースクエリの実行
      const cpus = await prisma.cPU.findMany({
        where,
        orderBy,
      });
      
      return cpus;
    } catch (error) {
      console.error('CPUデータ取得エラー:', error);
      throw error;
    }
  }
  
  // CPU詳細の取得
  async getCPUById(id: string) {
    try {
      return await prisma.cPU.findUnique({
        where: { id }
      });
    } catch (error) {
      console.error(`ID ${id} のCPU取得エラー:`, error);
      throw error;
    }
  }
  
  // マザーボードの取得
  async getMotherboards(filters: FilterOptions = {}, sortBy: SortOption = 'recommended') {
    try {
      // Where句の構築
      const where: any = {};
      
      if (filters.manufacturer) {
        where.manufacturer = {
          equals: filters.manufacturer,
          mode: 'insensitive'
        };
      }
      
      if (filters.socket) {
        where.socket = {
          equals: filters.socket,
          mode: 'insensitive'
        };
      }
      
      if (filters.formFactor) {
        where.formFactor = {
          equals: filters.formFactor,
          mode: 'insensitive'
        };
      }

      if (filters.chipset) {
        where.chipset = {
          equals: filters.chipset,
          mode: 'insensitive'
        };
      }

      if (filters.memoryType) {
        where.memoryType = {
          has: filters.memoryType
        };
      }

      if (filters.maxPrice) {
        where.price = {
          lte: parseInt(filters.maxPrice)
        };
      }
      
      // ソート条件の構築
      let orderBy: any;
      switch (sortBy) {
        case 'recommended':
          orderBy = { recommendationScore: 'desc' };
          break;
        case 'price_asc':
          orderBy = { price: 'asc' };
          break;
        case 'price_desc':
          orderBy = { price: 'desc' };
          break;
        default:
          orderBy = { recommendationScore: 'desc' };
      }
      
      // データベースクエリの実行
      const motherboards = await prisma.motherboard.findMany({
        where,
        orderBy,
      });
      
      return motherboards;
    } catch (error) {
      console.error('マザーボードデータ取得エラー:', error);
      throw error;
    }
  }
  
  // マザーボード詳細の取得
  async getMotherboardById(id: string) {
    try {
      return await prisma.motherboard.findUnique({
        where: { id }
      });
    } catch (error) {
      console.error(`ID ${id} のマザーボード取得エラー:`, error);
      throw error;
    }
  }

  // 他のコンポーネント取得メソッドは将来的に実装
}
