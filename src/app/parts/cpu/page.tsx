'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cpus } from '@/lib/data/cpus';
import { useBuild } from '@/context/build-context';
import PartList from '@/components/parts/part-list';
import FilterSection from '@/components/parts/filter-section';
import SortControl from '@/components/parts/sort-control';
import Button from '@/components/ui/button';

export default function CPUSelectionPage() {
  const router = useRouter();
  const { currentBuild, updatePart } = useBuild();
  
  // フィルター状態
  const [manufacturer, setManufacturer] = useState('');
  const [socket, setSocket] = useState('');
  const [sortOption, setSortOption] = useState('recommended');
  
  // フィルタリングされたCPUリスト
  const [filteredCPUs, setFilteredCPUs] = useState(cpus);
  
  // ソート・フィルター適用
  useEffect(() => {
    let filtered = [...cpus];
    
    // メーカーフィルター
    if (manufacturer) {
      filtered = filtered.filter(cpu => cpu.manufacturer === manufacturer);
    }
    
    // ソケットフィルター
    if (socket) {
      filtered = filtered.filter(cpu => cpu.socket === socket);
    }
    
    // ソート
    switch (sortOption) {
      case 'recommended':
        filtered.sort((a, b) => b.recommendationScore - a.recommendationScore);
        break;
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'cores_desc':
        filtered.sort((a, b) => b.cores - a.cores);
        break;
    }
    
    setFilteredCPUs(filtered);
  }, [manufacturer, socket, sortOption]);
  
  // CPU選択時のハンドラー
  const handleSelectCPU = (cpuId: string) => {
    updatePart('cpu', cpuId);
    router.push('/build');
  };
  
  // CPU仕様取得関数
  const getCPUSpecs = (cpu: any) => [
    { label: 'ソケット', value: cpu.socket },
    { label: 'コア / スレッド', value: `${cpu.cores}C / ${cpu.threads}T` },
    { label: 'ベースクロック', value: `${cpu.baseClock} GHz` },
    { label: 'ブーストクロック', value: `${cpu.boostClock} GHz` },
    { label: 'TDP', value: `${cpu.tdp} W` },
    { label: '内蔵グラフィック', value: cpu.integratedGraphics },
  ];
  
  // ソケットオプションを動的に生成
  const socketOptions = Array.from(new Set(cpus.map(cpu => cpu.socket))).map(socket => ({
    label: socket,
    value: socket,
  }));
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link href="/build" className="text-primary hover:underline">
          ← PC構成に戻る
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-6">CPU選択</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* フィルターセクション */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-xl font-bold mb-4">フィルター</h2>
              
              <FilterSection
                title="メーカー"
                options={[
                  { label: 'Intel', value: 'Intel' },
                  { label: 'AMD', value: 'AMD' },
                ]}
                selectedValue={manufacturer}
                onChange={setManufacturer}
              />
              
              <FilterSection
                title="ソケット"
                options={socketOptions}
                selectedValue={socket}
                onChange={setSocket}
              />
              
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => {
                  setManufacturer('');
                  setSocket('');
                }}
              >
                フィルターをリセット
              </Button>
            </div>
          </div>
          
          {/* CPUリスト */}
          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500">
                  {filteredCPUs.length} 件のCPUが見つかりました
                </div>
                
                <SortControl
                  options={[
                    { label: 'おすすめ', value: 'recommended' },
                    { label: '価格: 安い順', value: 'price_asc' },
                    { label: '価格: 高い順', value: 'price_desc' },
                    { label: 'コア数: 多い順', value: 'cores_desc' },
                  ]}
                  selectedValue={sortOption}
                  onChange={setSortOption}
                />
              </div>
              
              <PartList
                parts={filteredCPUs}
                onSelectPart={handleSelectCPU}
                getSpecs={getCPUSpecs}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
