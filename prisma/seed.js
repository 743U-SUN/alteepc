// Updated seed script for Prisma 6
const { PrismaClient } = require('@prisma/client');

// Docker環境ではパスが異なる場合があるため、複数のパスを試す
try {
  var { cpus, motherboards } = require('../src/lib/data');
  console.log('データソースを正常に読み込みました');
} catch (e) {
  try {
    var { cpus, motherboards } = require('./src/lib/data');
    console.log('代替パスからデータソースを読み込みました');
  } catch (e2) {
    console.error('データソースの読み込みに失敗しました:', e2);
    // ハードコーディングされたデータを使用
    console.log('ハードコーディングされたデモデータを使用します');
    
    // デモデータをハードコーディング
    var cpus = [
      {
        id: 'clq1g5gxi000008jt0r2rhxxx',
        manufacturer: 'Intel',
        model: 'Core i7-14700K',
        socket: 'LGA1700',
        cores: 20,
        threads: 28,
        baseClock: 3.4,
        boostClock: 5.6,
        tdp: 125,
        supportedMemoryType: ['DDR4', 'DDR5'],
        maxMemorySpeed: 6400,
        integratedGraphics: 'Intel UHD Graphics 770',
        price: 45980,
        imageUrl: 'https://example.com/i7-14700k.jpg',
        recommendationScore: 85,
        releaseDate: '2023-10-17',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'clq1g5gxi000108jt3r4rhyyy',
        manufacturer: 'AMD',
        model: 'Ryzen 7 7800X3D',
        socket: 'AM5',
        cores: 8,
        threads: 16,
        baseClock: 4.2,
        boostClock: 5.0,
        tdp: 120,
        supportedMemoryType: ['DDR5'],
        maxMemorySpeed: 5200,
        integratedGraphics: null,
        price: 52800,
        imageUrl: 'https://example.com/7800x3d.jpg',
        recommendationScore: 90,
        releaseDate: '2023-04-06',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    var motherboards = [
      {
        id: 'clq1g5gxi000208jt5r6rhzzz',
        manufacturer: 'ASUS',
        model: 'ROG STRIX Z790-E GAMING WIFI',
        socket: 'LGA1700',
        chipset: 'Z790',
        formFactor: 'ATX',
        memoryType: ['DDR5'],
        memorySlots: 4,
        maxMemorySpeed: 7800,
        maxMemory: 192,
        pciSlots: { pcie5: 1, pcie4: 1, pcie3: 2 },
        sataConnectors: 4,
        m2Slots: 5,
        price: 58980,
        imageUrl: 'https://example.com/z790-e.jpg',
        recommendationScore: 88,
        releaseDate: '2022-10-20',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'clq1g5gxi000308jt7r8rhaaa',
        manufacturer: 'MSI',
        model: 'MPG X670E CARBON WIFI',
        socket: 'AM5',
        chipset: 'X670E',
        formFactor: 'ATX',
        memoryType: ['DDR5'],
        memorySlots: 4,
        maxMemorySpeed: 6600,
        maxMemory: 128,
        pciSlots: { pcie5: 1, pcie4: 2, pcie3: 1 },
        sataConnectors: 6,
        m2Slots: 4,
        price: 54980,
        imageUrl: 'https://example.com/x670e-carbon.jpg',
        recommendationScore: 85,
        releaseDate: '2022-08-30',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }
}

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 データベースのシードを開始します...');

  // CPUデータのシード
  console.log('CPUデータをシード中...');
  for (const cpu of cpus) {
    await prisma.cPU.upsert({
      where: { id: cpu.id },
      update: {},
      create: {
        id: cpu.id,
        manufacturer: cpu.manufacturer,
        model: cpu.model,
        socket: cpu.socket,
        cores: cpu.cores,
        threads: cpu.threads,
        baseClock: cpu.baseClock,
        boostClock: cpu.boostClock,
        tdp: cpu.tdp,
        supportedMemoryType: cpu.supportedMemoryType,
        maxMemorySpeed: cpu.maxMemorySpeed,
        integratedGraphics: cpu.integratedGraphics ? cpu.integratedGraphics.toString() : null,
        price: cpu.price,
        imageUrl: cpu.imageUrl,
        description: `${cpu.manufacturer} ${cpu.model} CPU`,
        releaseDate: new Date(cpu.releaseDate),
        recommendationScore: cpu.recommendationScore,
        createdAt: cpu.createdAt || new Date(),
        updatedAt: cpu.updatedAt || new Date()
      },
    });
  }
  console.log(`✅ ${cpus.length}個のCPUデータをシードしました`);

  // マザーボードデータのシード
  console.log('マザーボードデータをシード中...');
  for (const mb of motherboards) {
    await prisma.motherboard.upsert({
      where: { id: mb.id },
      update: {},
      create: {
        id: mb.id,
        manufacturer: mb.manufacturer,
        model: mb.model,
        socket: mb.socket,
        chipset: mb.chipset,
        formFactor: mb.formFactor,
        memoryType: mb.memoryType,
        memorySlots: mb.memorySlots,
        maxMemorySpeed: mb.maxMemorySpeed,
        maxMemory: mb.maxMemory,
        // PCIスロットのフィールド名を変換
        pcie_x16: mb.pciSlots ? mb.pciSlots.pcie5 : 0, // PCIe 5.0のスロット数
        pcie_x8: mb.pciSlots ? mb.pciSlots.pcie4 : 0,  // PCIe 4.0のスロット数
        pcie_x4: mb.pciSlots ? mb.pciSlots.pcie3 : 0,  // PCIe 3.0のスロット数
        pcie_x1: 0,  // データソースに存在しない場合は0を設定
        // その他の接続関連
        sataConnectors: mb.sataConnectors,
        m2Slots: mb.m2Slots,
        usb2: 0, // データソースに存在しない場合はデフォルト値を設定
        usb3: 0, // データソースに存在しない場合はデフォルト値を設定
        typeC: 0, // データソースに存在しない場合はデフォルト値を設定
        wirelessNetworking: [], // データソースに存在しない場合は空配列を設定
        // メディア・価格情報
        imageUrl: mb.imageUrl,
        description: `${mb.manufacturer} ${mb.model} マザーボード`,
        releaseDate: new Date(mb.releaseDate),
        price: mb.price,
        recommendationScore: mb.recommendationScore,
        createdAt: mb.createdAt || new Date(),
        updatedAt: mb.updatedAt || new Date()
      },
    });
  }
  console.log(`✅ ${motherboards.length}個のマザーボードデータをシードしました`);

  // 他のパーツデータもシードする場合はここに追加

  console.log('🎉 シード処理が完了しました！');
}

main()
  .catch((e) => {
    console.error('エラーが発生しました:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
