'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motherboards } from '@/lib/data/motherboards';
import { cpus } from '@/lib/data/cpus'; 
import { useBuild } from '@/context/build-context';
import PartList from '@/components/parts/part-list';
import FilterSection from '@/components/parts/filter-section';
import SortControl from '@/components/parts/sort-control';
import Button from '@/components/ui/button';

export default function MotherboardSelectionPage() {
  const router = useRouter();
  const { currentBuild, updatePart } = useBuild();
  
  // フィルター状態
  const [manufacturer, setManufacturer] = useState('');
  const [socket, setSocket] = useState('');
  const [formFactor, setFormFactor] = useState('');
  const [memoryType, setMemoryType] = useState('');
  const [sortOption, setSortOption] = useState('recommended');
  
  // フィルタリングされたマザーボードリスト
  const [filteredMotherboards, setFilteredMotherboards] = useState(motherboards);

  // 選択されているCPUに基づいて自動フィルタリング
  useEffect(() => {
    if (currentBuild.components.cpu) {
      const selectedCpu = cpus.find(cpu => cpu.id === currentBuild.components.cpu);
      if (selectedCpu) {
        setSocket(selectedCpu.socket);
      }
    }
  }, [currentBuild.components.cpu]);
  
  // ソート・フィルター適用
  useEffect(() => {
    let filtered = [...motherboards];
    
    // メーカーフィルター
    if (manufacturer) {
      filtered = filtered.filter(mb => mb.manufacturer === manufacturer);
    }
    
    // ソケットフィルター
    if (socket) {
      filtered = filtered.filter(mb => mb.socket === socket);
    }
    
    // フォームファクターフィルター
    if (formFactor) {
      filtered = filtered.filter(mb => mb.formFactor === formFactor);
    }
    
    // メモリタイプフィルター
    if (memoryType) {
      filtered = filtered.filter(mb => mb.memoryType.includes(memoryType));
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
    }
    
    setFilteredMotherboards(filtered);
  }, [manufacturer, socket, formFactor, memoryType, sortOption]);
  
  // マザーボード選択時のハンドラー
  const handleSelectMotherboard = (motherboardId: string) => {
    // マザーボードの更新時にCPUの情報を保持したまま更新する
    const updatedComponents = {
      ...currentBuild.components,
      motherboard: motherboardId
    };
    
    // 新しい構成でローカルストレージを直接更新
    const updatedBuild = {
      ...currentBuild,
      components: updatedComponents
    };
    localStorage.setItem('alteepc_current_build', JSON.stringify(updatedBuild));
    
    // コンテキストの状態も更新
    updatePart('motherboard', motherboardId);
    
    router.push('/build');
  };
  
  // マザーボード仕様取得関数
  const getMotherboardSpecs = (mb: any) => [
    { label: 'ソケット', value: mb.socket },
    { label: 'チップセット', value: mb.chipset },
    { label: 'フォームファクター', value: mb.formFactor },
    { label: 'メモリタイプ', value: mb.memoryType.join(', ') },
    { label: 'メモリスロット', value: mb.memorySlots },
    { label: 'M.2スロット', value: mb.m2Slots },
  ];
  
  // 各種オプションを動的に生成
  const socketOptions = Array.from(new Set(motherboards.map(mb => mb.socket))).map(socket => ({
    label: socket,
    value: socket,
  }));
  
  const formFactorOptions = Array.from(new Set(motherboards.map(mb => mb.formFactor))).map(form => ({
    label: form,
    value: form,
  }));
  
  const memoryTypeOptions = [
    { label: 'DDR4', value: 'DDR4' },
    { label: 'DDR5', value: 'DDR5' },
  ];
  
  const manufacturerOptions = Array.from(new Set(motherboards.map(mb => mb.manufacturer))).map(manu => ({
    label: manu,
    value: manu,
  }));
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link href="/build" className="text-primary hover:underline">
          ← PC構成に戻る
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-6">マザーボード選択</h1>
        
        {/* 選択中のCPUに関するヒント表示 */}
        {currentBuild.components.cpu && (
          <div className="bg-blue-50 border-l-4 border-primary p-4 mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">CPU選択済み:</span> {
                cpus.find(cpu => cpu.id === currentBuild.components.cpu)?.manufacturer
              } {
                cpus.find(cpu => cpu.id === currentBuild.components.cpu)?.model
              }（{
                cpus.find(cpu => cpu.id === currentBuild.components.cpu)?.socket
              }）
            </p>
            <p className="text-xs text-gray-500 mt-1">
              現在のCPUに基づいてソケットフィルターが適用されています。
            </p>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* フィルターセクション */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-xl font-bold mb-4">フィルター</h2>
              
              <FilterSection
                title="メーカー"
                options={manufacturerOptions}
                selectedValue={manufacturer}
                onChange={setManufacturer}
              />
              
              <FilterSection
                title="ソケット"
                options={socketOptions}
                selectedValue={socket}
                onChange={setSocket}
              />
              
              <FilterSection
                title="フォームファクター"
                options={formFactorOptions}
                selectedValue={formFactor}
                onChange={setFormFactor}
              />
              
              <FilterSection
                title="メモリタイプ"
                options={memoryTypeOptions}
                selectedValue={memoryType}
                onChange={setMemoryType}
              />
              
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => {
                  setManufacturer('');
                  setSocket('');
                  setFormFactor('');
                  setMemoryType('');
                }}
              >
                フィルターをリセット
              </Button>
            </div>
          </div>
          
          {/* マザーボードリスト */}
          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500">
                  {filteredMotherboards.length} 件のマザーボードが見つかりました
                </div>
                
                <SortControl
                  options={[
                    { label: 'おすすめ', value: 'recommended' },
                    { label: '価格: 安い順', value: 'price_asc' },
                    { label: '価格: 高い順', value: 'price_desc' },
                  ]}
                  selectedValue={sortOption}
                  onChange={setSortOption}
                />
              </div>
              
              <PartList
                parts={filteredMotherboards}
                onSelectPart={handleSelectMotherboard}
                getSpecs={getMotherboardSpecs}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
