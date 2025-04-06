import React, { useState } from 'react';
import { saveConfiguration, getConfigurationShareUrl } from '../../utils/urlManager';
import { ConfigurationData } from '../../utils/urlManager';
import { log } from '../../utils/logging';

interface ShareConfigurationProps {
  config: ConfigurationData;
}

const ShareConfiguration: React.FC<ShareConfigurationProps> = ({ config }) => {
  const [shareUrl, setShareUrl] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 構成を保存してシェアURLを生成
  const handleGenerateShareUrl = () => {
    setIsLoading(true);

    try {
      // パーツが選択されているか確認
      const hasSelectedParts = Object.values(config).some(
        value => value !== undefined && (Array.isArray(value) ? value.length > 0 : true)
      );

      if (!hasSelectedParts) {
        alert('少なくとも1つのパーツを選択してください。');
        setIsLoading(false);
        log.warn('Attempted to share configuration with no selected parts');
        return;
      }

      // 構成を保存してIDを取得
      const configId = saveConfiguration(config);
      
      if (!configId) {
        throw new Error('構成の保存に失敗しました。');
      }

      // 共有URLを生成
      const url = getConfigurationShareUrl(configId);
      setShareUrl(url);
      setIsCopied(false);
      
      log.info('Generated share URL', { configId });
    } catch (error) {
      alert('共有URLの生成に失敗しました。もう一度お試しください。');
      log.error(`Failed to generate share URL: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // URLをクリップボードにコピー
  const handleCopyUrl = () => {
    if (!shareUrl) return;

    try {
      navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      log.info('Copied share URL to clipboard');
      
      // 3秒後にコピー状態をリセット
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (error) {
      alert('URLのコピーに失敗しました。もう一度お試しください。');
      log.error(`Failed to copy URL to clipboard: ${error}`);
    }
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-4">構成を共有</h3>
      
      <p className="text-gray-600 mb-4">
        あなたのPC構成を友人や技術者と共有して、アドバイスをもらいましょう。
        アカウント登録不要で、この構成へのリンクが生成されます。
      </p>
      
      <button
        onClick={handleGenerateShareUrl}
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-lg font-medium ${
          isLoading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        } transition-colors flex items-center justify-center`}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            処理中...
          </>
        ) : (
          '共有URLを生成'
        )}
      </button>
      
      {shareUrl && (
        <div className="mt-4">
          <div className="flex items-center">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
            <button
              onClick={handleCopyUrl}
              className={`px-4 py-2 rounded-r-lg ${
                isCopied
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isCopied ? 'コピー済み' : 'コピー'}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            この共有リンクは、最終アクセスから90日間有効です。
          </p>
        </div>
      )}
      
      <div className="mt-6 bg-blue-50 p-4 rounded-lg text-sm">
        <h4 className="font-semibold text-blue-800 mb-1">共有ポリシー:</h4>
        <ul className="text-blue-700 space-y-1 ml-4 list-disc">
          <li>アカウント登録なしでPC構成を共有できます</li>
          <li>共有URLから誰でも構成にアクセスできます</li>
          <li>最後にアクセスされてから90日後に構成は自動削除されます</li>
          <li>個人情報は一切保存されません</li>
        </ul>
      </div>
    </div>
  );
};

export default ShareConfiguration;
