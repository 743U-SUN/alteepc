import { createId } from '@paralleldrive/cuid2';

// ファンのインターフェース定義
export interface Fan {
  id: string;
  manufacturer: string;
  model: string;
  size: number;
  rpm: {
    min: number;
    max: number;
  };
  airflow: number;
  staticPressure: number;
  noise: number;
  pwm: boolean;
  connector: string;
  rgb: boolean;
  price: number;
  url: string;
  imageUrl: string;
  recommendationScore: number;
  createdAt: Date;
  updatedAt: Date;
}

// ファンダミーデータ
export const fans: Fan[] = [
  {
    id: createId(),
    manufacturer: 'Noctua',
    model: 'NF-A12x25 PWM',
    size: 120,
    rpm: {
      min: 450,
      max: 2000
    },
    airflow: 60.1,
    staticPressure: 2.34,
    noise: 22.6,
    pwm: true,
    connector: '4-pin',
    rgb: false,
    price: 4980,
    url: 'https://example.com/products/noctua-nf-a12x25-pwm',
    imageUrl: '/images/parts/fan/noctua_nf_a12x25_pwm.jpg',
    recommendationScore: 95,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Noctua',
    model: 'NF-A14 PWM',
    size: 140,
    rpm: {
      min: 300,
      max: 1500
    },
    airflow: 82.5,
    staticPressure: 2.08,
    noise: 24.6,
    pwm: true,
    connector: '4-pin',
    rgb: false,
    price: 4480,
    url: 'https://example.com/products/noctua-nf-a14-pwm',
    imageUrl: '/images/parts/fan/noctua_nf_a14_pwm.jpg',
    recommendationScore: 94,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Corsair',
    model: 'LL120 RGB',
    size: 120,
    rpm: {
      min: 600,
      max: 1500
    },
    airflow: 43.25,
    staticPressure: 1.61,
    noise: 24.8,
    pwm: true,
    connector: '4-pin',
    rgb: true,
    price: 3980,
    url: 'https://example.com/products/corsair-ll120-rgb',
    imageUrl: '/images/parts/fan/corsair_ll120_rgb.jpg',
    recommendationScore: 88,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'be quiet!',
    model: 'Silent Wings 3',
    size: 140,
    rpm: {
      min: 400,
      max: 1000
    },
    airflow: 59.5,
    staticPressure: 1.08,
    noise: 15.5,
    pwm: true,
    connector: '4-pin',
    rgb: false,
    price: 3480,
    url: 'https://example.com/products/be-quiet-silent-wings-3',
    imageUrl: '/images/parts/fan/be_quiet_silent_wings_3.jpg',
    recommendationScore: 92,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'ARCTIC',
    model: 'P12 PWM PST',
    size: 120,
    rpm: {
      min: 200,
      max: 1800
    },
    airflow: 56.3,
    staticPressure: 2.2,
    noise: 22.5,
    pwm: true,
    connector: '4-pin',
    rgb: false,
    price: 1280,
    url: 'https://example.com/products/arctic-p12-pwm-pst',
    imageUrl: '/images/parts/fan/arctic_p12_pwm_pst.jpg',
    recommendationScore: 93,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Phanteks',
    model: 'SK140 PWM',
    size: 140,
    rpm: {
      min: 500,
      max: 1500
    },
    airflow: 65.3,
    staticPressure: 1.72,
    noise: 25.0,
    pwm: true,
    connector: '4-pin',
    rgb: false,
    price: 1980,
    url: 'https://example.com/products/phanteks-sk140-pwm',
    imageUrl: '/images/parts/fan/phanteks_sk140_pwm.jpg',
    recommendationScore: 87,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Lian Li',
    model: 'UNI FAN SL120',
    size: 120,
    rpm: {
      min: 800,
      max: 1900
    },
    airflow: 58.54,
    staticPressure: 2.54,
    noise: 28.3,
    pwm: true,
    connector: '4-pin',
    rgb: true,
    price: 2980,
    url: 'https://example.com/products/lian-li-uni-fan-sl120',
    imageUrl: '/images/parts/fan/lian_li_uni_fan_sl120.jpg',
    recommendationScore: 90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Cooler Master',
    model: 'SickleFlow 120 RGB',
    size: 120,
    rpm: {
      min: 650,
      max: 1800
    },
    airflow: 62.0,
    staticPressure: 2.5,
    noise: 27.0,
    pwm: true,
    connector: '4-pin',
    rgb: true,
    price: 1680,
    url: 'https://example.com/products/cooler-master-sickleflow-120-rgb',
    imageUrl: '/images/parts/fan/cooler_master_sickleflow_120_rgb.jpg',
    recommendationScore: 84,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Thermaltake',
    model: 'Pure 14 ARGB Sync',
    size: 140,
    rpm: {
      min: 500,
      max: 1500
    },
    airflow: 64.6,
    staticPressure: 1.58,
    noise: 28.2,
    pwm: true,
    connector: '4-pin',
    rgb: true,
    price: 2280,
    url: 'https://example.com/products/thermaltake-pure-14-argb-sync',
    imageUrl: '/images/parts/fan/thermaltake_pure_14_argb_sync.jpg',
    recommendationScore: 82,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    manufacturer: 'Scythe',
    model: 'Kaze Flex 120 PWM',
    size: 120,
    rpm: {
      min: 300,
      max: 1200
    },
    airflow: 51.17,
    staticPressure: 1.35,
    noise: 24.9,
    pwm: true,
    connector: '4-pin',
    rgb: false,
    price: 1980,
    url: 'https://example.com/products/scythe-kaze-flex-120-pwm',
    imageUrl: '/images/parts/fan/scythe_kaze_flex_120_pwm.jpg',
    recommendationScore: 89,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];
