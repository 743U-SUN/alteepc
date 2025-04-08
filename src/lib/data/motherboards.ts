import { createId } from '@paralleldrive/cuid2';

// マザーボードのインターフェース定義
export interface Motherboard {
  id: string;
  manufacturer: string;
  model: string;
  socket: string;
  chipset: string;
  formFactor: string;
  memoryType: string[];
  memorySlots: number;
  maxMemorySpeed: number;
  maxMemory: number;
  pciSlots: {
    pcie5: number;
    pcie4: number;
    pcie3: number;
  };
  sataConnectors: number;
  m2Slots: number;
  price: number;
  releaseDate: string;
  url: string;
  imageUrl: string;
  recommendationScore: number;
  createdAt: Date;
  updatedAt: Date;
}

// マザーボードダミーデータ
export const motherboards: Motherboard[] = [
  {
    id: 'clq1g5gxi000208jt5r6rhzzz',  // データベースと一致させた固定ID
    manufacturer: 'ASUS',
    model: 'ROG STRIX Z790-E GAMING WIFI II',
    socket: 'LGA1700',
    chipset: 'Z790',
    formFactor: 'ATX',
    memoryType: ['DDR5'],
    memorySlots: 4,
    maxMemorySpeed: 7800,
    maxMemory: 192,
    pciSlots: {
      pcie5: 1,
      pcie4: 3,
      pcie3: 2
    },
    sataConnectors: 4,
    m2Slots: 5,
    price: 56800,
    releaseDate: '2023-10-17',
    url: 'https://example.com/products/asus-rog-strix-z790-e-gaming-wifi-2',
    imageUrl: '/images/parts/motherboard/asus_rog_strix_z790_e_gaming_wifi_2.jpg',
    recommendationScore: 88,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'MSI',
    model: 'MAG B760M MORTAR WIFI DDR4',
    socket: 'LGA1700',
    chipset: 'B760',
    formFactor: 'Micro-ATX',
    memoryType: ['DDR4'],
    memorySlots: 4,
    maxMemorySpeed: 5333,
    maxMemory: 128,
    pciSlots: {
      pcie5: 0,
      pcie4: 2,
      pcie3: 1
    },
    sataConnectors: 4,
    m2Slots: 3,
    price: 22800,
    releaseDate: '2023-01-10',
    url: 'https://example.com/products/msi-mag-b760m-mortar-wifi-ddr4',
    imageUrl: '/images/parts/motherboard/msi_mag_b760m_mortar_wifi_ddr4.jpg',
    recommendationScore: 90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Gigabyte',
    model: 'B760 AORUS ELITE DDR5',
    socket: 'LGA1700',
    chipset: 'B760',
    formFactor: 'ATX',
    memoryType: ['DDR5'],
    memorySlots: 4,
    maxMemorySpeed: 7600,
    maxMemory: 192,
    pciSlots: {
      pcie5: 1,
      pcie4: 1,
      pcie3: 2
    },
    sataConnectors: 4,
    m2Slots: 4,
    price: 29800,
    releaseDate: '2023-01-03',
    url: 'https://example.com/products/gigabyte-b760-aorus-elite-ddr5',
    imageUrl: '/images/parts/motherboard/gigabyte_b760_aorus_elite_ddr5.jpg',
    recommendationScore: 86,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'ASRock',
    model: 'H770 PG Lightning/D4',
    socket: 'LGA1700',
    chipset: 'H770',
    formFactor: 'ATX',
    memoryType: ['DDR4'],
    memorySlots: 4,
    maxMemorySpeed: 5333,
    maxMemory: 128,
    pciSlots: {
      pcie5: 1,
      pcie4: 1,
      pcie3: 2
    },
    sataConnectors: 6,
    m2Slots: 3,
    price: 26800,
    releaseDate: '2023-01-03',
    url: 'https://example.com/products/asrock-h770-pg-lightning-d4',
    imageUrl: '/images/parts/motherboard/asrock_h770_pg_lightning_d4.jpg',
    recommendationScore: 84,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'clq1g5gxi000308jt7r8rhaaa',  // データベースと一致させた固定ID
    manufacturer: 'MSI',
    model: 'MPG X670E CARBON WIFI',
    socket: 'AM5',
    chipset: 'X670E',
    formFactor: 'ATX',
    memoryType: ['DDR5'],
    memorySlots: 4,
    maxMemorySpeed: 6600,
    maxMemory: 128,
    pciSlots: {
      pcie5: 1,
      pcie4: 2,
      pcie3: 0
    },
    sataConnectors: 6,
    m2Slots: 4,
    price: 54980,
    releaseDate: '2022-08-30',
    url: 'https://example.com/products/msi-mpg-x670e-carbon-wifi',
    imageUrl: '/images/parts/motherboard/msi_mpg_x670e_carbon_wifi.jpg',
    recommendationScore: 85,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'MSI',
    model: 'MPG B650 EDGE WIFI',
    socket: 'AM5',
    chipset: 'B650',
    formFactor: 'ATX',
    memoryType: ['DDR5'],
    memorySlots: 4,
    maxMemorySpeed: 6600,
    maxMemory: 192,
    pciSlots: {
      pcie5: 1,
      pcie4: 2,
      pcie3: 0
    },
    sataConnectors: 6,
    m2Slots: 4,
    price: 36800,
    releaseDate: '2022-10-10',
    url: 'https://example.com/products/msi-mpg-b650-edge-wifi',
    imageUrl: '/images/parts/motherboard/msi_mpg_b650_edge_wifi.jpg',
    recommendationScore: 89,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Gigabyte',
    model: 'B550 AORUS ELITE AX V2',
    socket: 'AM4',
    chipset: 'B550',
    formFactor: 'ATX',
    memoryType: ['DDR4'],
    memorySlots: 4,
    maxMemorySpeed: 4400,
    maxMemory: 128,
    pciSlots: {
      pcie5: 0,
      pcie4: 1,
      pcie3: 2
    },
    sataConnectors: 6,
    m2Slots: 2,
    price: 19800,
    releaseDate: '2020-06-16',
    url: 'https://example.com/products/gigabyte-b550-aorus-elite-ax-v2',
    imageUrl: '/images/parts/motherboard/gigabyte_b550_aorus_elite_ax_v2.jpg',
    recommendationScore: 92,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'ASRock',
    model: 'B550M Pro4',
    socket: 'AM4',
    chipset: 'B550',
    formFactor: 'Micro-ATX',
    memoryType: ['DDR4'],
    memorySlots: 4,
    maxMemorySpeed: 4733,
    maxMemory: 128,
    pciSlots: {
      pcie5: 0,
      pcie4: 1,
      pcie3: 1
    },
    sataConnectors: 4,
    m2Slots: 2,
    price: 12800,
    releaseDate: '2020-06-16',
    url: 'https://example.com/products/asrock-b550m-pro4',
    imageUrl: '/images/parts/motherboard/asrock_b550m_pro4.jpg',
    recommendationScore: 93,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'ASUS',
    model: 'ROG STRIX B550-I GAMING',
    socket: 'AM4',
    chipset: 'B550',
    formFactor: 'Mini-ITX',
    memoryType: ['DDR4'],
    memorySlots: 2,
    maxMemorySpeed: 5100,
    maxMemory: 64,
    pciSlots: {
      pcie5: 0,
      pcie4: 1,
      pcie3: 0
    },
    sataConnectors: 4,
    m2Slots: 2,
    price: 28800,
    releaseDate: '2020-06-16',
    url: 'https://example.com/products/asus-rog-strix-b550-i-gaming',
    imageUrl: '/images/parts/motherboard/asus_rog_strix_b550_i_gaming.jpg',
    recommendationScore: 85,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'MSI',
    model: 'PRO H610M-E DDR4',
    socket: 'LGA1700',
    chipset: 'H610',
    formFactor: 'Micro-ATX',
    memoryType: ['DDR4'],
    memorySlots: 2,
    maxMemorySpeed: 3200,
    maxMemory: 64,
    pciSlots: {
      pcie5: 0,
      pcie4: 1,
      pcie3: 1
    },
    sataConnectors: 4,
    m2Slots: 1,
    price: 8980,
    releaseDate: '2022-01-04',
    url: 'https://example.com/products/msi-pro-h610m-e-ddr4',
    imageUrl: '/images/parts/motherboard/msi_pro_h610m_e_ddr4.jpg',
    recommendationScore: 84,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];
