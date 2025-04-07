import { createId } from '@paralleldrive/cuid2';

// CPUクーラーのインターフェース定義
export interface CPUCooler {
  id: string;
  manufacturer: string;
  model: string;
  type: string;
  height: number | null;
  radiatorSize: string | null;
  fanSize: number;
  fanCount: number;
  tdp: number;
  socket: string[];
  noise: number;
  rpm: {
    min: number;
    max: number;
  };
  rgb: boolean;
  price: number;
  url: string;
  imageUrl: string;
  recommendationScore: number;
  createdAt: Date;
  updatedAt: Date;
}

// CPUクーラーダミーデータ
export const coolers: CPUCooler[] = [
  {
    id: createId(),
    manufacturer: 'Noctua',
    model: 'NH-D15',
    type: 'Air',
    height: 165,
    radiatorSize: null,
    fanSize: 140,
    fanCount: 2,
    tdp: 220,
    socket: ['LGA1700', 'LGA1200', 'LGA1151', 'AM5', 'AM4'],
    noise: 24.6,
    rpm: {
      min: 300,
      max: 1500
    },
    rgb: false,
    price: 19800,
    url: 'https://example.com/products/noctua-nh-d15',
    imageUrl: '/images/parts/cooler/noctua_nh_d15.jpg',
    recommendationScore: 95,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'be quiet!',
    model: 'Dark Rock Pro 4',
    type: 'Air',
    height: 162,
    radiatorSize: null,
    fanSize: 135,
    fanCount: 2,
    tdp: 250,
    socket: ['LGA1700', 'LGA1200', 'LGA1151', 'AM5', 'AM4'],
    noise: 24.3,
    rpm: {
      min: 400,
      max: 1500
    },
    rgb: false,
    price: 12800,
    url: 'https://example.com/products/be-quiet-dark-rock-pro-4',
    imageUrl: '/images/parts/cooler/be_quiet_dark_rock_pro_4.jpg',
    recommendationScore: 92,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Corsair',
    model: 'iCUE H150i ELITE CAPELLIX',
    type: 'AIO',
    height: null,
    radiatorSize: '360mm',
    fanSize: 120,
    fanCount: 3,
    tdp: 300,
    socket: ['LGA1700', 'LGA1200', 'LGA1151', 'AM5', 'AM4'],
    noise: 28.0,
    rpm: {
      min: 400,
      max: 2400
    },
    rgb: true,
    price: 24800,
    url: 'https://example.com/products/corsair-icue-h150i-elite-capellix',
    imageUrl: '/images/parts/cooler/corsair_icue_h150i_elite_capellix.jpg',
    recommendationScore: 89,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'NZXT',
    model: 'Kraken X63',
    type: 'AIO',
    height: null,
    radiatorSize: '280mm',
    fanSize: 140,
    fanCount: 2,
    tdp: 280,
    socket: ['LGA1700', 'LGA1200', 'LGA1151', 'AM5', 'AM4'],
    noise: 21.0,
    rpm: {
      min: 500,
      max: 1800
    },
    rgb: true,
    price: 19800,
    url: 'https://example.com/products/nzxt-kraken-x63',
    imageUrl: '/images/parts/cooler/nzxt_kraken_x63.jpg',
    recommendationScore: 88,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Arctic',
    model: 'Liquid Freezer II 240',
    type: 'AIO',
    height: null,
    radiatorSize: '240mm',
    fanSize: 120,
    fanCount: 2,
    tdp: 250,
    socket: ['LGA1700', 'LGA1200', 'LGA1151', 'AM5', 'AM4'],
    noise: 22.5,
    rpm: {
      min: 200,
      max: 1800
    },
    rgb: false,
    price: 13800,
    url: 'https://example.com/products/arctic-liquid-freezer-ii-240',
    imageUrl: '/images/parts/cooler/arctic_liquid_freezer_ii_240.jpg',
    recommendationScore: 94,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Scythe',
    model: 'Fuma 2',
    type: 'Air',
    height: 154,
    radiatorSize: null,
    fanSize: 120,
    fanCount: 2,
    tdp: 200,
    socket: ['LGA1700', 'LGA1200', 'LGA1151', 'AM5', 'AM4'],
    noise: 24.9,
    rpm: {
      min: 300,
      max: 1200
    },
    rgb: false,
    price: 9800,
    url: 'https://example.com/products/scythe-fuma-2',
    imageUrl: '/images/parts/cooler/scythe_fuma_2.jpg',
    recommendationScore: 93,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Cooler Master',
    model: 'Hyper 212 RGB Black Edition',
    type: 'Air',
    height: 159,
    radiatorSize: null,
    fanSize: 120,
    fanCount: 1,
    tdp: 150,
    socket: ['LGA1700', 'LGA1200', 'LGA1151', 'AM5', 'AM4'],
    noise: 27.0,
    rpm: {
      min: 650,
      max: 2000
    },
    rgb: true,
    price: 5480,
    url: 'https://example.com/products/cooler-master-hyper-212-rgb-black-edition',
    imageUrl: '/images/parts/cooler/cooler_master_hyper_212_rgb_black_edition.jpg',
    recommendationScore: 87,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'EKWB',
    model: 'EK-AIO 280 D-RGB',
    type: 'AIO',
    height: null,
    radiatorSize: '280mm',
    fanSize: 140,
    fanCount: 2,
    tdp: 300,
    socket: ['LGA1700', 'LGA1200', 'LGA1151', 'AM5', 'AM4'],
    noise: 33.5,
    rpm: {
      min: 550,
      max: 2000
    },
    rgb: true,
    price: 18800,
    url: 'https://example.com/products/ekwb-ek-aio-280-d-rgb',
    imageUrl: '/images/parts/cooler/ekwb_ek_aio_280_d_rgb.jpg',
    recommendationScore: 86,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Thermalright',
    model: 'Assassin X 120 R SE',
    type: 'Air',
    height: 157,
    radiatorSize: null,
    fanSize: 120,
    fanCount: 1,
    tdp: 180,
    socket: ['LGA1700', 'LGA1200', 'LGA1151', 'AM5', 'AM4'],
    noise: 25.6,
    rpm: {
      min: 500,
      max: 1550
    },
    rgb: false,
    price: 3980,
    url: 'https://example.com/products/thermalright-assassin-x-120-r-se',
    imageUrl: '/images/parts/cooler/thermalright_assassin_x_120_r_se.jpg',
    recommendationScore: 90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Deepcool',
    model: 'AK620',
    type: 'Air',
    height: 160,
    radiatorSize: null,
    fanSize: 120,
    fanCount: 2,
    tdp: 260,
    socket: ['LGA1700', 'LGA1200', 'LGA1151', 'AM5', 'AM4'],
    noise: 28.0,
    rpm: {
      min: 500,
      max: 1850
    },
    rgb: false,
    price: 8480,
    url: 'https://example.com/products/deepcool-ak620',
    imageUrl: '/images/parts/cooler/deepcool_ak620.jpg',
    recommendationScore: 91,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];
