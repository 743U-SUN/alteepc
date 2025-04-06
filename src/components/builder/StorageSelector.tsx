import React, { useState } from 'react';
import Image from 'next/image';
import { partCategoryNames } from '../../types';
import { allParts, Storage } from '../../data/dummyData';
import { log } from '../../utils/logging';

interface StorageSelectorProps {
  selectedStorages: Storage[];
  onAddStorage: (storageId: string) => void;
  onRemoveStorage: (index: number) => void;
  onClearAllStorages: () => void;
}

const StorageSelector: React.FC<StorageSelectorProps> = ({
  selectedStorages,
  onAddStorage,
  onRemoveStorage,
  onClearAllStorages,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // モーダル表示を切り替え
  const toggleModal = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      log.debug('Opened storage selector modal');
    }
  };

  // ストレージを選択する処理
  const handleSelectStorage = (storageId: string) => {
    onAddStorage(storageId);
    setIsOpen(false);
    log.info('Added storage', { storageId });
  };

  return (
    <div className="mt-6 border rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">{partCategoryNames.storage}</h3>
        <div className="flex space-x-2">
          <button
            onClick={toggleModal}
            className="px-4 py-1 text-sm rounded bg-blue-600 text-white hover:bg-opacity-90"
          >
            ストレージを追加
          </button>
          <button
            onClick={onClearAllStorages}
            className="px-4 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50"
            disabled={selectedStorages.length === 0}
          >
            すべて削除
          </button>
        </div>
      </div>

      {/* 選択済みのストレージを表示 */}
      {selectedStorages.length > 0 ? (
        <div className="space-y-3 mb-2">
          {selectedStorages.map((storage, index) => (
            <div key={index} className="flex items-center bg-gray-50 p-3 rounded">
              <div className="relative h-16 w-16 min-w-16 mr-3 bg-gray-100 rounded">
                <Image
                  src={storage.imageUrl || '/images/placeholder.png'}
                  alt={storage.name}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="flex-grow">
                <p className="font-medium">{storage.name}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {storage.capacity}GB
                  </span>
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {storage.type}
                  </span>
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    読取: {storage.readSpeed}MB/s
                  </span>
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    書込: {storage.writeSpeed}MB/s
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <p className="text-blue-800 font-medium">
                  ¥{storage.price.toLocaleString()}
                </p>
                <button
                  onClick={() => onRemoveStorage(index)}
                  className="text-red-600 text-sm hover:text-red-800"
                  title="削除"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded text-center text-gray-500 mb-2">
          ストレージが選択されていません
        </div>
      )}

      {/* パーツ選択モーダル */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
          <div className="relative p-6 bg-white w-full max-w-4xl m-auto rounded-lg max-h-[90vh] overflow-auto">
            {/* モーダルヘッダー */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                ストレージを追加
              </h2>
              <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* ストレージタイプのタブ */}
            <div className="mb-6">
              <div className="flex border-b">
                <button
                  className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium"
                >
                  すべてのストレージ
                </button>
              </div>
            </div>

            {/* パーツリスト */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allParts.storages.map((storage) => {
                // 既に選択済みかチェック
                const isAlreadySelected = selectedStorages.some(
                  selected => selected.id === storage.id
                );

                return (
                  <div
                    key={storage.id}
                    className={`border rounded-lg p-3 transition-all ${
                      isAlreadySelected
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer hover:border-gray-400'
                    }`}
                    onClick={() => !isAlreadySelected && handleSelectStorage(storage.id)}
                  >
                    <div className="flex items-center">
                      <div className="relative h-16 w-16 min-w-16 bg-gray-100 rounded mr-3">
                        <Image
                          src={storage.imageUrl || '/images/placeholder.png'}
                          alt={storage.name}
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm mb-1">{storage.name}</h3>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">{storage.capacity}GB {storage.type}</p>
                          <p className="text-xs text-gray-600">{storage.interface}</p>
                        </div>
                        <p className="text-blue-800 font-medium mt-1">
                          ¥{storage.price.toLocaleString()}
                        </p>
                        {isAlreadySelected && (
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded mt-1">
                            選択済み
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={toggleModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorageSelector;
