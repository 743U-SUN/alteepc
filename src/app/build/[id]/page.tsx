import Link from 'next/link';

// この関数はビルド時に実行され、静的に生成されるパスのリストを返します
export function generateStaticParams() {
  // ダミーデータの実装フェーズでは空の配列を返す
  return [];
}

type Props = {
  params: { id: string };
};

export default function SharedBuildPage({ params }: Props) {
  // 共有された構成のIDを取得
  const { id } = params;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">共有されたPC構成</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">構成ID: {id}</h2>
        <div className="p-3 bg-gray-50 rounded border border-gray-200">
          <p>この構成はURLで共有されています。構成IDを使用して、この構成を共有できます。</p>
          <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
            https://alteepc.jp/build/{id}
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">選択されたパーツ</h2>
            <p className="text-gray-500">
              現在開発中のため、ダミーデータは実装されていません。
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">互換性ステータス</h2>
            <p className="text-gray-500">
              現在開発中のため、互換性チェック機能は実装されていません。
            </p>
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
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <Link href="/build" className="btn btn-primary w-full block text-center">
              この構成をベースに新しく作成
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
