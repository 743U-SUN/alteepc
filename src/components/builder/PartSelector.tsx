import React, { useState } from 'react';
import Image from 'next/image';
import { partCategoryNames, PartCategory } from '../../types';
import { allParts } from '../../data/dummyData';
import { log } from '../../utils/logging';

interface PartSelectorProps {
  category: PartCategory;
  selectedPartId?: string;
  onSelect: (partId: string | undefined) => void;
  disabled?: boolean;
}

const PartSelector: React.FC<PartSelectorProps> = ({
  category,
  selectedPartId,
  onSelect,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // カテゴリに対応するパーツリストを取得
  const getPartsList = () => {
    switch (category) {
      case 'cpu':
        return allParts.cpus;
      case 'motherboard':
        return allParts.motherboards;
      case 'ram':
        return allParts.rams;
      case 'gpu':
        return allParts.gpus;
      case 'case':
        return allParts.cases;
      case 'powerSupply':
        return allParts.powerSupplies;
      case 'cooling':
        return allParts.coolings;
      case 'storage':
        return allParts.storages;
      default:
        return [];
    }
  };

  // 選択されたパーツの情報を取得
  const getSelectedPart = () => {
    if (!selectedPartId) return null;
    
    const parts = getPartsList();
    return parts.find(part => part.id === selectedPartId) || null;
  };

  const selectedPart = getSelectedPart();

  // パーツを選択する処理
  const handleSelectPart = (partId: string) => {
    onSelect(partId);
    setIsOpen(false);
    log.info(`Selected ${category} part`, { partId });
  };

  // パーツの選択を解除
  const handleClearSelection = () => {
    onSelect(undefined);
    log.info(`Cleared ${category} selection`);
  };

  // モーダル表示を切り替え
  const toggleModal = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      log.debug(`Opened ${category} part selector modal`);
    }
  };

  return (
    <div className={`mb-4 border rounded-lg p-4 ${disabled ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">{partCategoryNames[category]}</h3>
        <button
          onClick={toggleModal}
          className={`px-4 py-1 text-sm rounded ${
            selectedPart ? 'bg-blue-100 text-blue-800' : 'bg-blue-600 text-white'
          } ${disabled ? 'cursor-not-allowed' : 'hover:bg-opacity-90'}`}
          disabled={disabled}
        >
          {selectedPart ? '変更' : '選択'}
        </button>
      </div>

      {selectedPart ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="relative h-16 w-16 min-w-16 mr-4 bg-gray-100 rounded">
            {/* 画像の存在をチェックして表示 */}
            <Image
              src={selectedPart.imageUrl || '/images/placeholder.png'} 
              alt={selectedPart.name}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="flex-grow mt-2 sm:mt-0">
            <p className="font-medium">{selectedPart.name}</p>
            <p className="text-sm text-gray-600">{selectedPart.brand}</p>
            <p className="mt-1 text-sm text-blue-800">
              ¥{selectedPart.price.toLocaleString()}
            </p>
          </div>
          <button
            onClick={handleClearSelection}
            className="text-red-600 text-sm mt-2 sm:mt-0"
            title="選択を解除"
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
      ) : (
        <div className="bg-gray-100 p-4 rounded text-center text-gray-500">
          {partCategoryNames[category]}を選択してください
        </div>
      )}

      {/* パーツ選択モーダル */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
          <div className="relative p-6 bg-white w-full max-w-4xl m-auto rounded-lg max-h-[90vh] overflow-auto">
            {/* モーダルヘッダー */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {partCategoryNames[category]}を選択
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

            {/* パーツリスト */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {getPartsList().map((part) => (
                <div
                  key={part.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${
                    selectedPartId === part.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'hover:border-gray-400'
                  }`}
                  onClick={() => handleSelectPart(part.id)}
                >
                  <div className="flex items-center">
                    <div className="relative h-16 w-16 min-w-16 bg-gray-100 rounded mr-3">
                      <Image
                        src={part.imageUrl || '/images/placeholder.png'}
                        alt={part.name}
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">{part.name}</h3>
                      <p className="text-xs text-gray-600">{part.brand}</p>
                      <p className="text-blue-800 font-medium mt-1">
                        ¥{part.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartSelector;
