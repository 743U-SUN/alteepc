import React from 'react';
import Link from 'next/link';
import { useBuild } from '@/context/build-context';
import { cpus } from '@/lib/data/cpus';
import { motherboards } from '@/lib/data/motherboards';
import Button from '../ui/button';

export default function BuildSummary() {
  const { currentBuild, updatePart } = useBuild();
  
  // 選択されたCPUとマザーボードの情報を取得
  const selectedCPU = currentBuild.components.cpu 
    ? cpus.find(cpu => cpu.id === currentBuild.components.cpu) 
    : null;
    
  const selectedMotherboard = currentBuild.components.motherboard 
    ? motherboards.find(mb => mb.id === currentBuild.components.motherboard) 
    : null;
  
  // 合計金額の計算
  const totalPrice = [
    selectedCPU?.price || 0,
    selectedMotherboard?.price || 0,
    // 他のパーツの価格も同様に追加
  ].reduce((sum, price) => sum + price, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">構成サマリー</h2>
      
      <div className="space-y-6">
        {/* CPU */}
        <div className="border-b pb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">CPU</h3>
            <Link href="/parts/cpu" className="text-primary text-sm hover:underline">
              {selectedCPU ? '変更' : '選択'}
            </Link>
          </div>
          
          {selectedCPU ? (
            <div>
              <div className="text-sm">{selectedCPU.manufacturer} {selectedCPU.model}</div>
              <div className="flex justify-between mt-1">
                <div className="text-xs text-gray-500">
                  {selectedCPU.cores}コア/{selectedCPU.threads}スレッド • {selectedCPU.socket}
                </div>
                <div className="text-sm font-semibold">¥{selectedCPU.price.toLocaleString()}</div>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">未選択</span>
              <Button size="sm" variant="primary" className="text-xs px-2 py-1">
                <Link href="/parts/cpu" className="text-white">選択する</Link>
              </Button>
            </div>
          )}
        </div>
        
        {/* マザーボード */}
        <div className="border-b pb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">マザーボード</h3>
            <Link href="/parts/motherboard" className="text-primary text-sm hover:underline">
              {selectedMotherboard ? '変更' : '選択'}
            </Link>
          </div>
          
          {selectedMotherboard ? (
            <div>
              <div className="text-sm">{selectedMotherboard.manufacturer} {selectedMotherboard.model}</div>
              <div className="flex justify-between mt-1">
                <div className="text-xs text-gray-500">
                  {selectedMotherboard.socket} • {selectedMotherboard.formFactor}
                </div>
                <div className="text-sm font-semibold">¥{selectedMotherboard.price.toLocaleString()}</div>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">未選択</span>
              <Button size="sm" variant="primary" className="text-xs px-2 py-1">
                <Link href="/parts/motherboard" className="text-white">選択する</Link>
              </Button>
            </div>
          )}
        </div>
        
        {/* 他のパーツも同様に追加 (将来的な実装) */}
        
        {/* 合計金額 */}
        <div className="pt-4">
          <div className="flex justify-between items-center">
            <div className="font-bold">合計金額</div>
            <div className="text-xl font-bold text-primary">¥{totalPrice.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
