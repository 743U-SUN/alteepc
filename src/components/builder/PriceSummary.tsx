import React from 'react';
import { calculateTotalPrice, calculateTotalPower, PCParts } from '../../utils/compatibilityChecker';
import { partCategoryNames } from '../../types';

interface PriceSummaryProps {
  parts: PCParts;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ parts }) => {
  const totalPrice = calculateTotalPrice(parts);
  const totalPower = calculateTotalPower(parts);
  
  // 選択されたパーツの価格リストを生成
  const partPrices = Object.entries(parts)
    .filter(([key, value]) => value !== undefined && key !== 'storages')
    .map(([key, value]) => ({
      category: key as keyof PCParts,
      name: value?.name || '',
      price: value?.price || 0,
    }));
  
  // ストレージは別処理（複数選択可能）
  const storagePrices = parts.storages
    ? parts.storages.map(storage => ({
        category: 'storage' as keyof PCParts,
        name: storage.name,
        price: storage.price,
      }))
    : [];
  
  // すべてのパーツ価格をマージ
  const allPartPrices = [...partPrices, ...storagePrices];
  
  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-4">価格＆消費電力サマリー</h3>
      
      {/* 合計価格の表示 */}
      <div className="flex justify-between items-center p-3 mb-4 bg-blue-50 rounded-lg">
        <span className="font-semibold">合計金額：</span>
        <span className="text-xl font-bold text-blue-800">¥{totalPrice.toLocaleString()}</span>
      </div>
      
      {/* 消費電力の表示 */}
      <div className="flex justify-between items-center p-3 mb-6 bg-gray-50 rounded-lg">
        <span className="font-semibold">推定消費電力：</span>
        <span className="text-lg font-bold text-gray-700">{totalPower} W</span>
      </div>
      
      {/* 各パーツの価格内訳 */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-2 pb-2 border-b">内訳</h4>
        <ul className="space-y-2">
          {allPartPrices.length > 0 ? (
            allPartPrices.map((item, index) => (
              <li key={index} className="flex justify-between py-1 border-b border-dashed border-gray-200">
                <div className="text-gray-600">
                  <span>{partCategoryNames[item.category]}: </span>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="font-medium">¥{item.price.toLocaleString()}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-center py-4">パーツが選択されていません</li>
          )}
        </ul>
      </div>
      
      {/* 税金の案内 */}
      <div className="mt-6 text-sm text-gray-500">
        <p>※ 表示価格は全て税込み価格です</p>
        <p>※ 実際の価格は販売店によって異なる場合があります</p>
      </div>
    </div>
  );
};

export default PriceSummary;
