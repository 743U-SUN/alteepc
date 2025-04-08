// このファイルは型定義を@/types/partsにリダイレクトします
import { 
  BasePart, 
  CPU, 
  Motherboard, 
  Memory, 
  GPU, 
  Storage, 
  PSU, 
  Case, 
  CPUCooler, 
  Fan, 
  CurrentPrice,
  Shop
} from '@/types/parts';

// 後方互換性のために型をエクスポート
export type { 
  BasePart, 
  CPU, 
  Motherboard, 
  Memory, 
  GPU, 
  Storage, 
  PSU, 
  Case, 
  CPUCooler, 
  Fan,
  CurrentPrice,
  Shop
};
