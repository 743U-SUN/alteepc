import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">alteePC</h1>
        <p className="text-xl mb-8">自作PC初心者向けパーツ互換性チェック＆見積もりサイト</p>
        <Link 
          href="/build" 
          className="btn btn-primary text-lg px-8 py-3"
        >
          PC構成作成を開始
        </Link>
      </div>

      <div className="max-w-4xl w-full mt-12">
        <h2 className="text-2xl font-semibold mb-6">主な機能</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-xl font-medium mb-3">互換性チェック</h3>
            <p className="text-gray-600">
              PCパーツ間の互換性を自動的にチェックし、問題があれば警告を表示します。
            </p>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-medium mb-3">簡易見積もり</h3>
            <p className="text-gray-600">
              選択したパーツの合計金額をリアルタイムで表示します。
            </p>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-medium mb-3">URL発行機能</h3>
            <p className="text-gray-600">
              アカウント登録不要でPC構成を共有できる短いURLを発行します。
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-lg">
          初めての自作PCでも安心して構成を検討できます。
        </p>
      </div>
    </div>
  );
}
