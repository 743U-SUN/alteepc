import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { getStoredConfiguration, ConfigurationData } from '../../utils/urlManager';
import { allParts } from '../../data/dummyData';
import { PCParts } from '../../utils/compatibilityChecker';
import CompatibilityChecker from '../../components/builder/CompatibilityChecker';
import PriceSummary from '../../components/builder/PriceSummary';
import Link from 'next/link';
import { log } from '../../utils/logging';

const ConfigurationPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [configData, setConfigData] = useState<ConfigurationData | null>(null);
  const [selectedParts, setSelectedParts] = useState<PCParts>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    try {
      // クライアントサイドでのみ実行
      if (typeof window !== 'undefined') {
        const storedConfig = getStoredConfiguration(id);
        
        if (!storedConfig) {
          setError('指定された構成が見つかりませんでした。URLが正しいか、期限切れでないか確認してください。');
          log.warn(`Configuration not found: ${id}`);
        } else {
          setConfigData(storedConfig);
          
          // 構成IDからパーツオブジェクトを取得
          const parts: PCParts = {};
          
          if (storedConfig.cpuId) {
            parts.cpu = allParts.cpus.find(part => part.id === storedConfig.cpuId);
          }
          
          if (storedConfig.motherboardId) {
            parts.motherboard = allParts.motherboards.find(part => part.id === storedConfig.motherboardId);
          }
          
          if (storedConfig.ramId) {
            parts.ram = allParts.rams.find(part => part.id === storedConfig.ramId);
          }
          
          if (storedConfig.gpuId) {
            parts.gpu = allParts.gpus.find(part => part.id === storedConfig.gpuId);
          }
          
          if (storedConfig.caseId) {
            parts.case = allParts.cases.find(part => part.id === storedConfig.caseId);
          }
          
          if (storedConfig.powerSupplyId) {
            parts.powerSupply = allParts.powerSupplies.find(part => part.id === storedConfig.powerSupplyId);
          }
          
          if (storedConfig.coolingId) {
            parts.cooling = allParts.coolings.find(part => part.id === storedConfig.coolingId);
          }
          
          if (storedConfig.storageIds && storedConfig.storageIds.length > 0) {
            parts.storages = storedConfig.storageIds
              .map(storageId => allParts.storages.find(part => part.id === storageId))
              .filter(Boolean);
          }
          
          setSelectedParts(parts);
          log.info(`Loaded configuration: ${id}`);
        }
        
        setLoading(false);
      }
    } catch (err) {
      log.error(`Error loading configuration: ${err}`, { id });
      setError('構成の読み込み中にエラーが発生しました。');
      setLoading(false);
    }
  }, [id]);

  // ローディング状態の表示
  if (loading) {
    return (
      <Layout title="構成の読み込み中... | alteePC">
        <div className="min-h-screen flex justify-center items-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <h1 className="text-2xl font-semibold">構成を読み込んでいます...</h1>
          </div>
        </div>
      </Layout>
    );
  }

  // エラー状態の表示
  if (error) {
    return (
      <Layout title="構成が見つかりません | alteePC">
        <div className="min-h-[80vh] flex justify-center items-center">
          <div className="text-center max-w-lg p-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">構成が見つかりません</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link 
              href="/builder"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg"
            >
              新しい構成を作成する
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // 構成データがある場合の表示
  return (
    <Layout
      title="共有されたPC構成 | alteePC"
      description="共有されたPC構成の詳細と互換性チェック結果を確認できます。"
    >
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">共有されたPC構成</h1>
            <p className="mt-2 text-lg text-gray-600">
              この構成の互換性と価格情報を確認できます
            </p>
          </div>

          {/* コピー用のURL表示 */}
          <div className="bg-white border rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex-grow mb-3 sm:mb-0">
              <p className="text-sm text-gray-500 mb-1">共有URL:</p>
              <input
                type="text"
                readOnly
                value={typeof window !== 'undefined' ? window.location.href : ''}
                className="w-full bg-gray-50 border rounded px-3 py-2 text-gray-700 text-sm"
              />
            </div>
            <Link
              href="/builder"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
            >
              この構成を編集する
            </Link>
          </div>

          {/* 互換性チェック結果 */}
          <CompatibilityChecker parts={selectedParts} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* パーツ一覧エリア */}
            <div className="lg:col-span-2 bg-white border rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">選択されたパーツ</h2>
              
              {/* CPU */}
              {selectedParts.cpu && (
                <div className="border-b py-4">
                  <h3 className="font-semibold text-gray-800 mb-2">CPU</h3>
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gray-100 rounded mr-4 relative">
                      <img
                        src={selectedParts.cpu.imageUrl || '/images/placeholder.png'}
                        alt={selectedParts.cpu.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{selectedParts.cpu.name}</p>
                      <p className="text-sm text-gray-600">{selectedParts.cpu.brand}</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {selectedParts.cpu.cores}コア/{selectedParts.cpu.threads}スレッド
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {selectedParts.cpu.baseClock}GHz - {selectedParts.cpu.boostClock}GHz
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {selectedParts.cpu.socket}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          TDP: {selectedParts.cpu.tdp}W
                        </span>
                      </div>
                      <p className="mt-2 text-blue-800 font-medium">
                        ¥{selectedParts.cpu.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* マザーボード */}
              {selectedParts.motherboard && (
                <div className="border-b py-4">
                  <h3 className="font-semibold text-gray-800 mb-2">マザーボード</h3>
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gray-100 rounded mr-4 relative">
                      <img
                        src={selectedParts.motherboard.imageUrl || '/images/placeholder.png'}
                        alt={selectedParts.motherboard.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{selectedParts.motherboard.name}</p>
                      <p className="text-sm text-gray-600">{selectedParts.motherboard.brand}</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {selectedParts.motherboard.chipset}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {selectedParts.motherboard.socket}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {selectedParts.motherboard.formFactor}
                        </span>
                      </div>
                      <p className="mt-2 text-blue-800 font-medium">
                        ¥{selectedParts.motherboard.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* メモリ */}
              {selectedParts.ram && (
                <div className="border-b py-4">
                  <h3 className="font-semibold text-gray-800 mb-2">メモリ</h3>
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gray-100 rounded mr-4 relative">
                      <img
                        src={selectedParts.ram.imageUrl || '/images/placeholder.png'}
                        alt={selectedParts.ram.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{selectedParts.ram.name}</p>
                      <p className="text-sm text-gray-600">{selectedParts.ram.brand}</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {selectedParts.ram.capacity}GB ({selectedParts.ram.modules}x{selectedParts.ram.capacity / selectedParts.ram.modules}GB)
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {selectedParts.ram.type}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {selectedParts.ram.speed}MHz
                        </span>
                      </div>
                      <p className="mt-2 text-blue-800 font-medium">
                        ¥{selectedParts.ram.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* グラフィックカード */}
              {selectedParts.gpu && (
                <div className="border-b py-4">
                  <h3 className="font-semibold text-gray-800 mb-2">グラフィックカード</h3>
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gray-100 rounded mr-4 relative">
                      <img
                        src={selectedParts.gpu.imageUrl || '/images/placeholder.png'}
                        alt={selectedParts.gpu.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{selectedParts.gpu.name}</p>
                      <p className="text-sm text-gray-600">{selectedParts.gpu.brand}</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {selectedParts.gpu.vram}GB VRAM
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          長さ: {selectedParts.gpu.length}mm
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          TDP: {selectedParts.gpu.tdp}W
                        </span>
                      </div>
                      <p className="mt-2 text-blue-800 font-medium">
                        ¥{selectedParts.gpu.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* PCケース */}
              {selectedParts.case && (
                <div className="border-b py-4">
                  <h3 className="font-semibold text-gray-800 mb-2">PCケース</h3>
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gray-100 rounded mr-4 relative">
                      <img
                        src={selectedParts.case.imageUrl || '/images/placeholder.png'}
                        alt={selectedParts.case.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{selectedParts.case.name}</p>
                      <p className="text-sm text-gray-600">{selectedParts.case.brand}</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {selectedParts.case.type}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          最大GPU長: {selectedParts.case.maxGPULength}mm
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          最大クーラー高: {selectedParts.case.maxCoolerHeight}mm
                        </span>
                      </div>
                      <p className="mt-2 text-blue-800 font-medium">
                        ¥{selectedParts.case.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 電源ユニット */}
              {selectedParts.powerSupply && (
                <div className="border-b py-4">
                  <h3 className="font-semibold text-gray-800 mb-2">電源ユニット</h3>
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gray-100 rounded mr-4 relative">
                      <img
                        src={selectedParts.powerSupply.imageUrl || '/images/placeholder.png'}
                        alt={selectedParts.powerSupply.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{selectedParts.powerSupply.name}</p>
                      <p className="text-sm text-gray-600">{selectedParts.powerSupply.brand}</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {selectedParts.powerSupply.wattage}W
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {selectedParts.powerSupply.efficiency}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {selectedParts.powerSupply.modular}モジュラー
                        </span>
                      </div>
                      <p className="mt-2 text-blue-800 font-medium">
                        ¥{selectedParts.powerSupply.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* CPUクーラー */}
              {selectedParts.cooling && (
                <div className="border-b py-4">
                  <h3 className="font-semibold text-gray-800 mb-2">CPUクーラー</h3>
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gray-100 rounded mr-4 relative">
                      <img
                        src={selectedParts.cooling.imageUrl || '/images/placeholder.png'}
                        alt={selectedParts.cooling.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{selectedParts.cooling.name}</p>
                      <p className="text-sm text-gray-600">{selectedParts.cooling.brand}</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {selectedParts.cooling.type}クーラー
                        </span>
                        {selectedParts.cooling.type === 'Air' && selectedParts.cooling.height && (
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            高さ: {selectedParts.cooling.height}mm
                          </span>
                        )}
                        {selectedParts.cooling.type === 'Liquid' && selectedParts.cooling.radiatorSize && (
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            ラジエーター: {selectedParts.cooling.radiatorSize}
                          </span>
                        )}
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          TDP: {selectedParts.cooling.tdp}W
                        </span>
                      </div>
                      <p className="mt-2 text-blue-800 font-medium">
                        ¥{selectedParts.cooling.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ストレージ */}
              {selectedParts.storages && selectedParts.storages.length > 0 && (
                <div className="py-4">
                  <h3 className="font-semibold text-gray-800 mb-2">ストレージ</h3>
                  {selectedParts.storages.map((storage, index) => (
                    <div key={index} className={index !== 0 ? 'mt-4 pt-4 border-t' : ''}>
                      <div className="flex items-start">
                        <div className="w-16 h-16 bg-gray-100 rounded mr-4 relative">
                          <img
                            src={storage.imageUrl || '/images/placeholder.png'}
                            alt={storage.name}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{storage.name}</p>
                          <p className="text-sm text-gray-600">{storage.brand}</p>
                          <div className="mt-1 flex flex-wrap gap-2">
                            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              {storage.capacity}GB {storage.type}
                            </span>
                            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              読取: {storage.readSpeed}MB/s
                            </span>
                            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              書込: {storage.writeSpeed}MB/s
                            </span>
                            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              {storage.interface}
                            </span>
                          </div>
                          <p className="mt-2 text-blue-800 font-medium">
                            ¥{storage.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 選択されたパーツがない場合 */}
              {Object.keys(selectedParts).length === 0 && (
                <div className="bg-gray-100 p-8 rounded-lg text-center">
                  <p className="text-gray-500">パーツが選択されていません</p>
                </div>
              )}
            </div>

            {/* サイドバー：価格サマリー */}
            <div>
              <PriceSummary parts={selectedParts} />
              
              {/* 編集ボタン */}
              <div className="mt-6 bg-white border rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">この構成を編集</h3>
                <p className="text-gray-600 mb-4">
                  この構成を元に、新しいPC構成を作成できます。
                </p>
                <Link
                  href="/builder"
                  className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center"
                >
                  ビルダーで編集する
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConfigurationPage;
