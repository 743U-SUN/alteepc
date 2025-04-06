// src/utils/compatibilityChecker.ts
import {
  CPU,
  Motherboard,
  RAM,
  GPU,
  Case,
  PowerSupply,
  Cooling,
  Storage,
} from '../data/dummyData';
import { log } from './logging';

export interface CompatibilityIssue {
  type: 'error' | 'warning';
  message: string;
  components: string[];
}

export interface CompatibilityResult {
  compatible: boolean;
  issues: CompatibilityIssue[];
}

export interface PCParts {
  cpu?: CPU;
  motherboard?: Motherboard;
  ram?: RAM;
  gpu?: GPU;
  case?: Case;
  powerSupply?: PowerSupply;
  cooling?: Cooling;
  storages?: Storage[];
}

export const checkCompatibility = (parts: PCParts): CompatibilityResult => {
  const issues: CompatibilityIssue[] = [];
  log.info('Starting compatibility check', { 
    hasComponents: {
      cpu: !!parts.cpu,
      motherboard: !!parts.motherboard,
      ram: !!parts.ram,
      gpu: !!parts.gpu,
      case: !!parts.case,
      powerSupply: !!parts.powerSupply,
      cooling: !!parts.cooling,
      storages: parts.storages ? parts.storages.length : 0,
    }
  });

  // CPUとマザーボードのソケット互換性チェック
  if (parts.cpu && parts.motherboard) {
    if (parts.cpu.socket !== parts.motherboard.socket) {
      const issue = {
        type: 'error' as const,
        message: `CPUソケット(${parts.cpu.socket})とマザーボードソケット(${parts.motherboard.socket})が一致しません`,
        components: ['cpu', 'motherboard'],
      };
      issues.push(issue);
      log.warn('Socket compatibility issue detected', issue);
    }
  }

  // CPUとマザーボードのメモリタイプ互換性チェック
  if (parts.cpu && parts.motherboard && parts.ram) {
    const cpuSupportsRamType = parts.cpu.supportedMemoryType.includes(parts.ram.type);
    const motherboardSupportsRamType = parts.motherboard.supportedMemoryType.includes(parts.ram.type);
    
    if (!cpuSupportsRamType || !motherboardSupportsRamType) {
      const issue = {
        type: 'error' as const,
        message: `選択されたRAMタイプ(${parts.ram.type})はCPUまたはマザーボードと互換性がありません`,
        components: ['cpu', 'motherboard', 'ram'],
      };
      issues.push(issue);
      log.warn('Memory type compatibility issue detected', issue);
    }
  }

  // GPUの長さとケースの最大GPU長の適合性チェック
  if (parts.gpu && parts.case) {
    if (parts.gpu.length > parts.case.maxGPULength) {
      const issue = {
        type: 'error' as const,
        message: `選択されたGPU(長さ: ${parts.gpu.length}mm)はケースの最大GPU長(${parts.case.maxGPULength}mm)を超えています`,
        components: ['gpu', 'case'],
      };
      issues.push(issue);
      log.warn('GPU length compatibility issue detected', issue);
    }
  }

  // CPUクーラーの高さとケースの最大クーラー高の適合性チェック
  if (parts.cooling && parts.case && parts.cooling.type === 'Air' && parts.cooling.height) {
    if (parts.cooling.height > parts.case.maxCoolerHeight) {
      const issue = {
        type: 'error' as const,
        message: `選択されたCPUクーラー(高さ: ${parts.cooling.height}mm)はケースの最大クーラー高(${parts.case.maxCoolerHeight}mm)を超えています`,
        components: ['cooling', 'case'],
      };
      issues.push(issue);
      log.warn('CPU cooler height compatibility issue detected', issue);
    }
  }

  // 水冷ラジエーターサイズとケースの対応可否チェック
  if (parts.cooling && parts.case && parts.cooling.type === 'Liquid' && parts.cooling.radiatorSize) {
    if (!parts.case.supportedRadiatorSizes.includes(parts.cooling.radiatorSize)) {
      const issue = {
        type: 'error' as const,
        message: `選択されたラジエーターサイズ(${parts.cooling.radiatorSize})はケースでサポートされていません`,
        components: ['cooling', 'case'],
      };
      issues.push(issue);
      log.warn('Radiator size compatibility issue detected', issue);
    }
  }

  // 電源の奥行きとケースの最大電源長の適合性チェック
  if (parts.powerSupply && parts.case) {
    if (parts.powerSupply.length > parts.case.maxPSULength) {
      const issue = {
        type: 'error' as const,
        message: `選択された電源(奥行き: ${parts.powerSupply.length}mm)はケースの最大電源長(${parts.case.maxPSULength}mm)を超えています`,
        components: ['powerSupply', 'case'],
      };
      issues.push(issue);
      log.warn('Power supply length compatibility issue detected', issue);
    }
  }

  // マザーボードサイズとケースの対応可否チェック
  if (parts.motherboard && parts.case) {
    if (!parts.case.supportedMotherboards.includes(parts.motherboard.formFactor)) {
      const issue = {
        type: 'error' as const,
        message: `選択されたマザーボードフォームファクター(${parts.motherboard.formFactor})はケースでサポートされていません`,
        components: ['motherboard', 'case'],
      };
      issues.push(issue);
      log.warn('Motherboard form factor compatibility issue detected', issue);
    }
  }

  // 全パーツの消費電力合計と電源容量の適合性チェック
  if (parts.cpu && parts.gpu && parts.powerSupply) {
    // 消費電力計算（詳細なモデルを実装）
    let totalPower = parts.cpu.tdp + parts.gpu.tdp;
    
    // マザーボード、RAMなどの基本消費電力の概算
    totalPower += 50; // マザーボード
    
    if (parts.ram) {
      totalPower += 10; // RAM基本消費電力
    }
    
    // ストレージごとの消費電力を加算
    if (parts.storages && parts.storages.length > 0) {
      parts.storages.forEach(storage => {
        if (storage.type === 'HDD') {
          totalPower += 10; // HDD消費電力
        } else {
          totalPower += 5; // SSD消費電力
        }
      });
    }
    
    // 水冷クーラーのポンプなどの消費電力
    if (parts.cooling && parts.cooling.type === 'Liquid') {
      totalPower += 15;
    }
    
    // 30%のマージンを追加して推奨電源容量を計算
    const recommendedWattage = Math.ceil(totalPower * 1.3);
    
    if (parts.powerSupply.wattage < recommendedWattage) {
      const issue = {
        type: 'warning' as const,
        message: `電源容量(${parts.powerSupply.wattage}W)が推奨値(${recommendedWattage}W)より低いです`,
        components: ['cpu', 'gpu', 'powerSupply'],
      };
      issues.push(issue);
      log.warn('Power supply wattage issue detected', { 
        totalPower, 
        recommendedWattage, 
        currentWattage: parts.powerSupply.wattage 
      });
    }
  }

  const result = {
    compatible: !issues.some(issue => issue.type === 'error'),
    issues,
  };
  
  log.info('Compatibility check completed', { 
    compatible: result.compatible, 
    issueCount: result.issues.length 
  });
  
  return result;
};

// パーツの合計金額を計算する関数
export const calculateTotalPrice = (parts: PCParts): number => {
  let total = 0;
  
  if (parts.cpu) total += parts.cpu.price;
  if (parts.motherboard) total += parts.motherboard.price;
  if (parts.ram) total += parts.ram.price;
  if (parts.gpu) total += parts.gpu.price;
  if (parts.case) total += parts.case.price;
  if (parts.powerSupply) total += parts.powerSupply.price;
  if (parts.cooling) total += parts.cooling.price;
  
  if (parts.storages && parts.storages.length > 0) {
    total += parts.storages.reduce((acc, storage) => acc + storage.price, 0);
  }
  
  log.debug('Calculated total price', { total });
  return total;
};

// 合計消費電力を計算する機能を追加
export const calculateTotalPower = (parts: PCParts): number => {
  let totalPower = 0;
  
  if (parts.cpu) totalPower += parts.cpu.tdp;
  if (parts.gpu) totalPower += parts.gpu.tdp;
  
  // マザーボード、RAMなどの基本消費電力の概算
  totalPower += 50; // マザーボード
  
  if (parts.ram) {
    totalPower += 10; // RAM基本消費電力
  }
  
  // ストレージごとの消費電力を加算
  if (parts.storages && parts.storages.length > 0) {
    parts.storages.forEach(storage => {
      if (storage.type === 'HDD') {
        totalPower += 10; // HDD消費電力
      } else {
        totalPower += 5; // SSD消費電力
      }
    });
  }
  
  // 水冷クーラーのポンプなどの消費電力
  if (parts.cooling && parts.cooling.type === 'Liquid') {
    totalPower += 15;
  }
  
  log.debug('Calculated total power', { totalPower });
  return totalPower;
};
