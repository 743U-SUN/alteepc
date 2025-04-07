import { createId } from '@paralleldrive/cuid2';

// PCケースのインターフェース定義
export interface Case {
  id: string;
  manufacturer: string;
  model: string;
  formFactor: string;
  supportedMotherboards: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  maxCoolerHeight: number;
  maxGpuLength: number;
  maxPsuLength: number;
  driveSlots: {
    internal25: number;
    internal35: number;
  };
  expansionSlots: number;
  frontPorts: string[];
  includedFans: {
    front: number;
    top: number;
    rear: number;
    side: number;
    bottom: number;
  };
  fanMountingOptions: {
    front: string[];
    top: string[];
    rear: string[];
    side: string[];
    bottom: string[];
  };
  radiatorSupport: {
    front: string[];
    top: string[];
    rear: string[];
    side: string[];
    bottom: string[];
  };
  colorOptions: string[];
  sideWindow: boolean;
  price: number;
  url: string;
  imageUrl: string;
  recommendationScore: number;
  createdAt: Date;
  updatedAt: Date;
}

// PCケースダミーデータ
export const cases: Case[] = [
  {
    id: createId(),
    manufacturer: 'Fractal Design',
    model: 'Meshify 2 Compact',
    formFactor: 'Mid Tower',
    supportedMotherboards: ['ATX', 'Micro-ATX', 'Mini-ITX'],
    dimensions: {
      width: 210,
      height: 475,
      depth: 424
    },
    maxCoolerHeight: 169,
    maxGpuLength: 360,
    maxPsuLength: 170,
    driveSlots: {
      internal25: 4,
      internal35: 2
    },
    expansionSlots: 7,
    frontPorts: ['USB 3.0 Type-A (2)', 'USB 3.1 Type-C', 'Audio In/Out'],
    includedFans: {
      front: 2,
      top: 0,
      rear: 1,
      side: 0,
      bottom: 0
    },
    fanMountingOptions: {
      front: ['120mm (3)', '140mm (2)'],
      top: ['120mm (3)', '140mm (2)'],
      rear: ['120mm (1)'],
      side: [],
      bottom: []
    },
    radiatorSupport: {
      front: ['120mm', '240mm', '280mm', '360mm'],
      top: ['120mm', '240mm', '280mm'],
      rear: ['120mm'],
      side: [],
      bottom: []
    },
    colorOptions: ['Black', 'White'],
    sideWindow: true,
    price: 14800,
    url: 'https://example.com/products/fractal-design-meshify-2-compact',
    imageUrl: '/images/parts/case/fractal_design_meshify_2_compact.jpg',
    recommendationScore: 94,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Corsair',
    model: '4000D Airflow',
    formFactor: 'Mid Tower',
    supportedMotherboards: ['ATX', 'Micro-ATX', 'Mini-ITX'],
    dimensions: {
      width: 230,
      height: 466,
      depth: 453
    },
    maxCoolerHeight: 170,
    maxGpuLength: 360,
    maxPsuLength: 180,
    driveSlots: {
      internal25: 2,
      internal35: 2
    },
    expansionSlots: 7,
    frontPorts: ['USB 3.0 Type-A (1)', 'USB 3.1 Type-C (1)', 'Audio In/Out'],
    includedFans: {
      front: 1,
      top: 0,
      rear: 1,
      side: 0,
      bottom: 0
    },
    fanMountingOptions: {
      front: ['120mm (3)', '140mm (2)'],
      top: ['120mm (2)', '140mm (2)'],
      rear: ['120mm (1)'],
      side: [],
      bottom: []
    },
    radiatorSupport: {
      front: ['120mm', '240mm', '280mm', '360mm'],
      top: ['120mm', '240mm'],
      rear: ['120mm'],
      side: [],
      bottom: []
    },
    colorOptions: ['Black', 'White'],
    sideWindow: true,
    price: 9980,
    url: 'https://example.com/products/corsair-4000d-airflow',
    imageUrl: '/images/parts/case/corsair_4000d_airflow.jpg',
    recommendationScore: 92,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Lian Li',
    model: 'O11 Dynamic',
    formFactor: 'Mid Tower',
    supportedMotherboards: ['ATX', 'Micro-ATX', 'Mini-ITX'],
    dimensions: {
      width: 272,
      height: 446,
      depth: 445
    },
    maxCoolerHeight: 155,
    maxGpuLength: 420,
    maxPsuLength: 180,
    driveSlots: {
      internal25: 6,
      internal35: 3
    },
    expansionSlots: 8,
    frontPorts: ['USB 3.0 Type-A (2)', 'USB 3.1 Type-C (1)', 'Audio In/Out'],
    includedFans: {
      front: 0,
      top: 0,
      rear: 0,
      side: 0,
      bottom: 0
    },
    fanMountingOptions: {
      front: [],
      top: ['120mm (3)'],
      rear: ['120mm (1)'],
      side: ['120mm (3)'],
      bottom: ['120mm (3)']
    },
    radiatorSupport: {
      front: [],
      top: ['120mm', '240mm', '360mm'],
      rear: ['120mm'],
      side: ['120mm', '240mm', '360mm'],
      bottom: ['120mm', '240mm', '360mm']
    },
    colorOptions: ['Black', 'White', 'Silver'],
    sideWindow: true,
    price: 16800,
    url: 'https://example.com/products/lian-li-o11-dynamic',
    imageUrl: '/images/parts/case/lian_li_o11_dynamic.jpg',
    recommendationScore: 90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'NZXT',
    model: 'H510',
    formFactor: 'Mid Tower',
    supportedMotherboards: ['ATX', 'Micro-ATX', 'Mini-ITX'],
    dimensions: {
      width: 210,
      height: 460,
      depth: 428
    },
    maxCoolerHeight: 165,
    maxGpuLength: 381,
    maxPsuLength: 180,
    driveSlots: {
      internal25: 2,
      internal35: 1
    },
    expansionSlots: 7,
    frontPorts: ['USB 3.0 Type-A (1)', 'USB 3.1 Type-C (1)', 'Audio In/Out'],
    includedFans: {
      front: 1,
      top: 0,
      rear: 1,
      side: 0,
      bottom: 0
    },
    fanMountingOptions: {
      front: ['120mm (2)', '140mm (2)'],
      top: ['140mm (1)'],
      rear: ['120mm (1)'],
      side: [],
      bottom: []
    },
    radiatorSupport: {
      front: ['120mm', '240mm', '280mm'],
      top: [],
      rear: ['120mm'],
      side: [],
      bottom: []
    },
    colorOptions: ['Black', 'White'],
    sideWindow: true,
    price: 8980,
    url: 'https://example.com/products/nzxt-h510',
    imageUrl: '/images/parts/case/nzxt_h510.jpg',
    recommendationScore: 88,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Cooler Master',
    model: 'MasterBox Q300L',
    formFactor: 'Micro Tower',
    supportedMotherboards: ['Micro-ATX', 'Mini-ITX'],
    dimensions: {
      width: 230,
      height: 387,
      depth: 378
    },
    maxCoolerHeight: 157,
    maxGpuLength: 360,
    maxPsuLength: 160,
    driveSlots: {
      internal25: 4,
      internal35: 1
    },
    expansionSlots: 4,
    frontPorts: ['USB 3.0 Type-A (2)', 'Audio In/Out'],
    includedFans: {
      front: 0,
      top: 0,
      rear: 1,
      side: 0,
      bottom: 0
    },
    fanMountingOptions: {
      front: ['120mm (2)'],
      top: ['120mm (2)'],
      rear: ['120mm (1)'],
      side: [],
      bottom: []
    },
    radiatorSupport: {
      front: ['120mm', '240mm'],
      top: ['120mm', '240mm'],
      rear: ['120mm'],
      side: [],
      bottom: []
    },
    colorOptions: ['Black'],
    sideWindow: true,
    price: 5980,
    url: 'https://example.com/products/cooler-master-masterbox-q300l',
    imageUrl: '/images/parts/case/cooler_master_masterbox_q300l.jpg',
    recommendationScore: 89,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'be quiet!',
    model: 'Pure Base 500DX',
    formFactor: 'Mid Tower',
    supportedMotherboards: ['ATX', 'Micro-ATX', 'Mini-ITX'],
    dimensions: {
      width: 231,
      height: 463,
      depth: 450
    },
    maxCoolerHeight: 190,
    maxGpuLength: 369,
    maxPsuLength: 190,
    driveSlots: {
      internal25: 5,
      internal35: 2
    },
    expansionSlots: 7,
    frontPorts: ['USB 3.0 Type-A (2)', 'USB 3.1 Type-C (1)', 'Audio In/Out'],
    includedFans: {
      front: 1,
      top: 0,
      rear: 1,
      side: 0,
      bottom: 0
    },
    fanMountingOptions: {
      front: ['120mm (3)', '140mm (2)'],
      top: ['120mm (2)', '140mm (2)'],
      rear: ['120mm (1)', '140mm (1)'],
      side: [],
      bottom: []
    },
    radiatorSupport: {
      front: ['120mm', '240mm', '360mm'],
      top: ['120mm', '240mm'],
      rear: ['120mm', '140mm'],
      side: [],
      bottom: []
    },
    colorOptions: ['Black', 'White'],
    sideWindow: true,
    price: 11800,
    url: 'https://example.com/products/be-quiet-pure-base-500dx',
    imageUrl: '/images/parts/case/be_quiet_pure_base_500dx.jpg',
    recommendationScore: 91,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Phanteks',
    model: 'Eclipse P300A',
    formFactor: 'Mid Tower',
    supportedMotherboards: ['ATX', 'Micro-ATX', 'Mini-ITX'],
    dimensions: {
      width: 200,
      height: 450,
      depth: 400
    },
    maxCoolerHeight: 165,
    maxGpuLength: 355,
    maxPsuLength: 180,
    driveSlots: {
      internal25: 2,
      internal35: 2
    },
    expansionSlots: 7,
    frontPorts: ['USB 3.0 Type-A (1)', 'Audio In/Out'],
    includedFans: {
      front: 0,
      top: 0,
      rear: 1,
      side: 0,
      bottom: 0
    },
    fanMountingOptions: {
      front: ['120mm (2)', '140mm (2)'],
      top: ['120mm (2)', '140mm (1)'],
      rear: ['120mm (1)'],
      side: [],
      bottom: []
    },
    radiatorSupport: {
      front: ['120mm', '240mm', '280mm'],
      top: ['120mm', '240mm'],
      rear: ['120mm'],
      side: [],
      bottom: []
    },
    colorOptions: ['Black'],
    sideWindow: true,
    price: 7980,
    url: 'https://example.com/products/phanteks-eclipse-p300a',
    imageUrl: '/images/parts/case/phanteks_eclipse_p300a.jpg',
    recommendationScore: 90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'NR200P',
    model: 'Cooler Master',
    formFactor: 'Mini-ITX',
    supportedMotherboards: ['Mini-ITX'],
    dimensions: {
      width: 185,
      height: 274,
      depth: 360
    },
    maxCoolerHeight: 155,
    maxGpuLength: 330,
    maxPsuLength: 130,
    driveSlots: {
      internal25: 2,
      internal35: 1
    },
    expansionSlots: 3,
    frontPorts: ['USB 3.0 Type-A (2)', 'Audio In/Out'],
    includedFans: {
      front: 0,
      top: 2,
      rear: 0,
      side: 0,
      bottom: 0
    },
    fanMountingOptions: {
      front: [],
      top: ['120mm (2)'],
      rear: ['92mm (1)'],
      side: ['120mm (2)', '140mm (2)'],
      bottom: ['120mm (2)']
    },
    radiatorSupport: {
      front: [],
      top: [],
      rear: [],
      side: ['120mm', '240mm'],
      bottom: ['120mm', '240mm']
    },
    colorOptions: ['Black', 'White'],
    sideWindow: true,
    price: 11800,
    url: 'https://example.com/products/cooler-master-nr200p',
    imageUrl: '/images/parts/case/cooler_master_nr200p.jpg',
    recommendationScore: 93,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Fractal Design',
    model: 'Torrent',
    formFactor: 'Mid Tower',
    supportedMotherboards: ['E-ATX', 'ATX', 'Micro-ATX', 'Mini-ITX'],
    dimensions: {
      width: 242,
      height: 530,
      depth: 538
    },
    maxCoolerHeight: 188,
    maxGpuLength: 461,
    maxPsuLength: 200,
    driveSlots: {
      internal25: 4,
      internal35: 2
    },
    expansionSlots: 7,
    frontPorts: ['USB 3.0 Type-A (2)', 'USB 3.1 Type-C (1)', 'Audio In/Out'],
    includedFans: {
      front: 2,
      top: 0,
      rear: 0,
      side: 0,
      bottom: 3
    },
    fanMountingOptions: {
      front: ['120mm (3)', '140mm (3)'],
      top: ['120mm (3)', '140mm (2)'],
      rear: ['120mm (1)', '140mm (1)'],
      side: [],
      bottom: ['120mm (3)', '140mm (2)']
    },
    radiatorSupport: {
      front: ['120mm', '240mm', '280mm', '360mm'],
      top: ['120mm', '240mm', '280mm', '360mm'],
      rear: ['120mm', '140mm'],
      side: [],
      bottom: ['120mm', '240mm', '280mm', '360mm']
    },
    colorOptions: ['Black', 'White'],
    sideWindow: true,
    price: 19800,
    url: 'https://example.com/products/fractal-design-torrent',
    imageUrl: '/images/parts/case/fractal_design_torrent.jpg',
    recommendationScore: 88,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'SSUPD',
    model: 'Meshilicous',
    formFactor: 'Mini-ITX',
    supportedMotherboards: ['Mini-ITX'],
    dimensions: {
      width: 166,
      height: 245,
      depth: 360
    },
    maxCoolerHeight: 72,
    maxGpuLength: 336,
    maxPsuLength: 160,
    driveSlots: {
      internal25: 3,
      internal35: 0
    },
    expansionSlots: 3,
    frontPorts: ['USB 3.0 Type-A (1)', 'USB 3.1 Type-C (1)', 'Audio In/Out'],
    includedFans: {
      front: 0,
      top: 0,
      rear: 0,
      side: 0,
      bottom: 0
    },
    fanMountingOptions: {
      front: [],
      top: [],
      rear: [],
      side: ['120mm (3)', '140mm (2)'],
      bottom: []
    },
    radiatorSupport: {
      front: [],
      top: [],
      rear: [],
      side: ['120mm', '240mm', '280mm'],
      bottom: []
    },
    colorOptions: ['Black', 'White'],
    sideWindow: true,
    price: 13800,
    url: 'https://example.com/products/ssupd-meshilicous',
    imageUrl: '/images/parts/case/ssupd_meshilicous.jpg',
    recommendationScore: 87,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];
