// src/types/index.ts
import { z } from 'zod';

// Zodスキーマの定義
export const ConfigurationSchema = z.object({
  cpuId: z.string().optional(),
  motherboardId: z.string().optional(),
  ramId: z.string().optional(),
  gpuId: z.string().optional(),
  caseId: z.string().optional(),
  powerSupplyId: z.string().optional(),
  coolingId: z.string().optional(),
  storageIds: z.array(z.string()).default([]),
});

export type Configuration = z.infer<typeof ConfigurationSchema>;

// パーツカテゴリの型定義
export type PartCategory = 
  | 'cpu' 
  | 'motherboard' 
  | 'ram' 
  | 'gpu' 
  | 'case' 
  | 'powerSupply' 
  | 'cooling' 
  | 'storage';

export const partCategories: PartCategory[] = [
  'cpu',
  'motherboard',
  'ram',
  'gpu',
  'case',
  'powerSupply',
  'cooling',
  'storage',
];

// 日本語の表示名マッピング
export const partCategoryNames: Record<PartCategory, string> = {
  cpu: 'CPU',
  motherboard: 'マザーボード',
  ram: 'メモリ',
  gpu: 'グラフィックカード',
  case: 'PCケース',
  powerSupply: '電源ユニット',
  cooling: 'CPUクーラー',
  storage: 'ストレージ',
};
