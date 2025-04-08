'use client';

import { useBuild as useBuildContext } from '@/context/build-context';
import { BuildComponents, PCBuild } from '@/types/build';

export function useBuild() {
  const { currentBuild, updatePart, resetBuild } = useBuildContext();
  
  const hasParts = Object.values(currentBuild.components).some(value => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== null;
  });
  
  // 特定のパーツが選択されているかをチェック
  const isPartSelected = (partType: string): boolean => {
    const part = currentBuild.components[partType as keyof typeof currentBuild.components];
    if (Array.isArray(part)) {
      return part.length > 0;
    }
    return part !== null;
  };
  
  // 特定のパーツを削除する
  const removePart = (partType: string, partId?: string) => {
    const part = currentBuild.components[partType as keyof typeof currentBuild.components];
    
    if (Array.isArray(part) && partId) {
      // 配列の場合は特定のアイテムを削除
      const updatedArray = part.filter(id => id !== partId);
      updatePart(partType as keyof BuildComponents, null); // 一旦nullを設定
      
      // 更新された配列を反映
      updatedArray.forEach(id => {
        updatePart(partType as keyof BuildComponents, id);
      });
    } else {
      // 単一値の場合は単純にnullを設定
      updatePart(partType as keyof BuildComponents, null);
    }
  };
  
  return {
    currentBuild,
    updatePart,
    resetBuild,
    hasParts,
    isPartSelected,
    removePart
  };
}
