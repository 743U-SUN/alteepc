// src/data/dummyData.ts
export interface CPU {
  id: string;
  name: string;
  brand: string;
  socket: string;
  cores: number;
  threads: number;
  baseClock: number;
  boostClock: number;
  tdp: number;
  supportedMemoryType: string[];
  price: number;
  imageUrl: string;
}

export interface Motherboard {
  id: string;
  name: string;
  brand: string;
  socket: string;
  chipset: string;
  formFactor: string;
  memorySlots: number;
  maxMemory: number;
  supportedMemoryType: string[];
  pciSlots: {
    pcie_x16: number;
    pcie_x8: number;
    pcie_x4: number;
    pcie_x1: number;
  };
  sataConnectors: number;
  m2Slots: number;
  price: number;
  imageUrl: string;
}

export interface RAM {
  id: string;
  name: string;
  brand: string;
  type: string;
  capacity: number;
  speed: number;
  modules: number;
  price: number;
  imageUrl: string;
}

export interface GPU {
  id: string;
  name: string;
  brand: string;
  chipset: string;
  vram: number;
  coreClock: number;
  boostClock: number;
  length: number;
  tdp: number;
  price: number;
  imageUrl: string;
}

export interface Case {
  id: string;
  name: string;
  brand: string;
  type: string;
  supportedMotherboards: string[];
  maxGPULength: number;
  maxCoolerHeight: number;
  maxPSULength: number;
  supportedRadiatorSizes: string[];
  price: number;
  imageUrl: string;
}

export interface PowerSupply {
  id: string;
  name: string;
  brand: string;
  wattage: number;
  efficiency: string;
  modular: string;
  length: number;
  price: number;
  imageUrl: string;
}

export interface Cooling {
  id: string;
  name: string;
  brand: string;
  type: string;
  radiatorSize?: string;
  height?: number;
  tdp: number;
  price: number;
  imageUrl: string;
}

export interface Storage {
  id: string;
  name: string;
  brand: string;
  type: string;
  capacity: number;
  readSpeed: number;
  writeSpeed: number;
  interface: string;
  price: number;
  imageUrl: string;
}

// CPUデータ
export const cpus: CPU[] = [
  {
    id: 'cpu1',
    name: 'Core i9-14900K',
    brand: 'Intel',
    socket: 'LGA1700',
    cores: 24,
    threads: 32,
    baseClock: 3.2,
    boostClock: 6.0,
    tdp: 125,
    supportedMemoryType: ['DDR4', 'DDR5'],
    price: 59800,
    imageUrl: '/images/cpu/i9-14900k.jpg',
  },
  {
    id: 'cpu2',
    name: 'Core i7-14700K',
    brand: 'Intel',
    socket: 'LGA1700',
    cores: 20,
    threads: 28,
    baseClock: 3.4,
    boostClock: 5.6,
    tdp: 125,
    supportedMemoryType: ['DDR4', 'DDR5'],
    price: 46800,
    imageUrl: '/images/cpu/i7-14700k.jpg',
  },
  {
    id: 'cpu3',
    name: 'Core i5-14600K',
    brand: 'Intel',
    socket: 'LGA1700',
    cores: 14,
    threads: 20,
    baseClock: 3.5,
    boostClock: 5.3,
    tdp: 125,
    supportedMemoryType: ['DDR4', 'DDR5'],
    price: 36800,
    imageUrl: '/images/cpu/i5-14600k.jpg',
  },
  {
    id: 'cpu4',
    name: 'Ryzen 9 7950X',
    brand: 'AMD',
    socket: 'AM5',
    cores: 16,
    threads: 32,
    baseClock: 4.5,
    boostClock: 5.7,
    tdp: 170,
    supportedMemoryType: ['DDR5'],
    price: 62800,
    imageUrl: '/images/cpu/ryzen9-7950x.jpg',
  },
  {
    id: 'cpu5',
    name: 'Ryzen 7 7700X',
    brand: 'AMD',
    socket: 'AM5',
    cores: 8,
    threads: 16,
    baseClock: 4.5,
    boostClock: 5.4,
    tdp: 105,
    supportedMemoryType: ['DDR5'],
    price: 42800,
    imageUrl: '/images/cpu/ryzen7-7700x.jpg',
  },
  {
    id: 'cpu6',
    name: 'Ryzen 5 7600X',
    brand: 'AMD',
    socket: 'AM5',
    cores: 6,
    threads: 12,
    baseClock: 4.7,
    boostClock: 5.3,
    tdp: 105,
    supportedMemoryType: ['DDR5'],
    price: 32800,
    imageUrl: '/images/cpu/ryzen5-7600x.jpg',
  },
];

// マザーボードデータ
export const motherboards: Motherboard[] = [
  {
    id: 'mb1',
    name: 'ROG STRIX Z790-E GAMING WIFI',
    brand: 'ASUS',
    socket: 'LGA1700',
    chipset: 'Z790',
    formFactor: 'ATX',
    memorySlots: 4,
    maxMemory: 128,
    supportedMemoryType: ['DDR5'],
    pciSlots: {
      pcie_x16: 2,
      pcie_x8: 1,
      pcie_x4: 0,
      pcie_x1: 2,
    },
    sataConnectors: 4,
    m2Slots: 5,
    price: 49800,
    imageUrl: '/images/motherboard/rog-strix-z790-e.jpg',
  },
  {
    id: 'mb2',
    name: 'MAG B760 TOMAHAWK WIFI',
    brand: 'MSI',
    socket: 'LGA1700',
    chipset: 'B760',
    formFactor: 'ATX',
    memorySlots: 4,
    maxMemory: 128,
    supportedMemoryType: ['DDR4'],
    pciSlots: {
      pcie_x16: 1,
      pcie_x8: 0,
      pcie_x4: 1,
      pcie_x1: 2,
    },
    sataConnectors: 6,
    m2Slots: 3,
    price: 24800,
    imageUrl: '/images/motherboard/mag-b760-tomahawk.jpg',
  },
  {
    id: 'mb3',
    name: 'ROG STRIX X670E-E GAMING WIFI',
    brand: 'ASUS',
    socket: 'AM5',
    chipset: 'X670E',
    formFactor: 'ATX',
    memorySlots: 4,
    maxMemory: 128,
    supportedMemoryType: ['DDR5'],
    pciSlots: {
      pcie_x16: 2,
      pcie_x8: 1,
      pcie_x4: 0,
      pcie_x1: 1,
    },
    sataConnectors: 4,
    m2Slots: 5,
    price: 52800,
    imageUrl: '/images/motherboard/rog-strix-x670e-e.jpg',
  },
  {
    id: 'mb4',
    name: 'B650 AORUS ELITE AX',
    brand: 'Gigabyte',
    socket: 'AM5',
    chipset: 'B650',
    formFactor: 'ATX',
    memorySlots: 4,
    maxMemory: 128,
    supportedMemoryType: ['DDR5'],
    pciSlots: {
      pcie_x16: 1,
      pcie_x8: 0,
      pcie_x4: 1,
      pcie_x1: 1,
    },
    sataConnectors: 4,
    m2Slots: 3,
    price: 27800,
    imageUrl: '/images/motherboard/b650-aorus-elite.jpg',
  },
];

// メモリデータ
export const rams: RAM[] = [
  {
    id: 'ram1',
    name: 'Trident Z5 RGB',
    brand: 'G.Skill',
    type: 'DDR5',
    capacity: 32,
    speed: 6000,
    modules: 2,
    price: 19800,
    imageUrl: '/images/ram/trident-z5-rgb.jpg',
  },
  {
    id: 'ram2',
    name: 'Vengeance RGB Pro',
    brand: 'Corsair',
    type: 'DDR4',
    capacity: 32,
    speed: 3600,
    modules: 2,
    price: 14800,
    imageUrl: '/images/ram/vengeance-rgb-pro.jpg',
  },
  {
    id: 'ram3',
    name: 'Fury Beast RGB',
    brand: 'Kingston',
    type: 'DDR5',
    capacity: 32,
    speed: 5600,
    modules: 2,
    price: 16800,
    imageUrl: '/images/ram/fury-beast-rgb.jpg',
  },
  {
    id: 'ram4',
    name: 'Ballistix RGB',
    brand: 'Crucial',
    type: 'DDR4',
    capacity: 32,
    speed: 3200,
    modules: 2,
    price: 12800,
    imageUrl: '/images/ram/ballistix-rgb.jpg',
  },
];

// GPUデータ
export const gpus: GPU[] = [
  {
    id: 'gpu1',
    name: 'GeForce RTX 4090',
    brand: 'NVIDIA',
    chipset: 'RTX 4090',
    vram: 24,
    coreClock: 2235,
    boostClock: 2520,
    length: 336,
    tdp: 450,
    price: 248000,
    imageUrl: '/images/gpu/rtx-4090.jpg',
  },
  {
    id: 'gpu2',
    name: 'GeForce RTX 4080 Super',
    brand: 'NVIDIA',
    chipset: 'RTX 4080 Super',
    vram: 16,
    coreClock: 2205,
    boostClock: 2550,
    length: 304,
    tdp: 320,
    price: 148000,
    imageUrl: '/images/gpu/rtx-4080-super.jpg',
  },
  {
    id: 'gpu3',
    name: 'Radeon RX 7900 XTX',
    brand: 'AMD',
    chipset: 'RX 7900 XTX',
    vram: 24,
    coreClock: 1855,
    boostClock: 2499,
    length: 287,
    tdp: 355,
    price: 168000,
    imageUrl: '/images/gpu/rx-7900-xtx.jpg',
  },
  {
    id: 'gpu4',
    name: 'GeForce RTX 4070 Ti Super',
    brand: 'NVIDIA',
    chipset: 'RTX 4070 Ti Super',
    vram: 16,
    coreClock: 2340,
    boostClock: 2610,
    length: 285,
    tdp: 285,
    price: 108000,
    imageUrl: '/images/gpu/rtx-4070-ti-super.jpg',
  },
];

// ケースデータ
export const cases: Case[] = [
  {
    id: 'case1',
    name: '5000D AIRFLOW',
    brand: 'Corsair',
    type: 'Mid Tower',
    supportedMotherboards: ['ATX', 'Micro ATX', 'Mini ITX'],
    maxGPULength: 420,
    maxCoolerHeight: 170,
    maxPSULength: 225,
    supportedRadiatorSizes: ['120mm', '240mm', '280mm', '360mm'],
    price: 18800,
    imageUrl: '/images/case/5000d-airflow.jpg',
  },
  {
    id: 'case2',
    name: 'H7 Flow',
    brand: 'NZXT',
    type: 'Mid Tower',
    supportedMotherboards: ['E-ATX', 'ATX', 'Micro ATX', 'Mini ITX'],
    maxGPULength: 400,
    maxCoolerHeight: 185,
    maxPSULength: 200,
    supportedRadiatorSizes: ['120mm', '240mm', '280mm', '360mm'],
    price: 17800,
    imageUrl: '/images/case/h7-flow.jpg',
  },
  {
    id: 'case3',
    name: 'Lancool III',
    brand: 'Lian Li',
    type: 'Mid Tower',
    supportedMotherboards: ['E-ATX', 'ATX', 'Micro ATX', 'Mini ITX'],
    maxGPULength: 390,
    maxCoolerHeight: 176,
    maxPSULength: 210,
    supportedRadiatorSizes: ['120mm', '240mm', '280mm', '360mm', '420mm'],
    price: 16800,
    imageUrl: '/images/case/lancool-iii.jpg',
  },
  {
    id: 'case4',
    name: 'Meshify 2 Compact',
    brand: 'Fractal Design',
    type: 'Mid Tower',
    supportedMotherboards: ['ATX', 'Micro ATX', 'Mini ITX'],
    maxGPULength: 360,
    maxCoolerHeight: 169,
    maxPSULength: 190,
    supportedRadiatorSizes: ['120mm', '240mm', '280mm', '360mm'],
    price: 14800,
    imageUrl: '/images/case/meshify-2-compact.jpg',
  },
];

// 電源データ
export const powerSupplies: PowerSupply[] = [
  {
    id: 'psu1',
    name: 'RM1000x',
    brand: 'Corsair',
    wattage: 1000,
    efficiency: '80+ Gold',
    modular: 'Full',
    length: 160,
    price: 24800,
    imageUrl: '/images/psu/rm1000x.jpg',
  },
  {
    id: 'psu2',
    name: 'SuperNOVA 850 G+',
    brand: 'EVGA',
    wattage: 850,
    efficiency: '80+ Gold',
    modular: 'Full',
    length: 150,
    price: 19800,
    imageUrl: '/images/psu/supernova-850-g+.jpg',
  },
  {
    id: 'psu3',
    name: 'Focus GX-750',
    brand: 'Seasonic',
    wattage: 750,
    efficiency: '80+ Gold',
    modular: 'Full',
    length: 140,
    price: 16800,
    imageUrl: '/images/psu/focus-gx-750.jpg',
  },
  {
    id: 'psu4',
    name: 'ROG Thor 1200P',
    brand: 'ASUS',
    wattage: 1200,
    efficiency: '80+ Platinum',
    modular: 'Full',
    length: 170,
    price: 38800,
    imageUrl: '/images/psu/rog-thor-1200p.jpg',
  },
];

// CPUクーラーデータ
export const coolings: Cooling[] = [
  {
    id: 'cool1',
    name: 'NH-D15',
    brand: 'Noctua',
    type: 'Air',
    height: 165,
    tdp: 220,
    price: 14800,
    imageUrl: '/images/cooling/nh-d15.jpg',
  },
  {
    id: 'cool2',
    name: 'Dark Rock Pro 4',
    brand: 'be quiet!',
    type: 'Air',
    height: 162,
    tdp: 250,
    price: 12800,
    imageUrl: '/images/cooling/dark-rock-pro-4.jpg',
  },
  {
    id: 'cool3',
    name: 'Kraken X73',
    brand: 'NZXT',
    type: 'Liquid',
    radiatorSize: '360mm',
    tdp: 300,
    price: 22800,
    imageUrl: '/images/cooling/kraken-x73.jpg',
  },
  {
    id: 'cool4',
    name: 'iCUE H150i ELITE CAPELLIX',
    brand: 'Corsair',
    type: 'Liquid',
    radiatorSize: '360mm',
    tdp: 300,
    price: 23800,
    imageUrl: '/images/cooling/h150i-elite-capellix.jpg',
  },
];

// ストレージデータ
export const storages: Storage[] = [
  {
    id: 'storage1',
    name: '980 PRO',
    brand: 'Samsung',
    type: 'SSD',
    capacity: 2000,
    readSpeed: 7000,
    writeSpeed: 5100,
    interface: 'M.2 PCIe 4.0 x4',
    price: 28800,
    imageUrl: '/images/storage/980-pro.jpg',
  },
  {
    id: 'storage2',
    name: 'SN850X',
    brand: 'Western Digital',
    type: 'SSD',
    capacity: 1000,
    readSpeed: 7300,
    writeSpeed: 6300,
    interface: 'M.2 PCIe 4.0 x4',
    price: 15800,
    imageUrl: '/images/storage/sn850x.jpg',
  },
  {
    id: 'storage3',
    name: 'FireCuda 530',
    brand: 'Seagate',
    type: 'SSD',
    capacity: 2000,
    readSpeed: 7300,
    writeSpeed: 6900,
    interface: 'M.2 PCIe 4.0 x4',
    price: 29800,
    imageUrl: '/images/storage/firecuda-530.jpg',
  },
  {
    id: 'storage4',
    name: 'BarraCuda',
    brand: 'Seagate',
    type: 'HDD',
    capacity: 4000,
    readSpeed: 190,
    writeSpeed: 190,
    interface: 'SATA 6Gb/s',
    price: 9800,
    imageUrl: '/images/storage/barracuda.jpg',
  },
];

// すべてのパーツを含むオブジェクト
export const allParts = {
  cpus,
  motherboards,
  rams,
  gpus,
  cases,
  powerSupplies,
  coolings,
  storages,
};
