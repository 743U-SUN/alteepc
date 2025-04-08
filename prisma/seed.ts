import { PrismaClient } from '@prisma/client';
import {
  cpus,
  motherboards,
  // 将来的にはこれらのデータも使用予定
  // memories,
  // gpus,
  // storages,
  // psus,
  // cases,
  // coolers,
  // fans
} from '../src/lib/data';

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
        createdAt: cpu.createdAt,
        updatedAt: cpu.updatedAt
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
        pcie_x16: mb.pciSlots.pcie5, // PCIe 5.0のスロット数
        pcie_x8: mb.pciSlots.pcie4,  // PCIe 4.0のスロット数
        pcie_x4: mb.pciSlots.pcie3,  // PCIe 3.0のスロット数
        pcie_x1: 0,  // データソースに存在しない場合だ0を設定
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
        createdAt: mb.createdAt,
        updatedAt: mb.updatedAt
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
