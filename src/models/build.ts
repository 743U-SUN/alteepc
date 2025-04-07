// PC構成
export interface PCBuild {
  components: {
    cpu: string | null;
    motherboard: string | null;
    memory: string[];
    gpu: string | null;
    storage: string[];
    psu: string | null;
    case: string | null;
    cpuCooler: string | null;
    fans: string[];
  };
  compatibilityIssues: CompatibilityIssue[];
  totalPrice: number;
  name?: string;
}

// 互換性の問題
export interface CompatibilityIssue {
  type: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  components: string[];
}

// 保存された構成
export interface SavedBuild extends PCBuild {
  id: string;
  createdAt: Date;
  lastAccessedAt: Date;
  expiresAt: Date;
  accessCount: number;
}

// 共有リンク
export interface BuildShareInfo {
  id: string;
  url: string;
  createdAt: Date;
  expiresAt: Date;
}
