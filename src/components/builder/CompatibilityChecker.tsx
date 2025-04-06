import React, { useEffect, useState } from 'react';
import { checkCompatibility, CompatibilityResult, PCParts } from '../../utils/compatibilityChecker';
import { log } from '../../utils/logging';

interface CompatibilityCheckerProps {
  parts: PCParts;
}

const CompatibilityChecker: React.FC<CompatibilityCheckerProps> = ({ parts }) => {
  const [compatibilityResult, setCompatibilityResult] = useState<CompatibilityResult>({
    compatible: true,
    issues: [],
  });

  // パーツの変更を監視して互換性チェックを実行
  useEffect(() => {
    // 選択されたパーツが1つもない場合は互換性チェックをスキップ
    const hasAnyPart = Object.values(parts).some(part => part !== undefined);
    
    if (!hasAnyPart) {
      setCompatibilityResult({
        compatible: true,
        issues: [],
      });
      return;
    }
    
    // 互換性チェックを実行
    const result = checkCompatibility(parts);
    setCompatibilityResult(result);
    
    // 互換性の問題をログに記録
    if (result.issues.length > 0) {
      log.info('Compatibility issues detected', { 
        compatible: result.compatible,
        issueCount: result.issues.length,
        issues: result.issues
      });
    }
  }, [parts]);

  // 互換性の問題がない場合
  if (compatibilityResult.issues.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-green-700 font-medium">パーツの互換性に問題はありません</span>
        </div>
        <p className="text-sm text-green-600 mt-1 ml-8">
          選択されたパーツはすべて互換性があります。安心して組み立てることができます。
        </p>
      </div>
    );
  }

  // 互換性の問題がある場合
  return (
    <div className="mb-6">
      <div className={`border rounded-lg p-4 ${compatibilityResult.compatible ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
        <h3 className={`text-lg font-semibold mb-2 ${compatibilityResult.compatible ? 'text-yellow-800' : 'text-red-800'}`}>
          互換性チェック結果
        </h3>
        
        <ul className="space-y-3">
          {compatibilityResult.issues.map((issue, index) => (
            <li key={index} className="flex">
              {issue.type === 'error' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500 mr-2 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0"
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
              )}
              <div>
                <p className={issue.type === 'error' ? 'text-red-700' : 'text-yellow-700'}>
                  {issue.message}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  関連パーツ: {issue.components.map(c => {
                    switch(c) {
                      case 'cpu': return 'CPU';
                      case 'motherboard': return 'マザーボード';
                      case 'ram': return 'メモリ';
                      case 'gpu': return 'グラフィックカード';
                      case 'case': return 'PCケース';
                      case 'powerSupply': return '電源ユニット';
                      case 'cooling': return 'CPUクーラー';
                      case 'storage': return 'ストレージ';
                      default: return c;
                    }
                  }).join(', ')}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompatibilityChecker;
