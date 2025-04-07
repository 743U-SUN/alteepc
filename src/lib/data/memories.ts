import { createId } from '@paralleldrive/cuid2';

// メモリのインターフェース定義
export interface Memory {
  id: string;
  manufacturer: string;
  model: string;
  type: string;
  capacity: number;
  speed: number;
  modules: number;
  casLatency: number;
  voltage: number;
  heatspreader: boolean;
  rgb: boolean;
  price: number;
  url: string;
  imageUrl: string;
  recommendationScore: number;
  createdAt: Date;
  updatedAt: Date;
}

// メモリダミーデータ
export const memories: Memory[] = [
  {
    id: createId(),
    manufacturer: 'Corsair',
    model: 'Vengeance LPX',
    type: 'DDR4',
    capacity: 16,
    speed: 3200,
    modules: 2,
    casLatency: 16,
    voltage: 1.35,
    heatspreader: true,
    rgb: false,
    price: 8980,
    url: 'https://example.com/products/corsair-vengeance-lpx-16gb-3200',
    imageUrl: '/images/parts/memory/corsair_vengeance_lpx_16gb_3200.jpg',
    recommendationScore: 92,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'G.Skill',
    model: 'Ripjaws V',
    type: 'DDR4',
    capacity: 32,
    speed: 3600,
    modules: 2,
    casLatency: 18,
    voltage: 1.35,
    heatspreader: true,
    rgb: false,
    price: 15980,
    url: 'https://example.com/products/gskill-ripjaws-v-32gb-3600',
    imageUrl: '/images/parts/memory/gskill_ripjaws_v_32gb_3600.jpg',
    recommendationScore: 94,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Corsair',
    model: 'Vengeance RGB Pro',
    type: 'DDR4',
    capacity: 32,
    speed: 3600,
    modules: 2,
    casLatency: 18,
    voltage: 1.35,
    heatspreader: true,
    rgb: true,
    price: 17800,
    url: 'https://example.com/products/corsair-vengeance-rgb-pro-32gb-3600',
    imageUrl: '/images/parts/memory/corsair_vengeance_rgb_pro_32gb_3600.jpg',
    recommendationScore: 86,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Kingston',
    model: 'FURY Beast',
    type: 'DDR4',
    capacity: 16,
    speed: 3600,
    modules: 2,
    casLatency: 17,
    voltage: 1.35,
    heatspreader: true,
    rgb: false,
    price: 9980,
    url: 'https://example.com/products/kingston-fury-beast-16gb-3600',
    imageUrl: '/images/parts/memory/kingston_fury_beast_16gb_3600.jpg',
    recommendationScore: 89,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Crucial',
    model: 'Ballistix RGB',
    type: 'DDR4',
    capacity: 32,
    speed: 3200,
    modules: 2,
    casLatency: 16,
    voltage: 1.35,
    heatspreader: true,
    rgb: true,
    price: 16500,
    url: 'https://example.com/products/crucial-ballistix-rgb-32gb-3200',
    imageUrl: '/images/parts/memory/crucial_ballistix_rgb_32gb_3200.jpg',
    recommendationScore: 85,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'G.Skill',
    model: 'Trident Z5 RGB',
    type: 'DDR5',
    capacity: 32,
    speed: 6000,
    modules: 2,
    casLatency: 36,
    voltage: 1.30,
    heatspreader: true,
    rgb: true,
    price: 32800,
    url: 'https://example.com/products/gskill-trident-z5-rgb-32gb-6000',
    imageUrl: '/images/parts/memory/gskill_trident_z5_rgb_32gb_6000.jpg',
    recommendationScore: 87,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Corsair',
    model: 'Vengeance DDR5',
    type: 'DDR5',
    capacity: 32,
    speed: 5600,
    modules: 2,
    casLatency: 36,
    voltage: 1.25,
    heatspreader: true,
    rgb: false,
    price: 25800,
    url: 'https://example.com/products/corsair-vengeance-ddr5-32gb-5600',
    imageUrl: '/images/parts/memory/corsair_vengeance_ddr5_32gb_5600.jpg',
    recommendationScore: 88,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Kingston',
    model: 'FURY Beast DDR5 RGB',
    type: 'DDR5',
    capacity: 32,
    speed: 5200,
    modules: 2,
    casLatency: 40,
    voltage: 1.25,
    heatspreader: true,
    rgb: true,
    price: 26500,
    url: 'https://example.com/products/kingston-fury-beast-ddr5-rgb-32gb-5200',
    imageUrl: '/images/parts/memory/kingston_fury_beast_ddr5_rgb_32gb_5200.jpg',
    recommendationScore: 85,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Crucial',
    model: 'DDR5 Desktop Memory',
    type: 'DDR5',
    capacity: 16,
    speed: 4800,
    modules: 2,
    casLatency: 40,
    voltage: 1.1,
    heatspreader: false,
    rgb: false,
    price: 17800,
    url: 'https://example.com/products/crucial-ddr5-desktop-memory-16gb-4800',
    imageUrl: '/images/parts/memory/crucial_ddr5_desktop_memory_16gb_4800.jpg',
    recommendationScore: 82,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'TeamGroup',
    model: 'T-Force Vulcan Z',
    type: 'DDR4',
    capacity: 16,
    speed: 3200,
    modules: 2,
    casLatency: 16,
    voltage: 1.35,
    heatspreader: true,
    rgb: false,
    price: 7980,
    url: 'https://example.com/products/teamgroup-tforce-vulcan-z-16gb-3200',
    imageUrl: '/images/parts/memory/teamgroup_tforce_vulcan_z_16gb_3200.jpg',
    recommendationScore: 90,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];
