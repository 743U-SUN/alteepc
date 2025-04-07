import Link from 'next/link';

export default function BuildPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">PC構成作成</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">互換性ステータス</h2>
        <div className="p-3 bg-gray-50 rounded border border-gray-200 text-gray-500">
          パーツを選択して互換性をチェックしましょう
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">パーツ選択</h2>
            
            <div className="space-y-4">
              <PartSelectRow title="CPU" path="/parts/cpu" />
              <PartSelectRow title="マザーボード" path="/parts/motherboard" />
              <PartSelectRow title="メモリー" path="/parts/memory" />
              <PartSelectRow title="グラフィックカード" path="/parts/gpu" />
              <PartSelectRow title="ストレージ" path="/parts/storage" />
              <PartSelectRow title="電源ユニット" path="/parts/psu" />
              <PartSelectRow title="PCケース" path="/parts/case" />
              <PartSelectRow title="CPUクーラー" path="/parts/cooler" />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">価格サマリー</h2>
            <div className="border-t border-b py-3 my-3">
              <div className="flex justify-between text-lg font-medium">
                <span>合計金額</span>
                <span>¥0</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="btn btn-primary w-full" disabled>
                URL発行して共有
              </button>
              <p className="text-sm text-gray-500 text-center mt-2">
                パーツを選択するとURLで構成を共有できます
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PartSelectRow({ title, path }: { title: string; path: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b">
      <span className="font-medium">{title}</span>
      <div className="flex items-center space-x-2">
        <span className="text-gray-500 text-sm">未選択</span>
        <Link href={path} className="btn btn-outline text-sm">
          選択
        </Link>
      </div>
    </div>
  );
}
