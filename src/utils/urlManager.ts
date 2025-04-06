// src/utils/urlManager.ts
import { createId } from '@paralleldrive/cuid2';
import { log } from './logging';

// 設定データの型定義
export interface ConfigurationData {
  cpuId?: string;
  motherboardId?: string;
  ramId?: string;
  gpuId?: string;
  caseId?: string;
  powerSupplyId?: string;
  coolingId?: string;
  storageIds?: string[];
}

// ローカルストレージから設定を取得
export const getStoredConfiguration = (id: string): ConfigurationData | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const storedConfigs = localStorage.getItem('alteepc-configurations');
    if (!storedConfigs) {
      log.info(`No stored configurations found when looking for ID: ${id}`);
      return null;
    }
    
    const configs = JSON.parse(storedConfigs) as Record<string, ConfigurationData & { lastAccess: number }>;
    
    if (!configs[id]) {
      log.info(`Configuration with ID ${id} not found`);
      return null;
    }
    
    // 最終アクセス日時を更新
    configs[id].lastAccess = Date.now();
    localStorage.setItem('alteepc-configurations', JSON.stringify(configs));
    
    log.info(`Successfully retrieved configuration with ID: ${id}`);
    return configs[id];
  } catch (error) {
    log.error(`Failed to get stored configuration: ${error}`, { id });
    return null;
  }
};

// 設定を保存してIDを生成
export const saveConfiguration = (config: ConfigurationData): string => {
  if (typeof window === 'undefined') return '';
  
  try {
    const id = createId();
    const storedConfigs = localStorage.getItem('alteepc-configurations');
    const configs = storedConfigs 
      ? JSON.parse(storedConfigs) as Record<string, ConfigurationData & { lastAccess: number }> 
      : {};
    
    configs[id] = {
      ...config,
      lastAccess: Date.now(),
    };
    
    localStorage.setItem('alteepc-configurations', JSON.stringify(configs));
    
    // 90日以上アクセスのない設定を削除
    cleanupOldConfigurations();
    
    log.info(`Successfully saved configuration with ID: ${id}`);
    return id;
  } catch (error) {
    log.error(`Failed to save configuration: ${error}`);
    return '';
  }
};

// 90日以上アクセスのない設定を削除
export const cleanupOldConfigurations = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const storedConfigs = localStorage.getItem('alteepc-configurations');
    if (!storedConfigs) return;
    
    const configs = JSON.parse(storedConfigs) as Record<string, ConfigurationData & { lastAccess: number }>;
    const ninetyDaysInMs = 90 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    
    let hasChanges = false;
    let removedCount = 0;
    
    for (const id in configs) {
      if (now - configs[id].lastAccess > ninetyDaysInMs) {
        delete configs[id];
        hasChanges = true;
        removedCount++;
      }
    }
    
    if (hasChanges) {
      localStorage.setItem('alteepc-configurations', JSON.stringify(configs));
      log.info(`Cleaned up ${removedCount} old configurations`);
    }
  } catch (error) {
    log.error(`Failed to cleanup old configurations: ${error}`);
  }
};

// 設定を更新
export const updateConfiguration = (id: string, config: ConfigurationData): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const storedConfigs = localStorage.getItem('alteepc-configurations');
    if (!storedConfigs) {
      log.warn(`No stored configurations found when trying to update ID: ${id}`);
      return false;
    }
    
    const configs = JSON.parse(storedConfigs) as Record<string, ConfigurationData & { lastAccess: number }>;
    
    if (!configs[id]) {
      log.warn(`Configuration with ID ${id} not found for update`);
      return false;
    }
    
    configs[id] = {
      ...config,
      lastAccess: Date.now(),
    };
    
    localStorage.setItem('alteepc-configurations', JSON.stringify(configs));
    log.info(`Successfully updated configuration with ID: ${id}`);
    return true;
  } catch (error) {
    log.error(`Failed to update configuration: ${error}`, { id });
    return false;
  }
};

// 設定共有用のURL生成
export const getConfigurationShareUrl = (id: string): string => {
  if (typeof window === 'undefined') return '';
  
  const url = `${window.location.origin}/config/${id}`;
  log.info(`Generated share URL: ${url}`);
  return url;
};
