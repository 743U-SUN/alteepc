'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ServicePCBuild } from '@/types/service';
import CompatibilityWarning from '@/components/parts/compatibility-warning';
import Button from '@/components/ui/button';
import { cpus } from '@/lib/data/cpus';
import { motherboards } from '@/lib/data/motherboards';

type Props = {
  params: { id: string };
};

export default function SharedBuildPage({ params }: Props) {
  const { id } = params;
  const router = useRouter();
  const [build, setBuild] = useState<ServicePCBuild | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuild = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/builds/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('構成が見つかりませんでした。URLを確認してください。');
          }
          throw new Error('構成の読み込み中にエラーが発生しました。');
        }
        
        const data = await response.json();
        setBuild(data);
      } catch (error) {
        console.error('Error fetching build:', error);
        setError(error instanceof Error ? error.message : '未知のエラーが発生しました');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBuild();
  }, [id]);

  // URLをクリップボードにコピーする関数
  const [isCopied, setIsCopied] = useState(false);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      // 3秒後に元の状態に戻す
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('URLのコピーに失敗しました。');
    }
  };

  // ローディング表示
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-lg">構成データを読み込み中...</p>
        </div>
      </div>
    );
  }

  // エラー表示
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4">エラー</h1>
          <p>{error}</p>
          <div className="mt-6">
            <Link href="/build" className="text-primary hover:underline">
              PCビルドページに戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // データがない場合
  if (!build) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">構成が見つかりません</h1>
          <p>指定されたIDの構成は存在しないか、期限切れになっている可能性があります。</p>
          <div className="mt-6">
            <Link href="/build" className="text-primary hover:underline">
              新しい構成を作成する
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // CPU情報を取得
  const cpu = build.components.cpu ? cpus.find(c => c.id === build.components.cpu) : null;
  // マザーボード情報を取得
  const motherboard = build.components.motherboard ? motherboards.find(m => m.id === build.components.motherboard) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">共有されたPC構成</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-wrap justify-between items-center">
          <h2 className="text-xl font-semibold mb-2 md:mb-0">構成ID: {id}</h2>
          <div>
            <Button 
              variant={isCopied ? "success" : "outline"} 
              size="sm" 
              onClick={copyToClipboard}
              disabled={isCopied}
            >
              {isCopied ? 'コピーしました' : 'URLをコピー'}
            </Button>
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded border border-gray-200 mt-4">
          <p>この構成はURLで共有されています。以下のURLを使用して、この構成を共有できます。</p>
          <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-sm break-all">
            {typeof window !== 'undefined' ? window.location.href : `https://alteepc.jp/build/${id}`}
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          <p>作成日時: {build.createdAt.toString()}</p>
          <p>アクセス回数: {build.accessCount}回</p>
          <p>有効期限: {build.expiresAt.toString()}</p>
        </div>
      </div>
      
      {/* 互換性警告の表示 */}
      {build.compatibilityIssues.length > 0 && (
        <div className="mb-6">
          <CompatibilityWarning issues={build.compatibilityIssues} />
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">選択されたパーツ</h2>
            
            {/* CPUの表示 */}
            {cpu && (
              <div className="mb-4 p-3 border rounded">
                <h3 className="font-medium">CPU</h3>
                <p>{cpu.manufacturer} {cpu.model}</p>
                <p className="text-sm text-gray-600">ソケット: {cpu.socket}</p>
                <p className="text-sm text-gray-600">コア数: {cpu.cores} / スレッド数: {cpu.threads}</p>
                <p className="text-sm text-gray-600">価格: ¥{cpu.price.toLocaleString()}</p>
              </div>
            )}
            
            {/* マザーボードの表示 */}
            {motherboard && (
              <div className="mb-4 p-3 border rounded">
                <h3 className="font-medium">マザーボード</h3>
                <p>{motherboard.manufacturer} {motherboard.model}</p>
                <p className="text-sm text-gray-600">ソケット: {motherboard.socket}</p>
                <p className="text-sm text-gray-600">フォームファクター: {motherboard.formFactor}</p>
                <p className="text-sm text-gray-600">価格: ¥{motherboard.price.toLocaleString()}</p>
              </div>
            )}
            
            {/* 他のパーツも同様に表示（将来的な実装） */}
            
            {!cpu && !motherboard && (
              <p className="text-gray-500">選択されたパーツはありません。</p>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">価格サマリー</h2>
            <div className="border-t border-b py-3 my-3">
              <div className="flex justify-between text-lg font-medium">
                <span>合計金額</span>
                <span>¥{build.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <Link 
              href="/build"
              className="bg-primary text-white py-2 px-4 rounded w-full block text-center"
            >
              この構成をベースに新しく作成
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}