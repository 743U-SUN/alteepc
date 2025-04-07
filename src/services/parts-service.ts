import { 
  cpus, 
  motherboards, 
  memories, 
  gpus, 
  storages, 
  psus, 
  cases, 
  coolers, 
  fans 
} from '../lib/data';

import type { 
  CPU,
  Motherboard,
  Memory,
  GPU,
  Storage,
  PSU,
  Case,
  CPUCooler,
  Fan 
} from '../lib/data';

// フィルターインターフェースの定義
export interface FilterOptions {
  [key: string]: any;
}

// ソートオプションの型定義
export type SortOption = 'recommended' | 'price_asc' | 'price_desc' | string;

export class PartsService {
  // CPUの取得
  async getCPUs(filters: FilterOptions = {}, sortBy: SortOption = 'recommended'): Promise<CPU[]> {
    let filteredCPUs = [...cpus];
    
    // フィルタリングロジック
    if (filters.manufacturer) {
      filteredCPUs = filteredCPUs.filter(cpu => 
        cpu.manufacturer.toLowerCase() === filters.manufacturer.toLowerCase()
      );
    }
    
    if (filters.socket) {
      filteredCPUs = filteredCPUs.filter(cpu => 
        cpu.socket.toLowerCase() === filters.socket.toLowerCase()
      );
    }

    if (filters.minCores) {
      filteredCPUs = filteredCPUs.filter(cpu => 
        cpu.cores >= filters.minCores
      );
    }

    if (filters.maxPrice) {
      filteredCPUs = filteredCPUs.filter(cpu => 
        cpu.price <= filters.maxPrice
      );
    }

    if (filters.integratedGraphics !== undefined) {
      filteredCPUs = filteredCPUs.filter(cpu => 
        cpu.integratedGraphics === filters.integratedGraphics
      );
    }
    
    // ソートロジック
    switch (sortBy) {
      case 'recommended':
        filteredCPUs.sort((a, b) => b.recommendationScore - a.recommendationScore);
        break;
      case 'price_asc':
        filteredCPUs.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredCPUs.sort((a, b) => b.price - a.price);
        break;
      case 'cores_desc':
        filteredCPUs.sort((a, b) => b.cores - a.cores);
        break;
      default:
        filteredCPUs.sort((a, b) => b.recommendationScore - a.recommendationScore);
    }
    
    return filteredCPUs;
  }
  
  // CPU詳細の取得
  async getCPUById(id: string): Promise<CPU | null> {
    return cpus.find(cpu => cpu.id === id) || null;
  }
  
  // マザーボードの取得
  async getMotherboards(filters: FilterOptions = {}, sortBy: SortOption = 'recommended'): Promise<Motherboard[]> {
    let filteredMotherboards = [...motherboards];
    
    // フィルタリングロジック
    if (filters.manufacturer) {
      filteredMotherboards = filteredMotherboards.filter(mb => 
        mb.manufacturer.toLowerCase() === filters.manufacturer.toLowerCase()
      );
    }
    
    if (filters.socket) {
      filteredMotherboards = filteredMotherboards.filter(mb => 
        mb.socket.toLowerCase() === filters.socket.toLowerCase()
      );
    }
    
    if (filters.formFactor) {
      filteredMotherboards = filteredMotherboards.filter(mb => 
        mb.formFactor.toLowerCase() === filters.formFactor.toLowerCase()
      );
    }

    if (filters.chipset) {
      filteredMotherboards = filteredMotherboards.filter(mb => 
        mb.chipset.toLowerCase() === filters.chipset.toLowerCase()
      );
    }

    if (filters.memoryType) {
      filteredMotherboards = filteredMotherboards.filter(mb => 
        mb.memoryType.some(type => type.toLowerCase() === filters.memoryType.toLowerCase())
      );
    }

    if (filters.maxPrice) {
      filteredMotherboards = filteredMotherboards.filter(mb => 
        mb.price <= filters.maxPrice
      );
    }
    
    // ソートロジック
    switch (sortBy) {
      case 'recommended':
        filteredMotherboards.sort((a, b) => b.recommendationScore - a.recommendationScore);
        break;
      case 'price_asc':
        filteredMotherboards.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredMotherboards.sort((a, b) => b.price - a.price);
        break;
      default:
        filteredMotherboards.sort((a, b) => b.recommendationScore - a.recommendationScore);
    }
    
    return filteredMotherboards;
  }
  
  // マザーボード詳細の取得
  async getMotherboardById(id: string): Promise<Motherboard | null> {
    return motherboards.find(mb => mb.id === id) || null;
  }

  // メモリの取得
  async getMemories(filters: FilterOptions = {}, sortBy: SortOption = 'recommended'): Promise<Memory[]> {
    let filteredMemories = [...memories];
    
    // フィルタリングロジック
    if (filters.manufacturer) {
      filteredMemories = filteredMemories.filter(mem => 
        mem.manufacturer.toLowerCase() === filters.manufacturer.toLowerCase()
      );
    }
    
    if (filters.type) {
      filteredMemories = filteredMemories.filter(mem => 
        mem.type.toLowerCase() === filters.type.toLowerCase()
      );
    }
    
    if (filters.capacity) {
      filteredMemories = filteredMemories.filter(mem => 
        mem.capacity === filters.capacity
      );
    }

    if (filters.minSpeed) {
      filteredMemories = filteredMemories.filter(mem => 
        mem.speed >= filters.minSpeed
      );
    }

    if (filters.maxSpeed) {
      filteredMemories = filteredMemories.filter(mem => 
        mem.speed <= filters.maxSpeed
      );
    }

    if (filters.modules) {
      filteredMemories = filteredMemories.filter(mem => 
        mem.modules === filters.modules
      );
    }

    if (filters.rgb !== undefined) {
      filteredMemories = filteredMemories.filter(mem => 
        mem.rgb === filters.rgb
      );
    }

    if (filters.maxPrice) {
      filteredMemories = filteredMemories.filter(mem => 
        mem.price <= filters.maxPrice
      );
    }
    
    // ソートロジック
    switch (sortBy) {
      case 'recommended':
        filteredMemories.sort((a, b) => b.recommendationScore - a.recommendationScore);
        break;
      case 'price_asc':
        filteredMemories.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredMemories.sort((a, b) => b.price - a.price);
        break;
      case 'speed_desc':
        filteredMemories.sort((a, b) => b.speed - a.speed);
        break;
      case 'capacity_desc':
        filteredMemories.sort((a, b) => b.capacity - a.capacity);
        break;
      default:
        filteredMemories.sort((a, b) => b.recommendationScore - a.recommendationScore);
    }
    
    return filteredMemories;
  }
  
  // メモリ詳細の取得
  async getMemoryById(id: string): Promise<Memory | null> {
    return memories.find(mem => mem.id === id) || null;
  }

  // GPUの取得
  async getGPUs(filters: FilterOptions = {}, sortBy: SortOption = 'recommended'): Promise<GPU[]> {
    let filteredGPUs = [...gpus];
    
    // フィルタリングロジック
    if (filters.manufacturer) {
      filteredGPUs = filteredGPUs.filter(gpu => 
        gpu.manufacturer.toLowerCase() === filters.manufacturer.toLowerCase()
      );
    }
    
    if (filters.brand) {
      filteredGPUs = filteredGPUs.filter(gpu => 
        gpu.brand.toLowerCase() === filters.brand.toLowerCase()
      );
    }
    
    if (filters.memory) {
      filteredGPUs = filteredGPUs.filter(gpu => 
        gpu.memory >= filters.memory
      );
    }

    if (filters.maxLength) {
      filteredGPUs = filteredGPUs.filter(gpu => 
        gpu.length <= filters.maxLength
      );
    }

    if (filters.maxTdp) {
      filteredGPUs = filteredGPUs.filter(gpu => 
        gpu.tdp <= filters.maxTdp
      );
    }

    if (filters.maxPrice) {
      filteredGPUs = filteredGPUs.filter(gpu => 
        gpu.price <= filters.maxPrice
      );
    }
    
    // ソートロジック
    switch (sortBy) {
      case 'recommended':
        filteredGPUs.sort((a, b) => b.recommendationScore - a.recommendationScore);
        break;
      case 'price_asc':
        filteredGPUs.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredGPUs.sort((a, b) => b.price - a.price);
        break;
      case 'memory_desc':
        filteredGPUs.sort((a, b) => b.memory - a.memory);
        break;
      default:
        filteredGPUs.sort((a, b) => b.recommendationScore - a.recommendationScore);
    }
    
    return filteredGPUs;
  }
  
  // GPU詳細の取得
  async getGPUById(id: string): Promise<GPU | null> {
    return gpus.find(gpu => gpu.id === id) || null;
  }

  // ストレージの取得
  async getStorages(filters: FilterOptions = {}, sortBy: SortOption = 'recommended'): Promise<Storage[]> {
    let filteredStorages = [...storages];
    
    // フィルタリングロジック
    if (filters.manufacturer) {
      filteredStorages = filteredStorages.filter(storage => 
        storage.manufacturer.toLowerCase() === filters.manufacturer.toLowerCase()
      );
    }
    
    if (filters.type) {
      filteredStorages = filteredStorages.filter(storage => 
        storage.type.toLowerCase() === filters.type.toLowerCase()
      );
    }
    
    if (filters.formFactor) {
      filteredStorages = filteredStorages.filter(storage => 
        storage.formFactor.toLowerCase() === filters.formFactor.toLowerCase()
      );
    }

    if (filters.interface) {
      filteredStorages = filteredStorages.filter(storage => 
        storage.interface.toLowerCase().includes(filters.interface.toLowerCase())
      );
    }

    if (filters.minCapacity) {
      filteredStorages = filteredStorages.filter(storage => 
        storage.capacity >= filters.minCapacity
      );
    }

    if (filters.maxCapacity) {
      filteredStorages = filteredStorages.filter(storage => 
        storage.capacity <= filters.maxCapacity
      );
    }

    if (filters.maxPrice) {
      filteredStorages = filteredStorages.filter(storage => 
        storage.price <= filters.maxPrice
      );
    }
    
    // ソートロジック
    switch (sortBy) {
      case 'recommended':
        filteredStorages.sort((a, b) => b.recommendationScore - a.recommendationScore);
        break;
      case 'price_asc':
        filteredStorages.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredStorages.sort((a, b) => b.price - a.price);
        break;
      case 'capacity_desc':
        filteredStorages.sort((a, b) => b.capacity - a.capacity);
        break;
      case 'read_speed_desc':
        filteredStorages.sort((a, b) => b.readSpeed - a.readSpeed);
        break;
      default:
        filteredStorages.sort((a, b) => b.recommendationScore - a.recommendationScore);
    }
    
    return filteredStorages;
  }
  
  // ストレージ詳細の取得
  async getStorageById(id: string): Promise<Storage | null> {
    return storages.find(storage => storage.id === id) || null;
  }

  // 電源ユニットの取得
  async getPSUs(filters: FilterOptions = {}, sortBy: SortOption = 'recommended'): Promise<PSU[]> {
    let filteredPSUs = [...psus];
    
    // フィルタリングロジック
    if (filters.manufacturer) {
      filteredPSUs = filteredPSUs.filter(psu => 
        psu.manufacturer.toLowerCase() === filters.manufacturer.toLowerCase()
      );
    }
    
    if (filters.formFactor) {
      filteredPSUs = filteredPSUs.filter(psu => 
        psu.formFactor.toLowerCase() === filters.formFactor.toLowerCase()
      );
    }
    
    if (filters.certification) {
      filteredPSUs = filteredPSUs.filter(psu => 
        psu.certification.toLowerCase().includes(filters.certification.toLowerCase())
      );
    }

    if (filters.modular) {
      filteredPSUs = filteredPSUs.filter(psu => 
        psu.modular.toLowerCase() === filters.modular.toLowerCase()
      );
    }

    if (filters.minWattage) {
      filteredPSUs = filteredPSUs.filter(psu => 
        psu.wattage >= filters.minWattage
      );
    }

    if (filters.maxWattage) {
      filteredPSUs = filteredPSUs.filter(psu => 
        psu.wattage <= filters.maxWattage
      );
    }

    if (filters.maxLength) {
      filteredPSUs = filteredPSUs.filter(psu => 
        psu.length <= filters.maxLength
      );
    }

    if (filters.maxPrice) {
      filteredPSUs = filteredPSUs.filter(psu => 
        psu.price <= filters.maxPrice
      );
    }
    
    // ソートロジック
    switch (sortBy) {
      case 'recommended':
        filteredPSUs.sort((a, b) => b.recommendationScore - a.recommendationScore);
        break;
      case 'price_asc':
        filteredPSUs.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredPSUs.sort((a, b) => b.price - a.price);
        break;
      case 'wattage_desc':
        filteredPSUs.sort((a, b) => b.wattage - a.wattage);
        break;
      default:
        filteredPSUs.sort((a, b) => b.recommendationScore - a.recommendationScore);
    }
    
    return filteredPSUs;
  }
  
  // 電源ユニット詳細の取得
  async getPSUById(id: string): Promise<PSU | null> {
    return psus.find(psu => psu.id === id) || null;
  }

  // PCケースの取得
  async getCases(filters: FilterOptions = {}, sortBy: SortOption = 'recommended'): Promise<Case[]> {
    let filteredCases = [...cases];
    
    // フィルタリングロジック
    if (filters.manufacturer) {
      filteredCases = filteredCases.filter(pc => 
        pc.manufacturer.toLowerCase() === filters.manufacturer.toLowerCase()
      );
    }
    
    if (filters.formFactor) {
      filteredCases = filteredCases.filter(pc => 
        pc.formFactor.toLowerCase() === filters.formFactor.toLowerCase()
      );
    }
    
    if (filters.supportedMotherboard) {
      filteredCases = filteredCases.filter(pc => 
        pc.supportedMotherboards.some(mb => 
          mb.toLowerCase() === filters.supportedMotherboard.toLowerCase()
        )
      );
    }

    if (filters.minCoolerHeight) {
      filteredCases = filteredCases.filter(pc => 
        pc.maxCoolerHeight >= filters.minCoolerHeight
      );
    }

    if (filters.minGpuLength) {
      filteredCases = filteredCases.filter(pc => 
        pc.maxGpuLength >= filters.minGpuLength
      );
    }

    if (filters.minPsuLength) {
      filteredCases = filteredCases.filter(pc => 
        pc.maxPsuLength >= filters.minPsuLength
      );
    }

    if (filters.sideWindow !== undefined) {
      filteredCases = filteredCases.filter(pc => 
        pc.sideWindow === filters.sideWindow
      );
    }

    if (filters.maxPrice) {
      filteredCases = filteredCases.filter(pc => 
        pc.price <= filters.maxPrice
      );
    }
    
    // ソートロジック
    switch (sortBy) {
      case 'recommended':
        filteredCases.sort((a, b) => b.recommendationScore - a.recommendationScore);
        break;
      case 'price_asc':
        filteredCases.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredCases.sort((a, b) => b.price - a.price);
        break;
      default:
        filteredCases.sort((a, b) => b.recommendationScore - a.recommendationScore);
    }
    
    return filteredCases;
  }
  
  // PCケース詳細の取得
  async getCaseById(id: string): Promise<Case | null> {
    return cases.find(pc => pc.id === id) || null;
  }

  // CPUクーラーの取得
  async getCoolers(filters: FilterOptions = {}, sortBy: SortOption = 'recommended'): Promise<CPUCooler[]> {
    let filteredCoolers = [...coolers];
    
    // フィルタリングロジック
    if (filters.manufacturer) {
      filteredCoolers = filteredCoolers.filter(cooler => 
        cooler.manufacturer.toLowerCase() === filters.manufacturer.toLowerCase()
      );
    }
    
    if (filters.type) {
      filteredCoolers = filteredCoolers.filter(cooler => 
        cooler.type.toLowerCase() === filters.type.toLowerCase()
      );
    }
    
    if (filters.socket) {
      filteredCoolers = filteredCoolers.filter(cooler => 
        cooler.socket.some(s => s.toLowerCase() === filters.socket.toLowerCase())
      );
    }

    if (filters.maxHeight && filters.type === 'Air') {
      filteredCoolers = filteredCoolers.filter(cooler => 
        cooler.height !== null && cooler.height <= filters.maxHeight
      );
    }

    if (filters.radiatorSize) {
      filteredCoolers = filteredCoolers.filter(cooler => 
        cooler.radiatorSize === filters.radiatorSize
      );
    }

    if (filters.minTdp) {
      filteredCoolers = filteredCoolers.filter(cooler => 
        cooler.tdp >= filters.minTdp
      );
    }

    if (filters.rgb !== undefined) {
      filteredCoolers = filteredCoolers.filter(cooler => 
        cooler.rgb === filters.rgb
      );
    }

    if (filters.maxPrice) {
      filteredCoolers = filteredCoolers.filter(cooler => 
        cooler.price <= filters.maxPrice
      );
    }
    
    // ソートロジック
    switch (sortBy) {
      case 'recommended':
        filteredCoolers.sort((a, b) => b.recommendationScore - a.recommendationScore);
        break;
      case 'price_asc':
        filteredCoolers.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredCoolers.sort((a, b) => b.price - a.price);
        break;
      case 'tdp_desc':
        filteredCoolers.sort((a, b) => b.tdp - a.tdp);
        break;
      case 'noise_asc':
        filteredCoolers.sort((a, b) => a.noise - b.noise);
        break;
      default:
        filteredCoolers.sort((a, b) => b.recommendationScore - a.recommendationScore);
    }
    
    return filteredCoolers;
  }
  
  // CPUクーラー詳細の取得
  async getCoolerById(id: string): Promise<CPUCooler | null> {
    return coolers.find(cooler => cooler.id === id) || null;
  }

  // ファンの取得
  async getFans(filters: FilterOptions = {}, sortBy: SortOption = 'recommended'): Promise<Fan[]> {
    let filteredFans = [...fans];
    
    // フィルタリングロジック
    if (filters.manufacturer) {
      filteredFans = filteredFans.filter(fan => 
        fan.manufacturer.toLowerCase() === filters.manufacturer.toLowerCase()
      );
    }
    
    if (filters.size) {
      filteredFans = filteredFans.filter(fan => 
        fan.size === filters.size
      );
    }
    
    if (filters.pwm !== undefined) {
      filteredFans = filteredFans.filter(fan => 
        fan.pwm === filters.pwm
      );
    }

    if (filters.rgb !== undefined) {
      filteredFans = filteredFans.filter(fan => 
        fan.rgb === filters.rgb
      );
    }

    if (filters.maxNoise) {
      filteredFans = filteredFans.filter(fan => 
        fan.noise <= filters.maxNoise
      );
    }

    if (filters.minAirflow) {
      filteredFans = filteredFans.filter(fan => 
        fan.airflow >= filters.minAirflow
      );
    }

    if (filters.maxPrice) {
      filteredFans = filteredFans.filter(fan => 
        fan.price <= filters.maxPrice
      );
    }
    
    // ソートロジック
    switch (sortBy) {
      case 'recommended':
        filteredFans.sort((a, b) => b.recommendationScore - a.recommendationScore);
        break;
      case 'price_asc':
        filteredFans.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredFans.sort((a, b) => b.price - a.price);
        break;
      case 'airflow_desc':
        filteredFans.sort((a, b) => b.airflow - a.airflow);
        break;
      case 'noise_asc':
        filteredFans.sort((a, b) => a.noise - b.noise);
        break;
      default:
        filteredFans.sort((a, b) => b.recommendationScore - a.recommendationScore);
    }
    
    return filteredFans;
  }
  
  // ファン詳細の取得
  async getFanById(id: string): Promise<Fan | null> {
    return fans.find(fan => fan.id === id) || null;
  }
}
