import Link from 'next/link';

export default function CPUSelectionPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">CPU選択</h1>
        <Link href="/build" className="btn btn-outline">
          構成に戻る
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">フィルター</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メーカー
            </label>
            <select className="w-full border-gray-300 rounded-md shadow-sm">
              <option value="">すべて</option>
              <option value="intel">Intel</option>
              <option value="amd">AMD</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ソケット
            </label>
            <select className="w-full border-gray-300 rounded-md shadow-sm">
              <option value="">すべて</option>
              <option value="lga1700">LGA 1700</option>
              <option value="lga1200">LGA 1200</option>
              <option value="am5">AM5</option>
              <option value="am4">AM4</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              並び替え
            </label>
            <select className="w-full border-gray-300 rounded-md shadow-sm">
              <option value="price_asc">価格: 安い順</option>
              <option value="price_desc">価格: 高い順</option>
              <option value="performance">性能: 高い順</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500">
          現在実装計画フェーズ1-1の段階で、ダミーデータはまだ実装されていません。<br />
          次のフェーズ1-2でダミーデータが実装される予定です。
        </p>
        <Link href="/build" className="btn btn-primary mt-4">
          PC構成作成に戻る
        </Link>
      </div>
    </div>
  );
}
