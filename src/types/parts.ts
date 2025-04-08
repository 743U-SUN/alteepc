// フィルターインターフェースの定義
export interface FilterOptions {
  [key: string]: any;
}

// ソートオプションの型定義
export type SortOption = 'recommended' | 'price_asc' | 'price_desc' | string;

// 基本パーツインターフェース
export interface BasePart {
  id: string;
  manufacturer: string;
  model: string;
  price: number;
  imageUrl: string;
  releaseDate: string;
  url: string;
  recommendationScore: number;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
}

// CPU
export interface CPU extends BasePart {
  socket: string;
  cores: number;
  threads: number;
  baseClock: number;
  boostClock: number;
  tdp: number;
  supportedMemoryType: string[];
  maxMemorySpeed: number;
  integratedGraphics: boolean;
}

// マザーボード
export interface Motherboard extends BasePart {
  socket: string;
  formFactor: string;
  chipset: string;
  memoryType: string[];
  memorySlots: number;
  maxMemorySpeed: number;
  maxMemory: number;
  pciSlots: {
    pcie_x16: number;
    pcie_x8: number;
    pcie_x4: number;
    pcie_x1: number;
  };
  sataConnectors: number;
  m2Slots: number;
  usb: {
    usb2: number;
    usb3: number;
    typeC: number;
  };
  wirelessNetworking?: string[];
}

// メモリ
export interface Memory extends BasePart {
  type: string;
  capacity: number;
  speed: number;
  timings: string;
  modules: number;
  voltage: number;
  rgb?: boolean;
  color?: string;
}

// グラフィックカード
export interface GPU extends BasePart {
  chipset: string;
  vram: number;
  memoryType: string;
  coreClock: number;
  boostClock: number;
  tdp: number;
  length: number;
  width: number;
  height: number;
  requiredPower: number;
  powerConnectors: string[];
  outputs: {
    displayPort?: number;
    hdmi?: number;
    dvi?: number;
    vga?: number;
  };
}

// ストレージ
export interface Storage extends BasePart {
  type: 'HDD' | 'SSD' | 'M.2 NVME' | 'M.2 SATA';
  capacity: number;
  formFactor: string;
  interface: string;
  cacheSize?: number;
  readSpeed?: number;
  writeSpeed?: number;
  tbw?: number;
}

// 電源ユニット
export interface PSU extends BasePart {
  wattage: number;
  formFactor: string;
  efficiency: string;
  modular: 'Full' | 'Semi' | 'No';
  fanSize: number;
  length: number;
}

// PCケース
export interface Case extends BasePart {
  formFactor: string[];
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  weight: number;
  maxGpuLength: number;
  maxCpuCoolerHeight: number;
  maxPsuLength: number;
  radiatorSupport: {
    top?: string[];
    front?: string[];
    rear?: string[];
    bottom?: string[];
  };
  includedFans: number;
  externalDriveBays: number;
  internalDriveBays: {
    '3.5'?: number;
    '2.5'?: number;
  };
  color: string;
}

// CPUクーラー
export interface CPUCooler extends BasePart {
  type: 'Air' | 'AIO Liquid';
  socketCompatibility: string[];
  height?: number;
  radiatorSize?: string;
  fanSize: number;
  fanCount: number;
  noise: number;
  tdp: number;
  rgb?: boolean;
}

// ファン
export interface Fan extends BasePart {
  size: number;
  rpm: {
    min: number;
    max: number;
  };
  airflow: number;
  noise: {
    min: number;
    max: number;
  };
  pwm: boolean;
  rgb?: boolean;
  color?: string;
}

// 価格情報の型定義
export interface CurrentPrice {
  id: string;
  partId: string;
  shopId: string;
  amount: number;
  url: string;
  inStock: boolean;
  shippingCost?: number;
  lastChecked: Date;
}

// ショップの型定義
export interface Shop {
  id: string;
  name: string;
  url: string;
  logo?: string;
  isActive: boolean;
  priority: number;
}
