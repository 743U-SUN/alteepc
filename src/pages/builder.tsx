import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import PartSelector from '../components/builder/PartSelector';
import CompatibilityChecker from '../components/builder/CompatibilityChecker';
import PriceSummary from '../components/builder/PriceSummary';
import ShareConfiguration from '../components/builder/ShareConfiguration';
import StorageSelector from '../components/builder/StorageSelector';
import { PCParts } from '../utils/compatibilityChecker';
import { ConfigurationData } from '../utils/urlManager';
import { allParts, Storage } from '../data/dummyData';
import { partCategories, PartCategory } from '../types';
import { log } from '../utils/logging';

const PCBuilder: React.FC = () => {
  // 選択されたパーツの状態
  const [selectedParts, setSelectedParts] = useState<PCParts>({});
  
  // 選択されたパーツIDの状態（共有用）
  const [configData, setConfigData] = useState<ConfigurationData>({
    storageIds: [],
  });

  // コンポーネントがマウントされたときにログを記録
  useEffect(() => {
    log.info('PC Builder page accessed');
  }, []);

  // パーツ選択の変更を処理する関数
  const handlePartSelect = (category: PartCategory, partId: string | undefined) => {
    // ストレージ以外のカテゴリを処理
    if (category !== 'storage') {
      // 選択解除の場合
      if (!partId) {
        setSelectedParts(prev => {
          const newParts = { ...prev };
          delete newParts[category];
          return newParts;
        });
        
        setConfigData(prev => {
          const newConfig = { ...prev };
          delete newConfig[`${category}Id`];
          return newConfig;
        });
        
        log.info(`Removed ${category} selection`);
        return;
      }

      // カテゴリに応じてパーツオブジェクトを取得
      let selectedPart;
      switch (category) {
        case 'cpu':
          selectedPart = allParts.cpus.find(part => part.id === partId);
          break;
        case 'motherboard':
          selectedPart = allParts.motherboards.find(part => part.id === partId);
          break;
        case 'ram':
          selectedPart = allParts.rams.find(part => part.id === partId);
          break;
        case 'gpu':
          selectedPart = allParts.gpus.find(part => part.id === partId);
          break;
        case 'case':
          selectedPart = allParts.cases.find(part => part.id === partId);
          break;
        case 'powerSupply':
          selectedPart = allParts.powerSupplies.find(part => part.id === partId);
          break;
        case 'cooling':
          selectedPart = allParts.coolings.find(part => part.id === partId);
          break;
      }

      // 選択されたパーツを状態に追加
      if (selectedPart) {
        setSelectedParts(prev => ({
          ...prev,
          [category]: selectedPart,
        }));
        
        // 構成データも更新
        setConfigData(prev => ({
          ...prev,
          [`${category}Id`]: partId,
        }));
        
        log.info(`Selected ${category}`, { partId, partName: selectedPart.name });
      }
    }
  };

  // ストレージを追加する処理
  const handleAddStorage = (storageId: string) => {
    const storage = allParts.storages.find(s => s.id === storageId);
    if (!storage) return;

    // 既に選択済みのストレージかチェック
    const isAlreadySelected = selectedParts.storages?.some(s => s.id === storageId);
    if (isAlreadySelected) return;

    setSelectedParts(prev => ({
      ...prev,
      storages: [...(prev.storages || []), storage],
    }));
    
    setConfigData(prev => ({
      ...prev,
      storageIds: [...(prev.storageIds || []), storageId],
    }));
    
    log.info('Added storage', { storageId, storageName: storage.name });
  };

  // 指定インデックスのストレージを削除する処理
  const handleRemoveStorage = (index: number) => {
    setSelectedParts(prev => {
      if (!prev.storages) return prev;
      
      const newStorages = [...prev.storages];
      newStorages.splice(index, 1);
      
      // ストレージがなくなった場合は配列自体を削除
      if (newStorages.length === 0) {
        const newParts = { ...prev };
        delete newParts.storages;
        return newParts;
      }
      
      return {
        ...prev,
        storages: newStorages,
      };
    });
    
    setConfigData(prev => {
      const newStorageIds = [...(prev.storageIds || [])];
      newStorageIds.splice(index, 1);
      
      return {
        ...prev,
        storageIds: newStorageIds,
      };
    });
    
    log.info('Removed storage at index', { index });
  };

  // すべてのストレージを削除する処理
  const handleClearAllStorages = () => {
    setSelectedParts(prev => {
      const newParts = { ...prev };
      delete newParts.storages;
      return newParts;
    });
    
    setConfigData(prev => ({
      ...prev,
      storageIds: [],
    }));
    
    log.info('Cleared all storages');
  };

  return (
    <Layout
      title="PC構成ビルダー | alteePC"
      description="自作PCのパーツ構成を作成し、互換性をチェックできます。"
    >
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">PC構成ビルダー</h1>
            <p className="mt-2 text-lg text-gray-600">
              互換性のあるパーツを選んで、理想のPC構成を作成しましょう
            </p>
          </div>

          {/* 互換性チェック結果 */}
          <CompatibilityChecker parts={selectedParts} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* パーツ選択エリア */}
            <div className="lg:col-span-2 bg-white border rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">パーツを選択</h2>
              
              {/* パーツ選択コンポーネント */}
              {partCategories.map(category => {
                // ストレージ以外のカテゴリを表示
                if (category !== 'storage') {
                  return (
                    <PartSelector
                      key={category}
                      category={category}
                      selectedPartId={configData[`${category}Id`] as string}
                      onSelect={(partId) => handlePartSelect(category, partId)}
                    />
                  );
                }
                return null;
              })}
              
              {/* ストレージ選択（複数可） */}
              <StorageSelector
                selectedStorages={selectedParts.storages || []}
                onAddStorage={handleAddStorage}
                onRemoveStorage={handleRemoveStorage}
                onClearAllStorages={handleClearAllStorages}
              />
            </div>

            {/* サイドバー：価格サマリーと共有機能 */}
            <div className="space-y-6">
              <PriceSummary parts={selectedParts} />
              <ShareConfiguration config={configData} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PCBuilder;
