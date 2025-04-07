'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PCBuild } from '@/models/build';

interface BuildContextType {
  currentBuild: PCBuild;
  updateBuild: (newBuild: Partial<PCBuild>) => void;
  updatePart: (partType: string, partId: string | null) => void;
  resetBuild: () => void;
}

const initialBuild: PCBuild = {
  components: {
    cpu: null,
    motherboard: null,
    memory: [],
    gpu: null,
    storage: [],
    psu: null,
    case: null,
    cpuCooler: null,
    fans: []
  },
  compatibilityIssues: [],
  totalPrice: 0
};

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export function BuildProvider({ children }: { children: React.ReactNode }) {
  const [currentBuild, setCurrentBuild] = useState<PCBuild>(initialBuild);
  
  // ブラウザでのみ実行されるようにする
  useEffect(() => {
    const savedBuild = localStorage.getItem('alteepc_current_build');
    if (savedBuild) {
      try {
        setCurrentBuild(JSON.parse(savedBuild));
      } catch (error) {
        console.error('Failed to parse saved build:', error);
      }
    }
  }, []);
  
  const updateBuild = (newBuild: Partial<PCBuild>) => {
    const updatedBuild = { ...currentBuild, ...newBuild };
    setCurrentBuild(updatedBuild);
    localStorage.setItem('alteepc_current_build', JSON.stringify(updatedBuild));
  };
  
  const updatePart = (partType: string, partId: string | null) => {
    if (!partType) return;
    
    let updatedComponents;
    
    // 配列形式のコンポーネントを処理
    if (['memory', 'storage', 'fans'].includes(partType)) {
      if (partId === null) {
        // 全削除の場合
        updatedComponents = {
          ...currentBuild.components,
          [partType]: []
        };
      } else {
        // 配列の場合は追加する
        const currentArray = currentBuild.components[partType as keyof typeof currentBuild.components] as string[];
        if (!currentArray.includes(partId)) {
          updatedComponents = {
            ...currentBuild.components,
            [partType]: [...currentArray, partId]
          };
        } else {
          return; // 既に存在する場合は何もしない
        }
      }
    } else {
      // 単一値のコンポーネントを処理
      updatedComponents = {
        ...currentBuild.components,
        [partType]: partId
      };
    }
    
    const updatedBuild = {
      ...currentBuild,
      components: updatedComponents
    };
    
    setCurrentBuild(updatedBuild);
    localStorage.setItem('alteepc_current_build', JSON.stringify(updatedBuild));
  };
  
  const resetBuild = () => {
    setCurrentBuild(initialBuild);
    localStorage.removeItem('alteepc_current_build');
  };
  
  return (
    <BuildContext.Provider value={{ currentBuild, updateBuild, updatePart, resetBuild }}>
      {children}
    </BuildContext.Provider>
  );
}

export function useBuildContext() {
  const context = useContext(BuildContext);
  if (context === undefined) {
    throw new Error('useBuildContext must be used within a BuildProvider');
  }
  return context;
}
