'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBuild } from '@/context/build-context';
import BuildSummary from '@/components/parts/build-summary';
import Button from '@/components/ui/button';
import CompatibilityWarning from '@/components/parts/compatibility-warning';
import { cpus } from '@/lib/data/cpus';
import { motherboards } from '@/lib/data/motherboards';

export default function BuildPage() {
  const { currentBuild, resetBuild } = useBuild();
  const router = useRouter();
  const [compatibilityIssues, setCompatibilityIssues] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  
  // CPU とマザーボードの互換性チェック
  useEffect(() => {
    const issues = [];
    
    // CPU とマザーボードが両方選択されている場合
    if (currentBuild.components.cpu && currentBuild.components.motherboard) {
      const cpu = cpus.find(c => c.id === currentBuild.components.cpu);
      const motherboard = motherboards.find(m => m.id === currentBuild.components.motherboard);
      
      if (cpu && motherboard) {
        // ソケットの一致をチェック
        if (cpu.socket !== motherboard.socket) {
          issues.push({
            type: 'ソケット不一致',
            severity: 'critical',
            message: `CPUソケット(${cpu.socket})とマザーボードソケット(${motherboard.socket})が一致しません。`,
            components: ['cpu', 'motherboard']
          });
        }
        
        // メモリタイプの互換性をチェック
        const hasCommonMemoryType = cpu.supportedMemoryType.some(type => 
          motherboard.memoryType.includes(type)
        );
        
        if (!hasCommonMemoryType) {
          issues.push({
            type: 'メモリタイプ不一致',
            severity: 'critical',
            message: `CPUがサポートするメモリタイプ(${cpu.supportedMemoryType.join(', ')})とマザーボードがサポートするメモリタイプ(${motherboard.memoryType.join(', ')})に互換性がありません。`,
            components: ['cpu', 'motherboard']
          });
        }
      }
    }
    
    setCompatibilityIssues(issues);
  }, [currentBuild.components.cpu, currentBuild.components.motherboard]);
  
  // PC構成を保存して共有URLを生成する関数
  const saveBuild = async () => {
    try {
      setIsSaving(true);
      
      const response = await fetch('/api/builds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          components: currentBuild.components,
          name: 'My PC Build' // オプションでユーザーが名前をつけられるようにできる
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save build');
      }
      
      const data = await response.json();
      
      // 共有URLを設定
      setShareUrl(`${window.location.origin}${data.url}`);
      setShowShareModal(true);
    } catch (error) {
      console.error('Error saving build:', error);
      alert('構成の保存中にエラーが発生しました。');
    } finally {
      setIsSaving(false);
    }
  };
  
  // URLをクリップボードにコピーする関数
  const [isCopied, setIsCopied] = useState(false);
  
  const copyToClipboard = async () => {
    if (!shareUrl) return;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      // 3秒後に元の状態に戻す
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('URLのコピーに失敗しました。');
    }
  };
  
  // パーツのカウント
  const selectedPartsCount = Object.values(currentBuild.components).filter(value => value !== null).length;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">PC構成作成</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* メインパーツ選択エリア */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">パーツ選択</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CPU */}
              <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">CPU</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-primary text-white">必須</span>
                </div>
                
                {currentBuild.components.cpu ? (
                  <div>
                    <div className="text-sm">
                      {cpus.find(cpu => cpu.id === currentBuild.components.cpu)?.manufacturer} {' '}
                      {cpus.find(cpu => cpu.id === currentBuild.components.cpu)?.model}
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button variant="primary" size="sm">
                        <Link href="/parts/cpu" className="text-white">変更</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">プロセッサを選択してください</p>
                    <Button variant="primary" size="sm">
                      <Link href="/parts/cpu" className="text-white">選択</Link>
                    </Button>
                  </div>
                )}
              </div>
              
              {/* マザーボード */}
              <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">マザーボード</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-primary text-white">必須</span>
                </div>
                
                {currentBuild.components.motherboard ? (
                  <div>
                    <div className="text-sm">
                      {motherboards.find(mb => mb.id === currentBuild.components.motherboard)?.manufacturer} {' '}
                      {motherboards.find(mb => mb.id === currentBuild.components.motherboard)?.model}
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button variant="primary" size="sm">
                        <Link href="/parts/motherboard" className="text-white">変更</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">マザーボードを選択してください</p>
                    <Button variant="primary" size="sm">
                      <Link href="/parts/motherboard" className="text-white">選択</Link>
                    </Button>
                  </div>
                )}
              </div>
              
              {/* 他のパーツも同様に追加（将来的な実装） */}
            </div>
          </div>
          
          {/* 互換性警告 */}
          {compatibilityIssues.length > 0 && (
            <div className="mb-6">
              <CompatibilityWarning issues={compatibilityIssues} />
            </div>
          )}
          
          {/* 構成の保存・共有 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">構成の保存・共有</h2>
            <p className="text-sm text-gray-500 mb-4">
              構成を保存して、URLを共有できます
            </p>
            <Button 
              variant="primary" 
              disabled={selectedPartsCount < 2 || isSaving}
              className="w-full"
              onClick={saveBuild}
            >
              {isSaving ? '保存中...' : '構成を保存して共有'}
            </Button>
            
            <div className="mt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={resetBuild}
              >
                構成をリセット
              </Button>
            </div>
          </div>
        </div>
        
        {/* サイドバー（構成サマリー） */}
        <div className="lg:col-span-1">
          <BuildSummary />
        </div>
      </div>
      
      {/* 共有モーダル */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">構成URLが生成されました</h3>
            <p className="mb-4">以下のURLを使用して、この構成を共有できます：</p>
            
            <div className="flex items-center mb-4">
              <input
                type="text"
                readOnly
                value={shareUrl || ''}
                className="flex-grow p-2 border rounded-l-md"
              />
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-r-md ${isCopied ? 'bg-green-500' : 'bg-primary'} text-white transition-colors duration-300`}
                disabled={isCopied}
              >
                {isCopied ? 'コピーしました' : 'コピー'}
              </button>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  if (shareUrl) {
                    // URLから/build/以降を取得
                    const buildId = shareUrl.split('/build/')[1];
                    if (buildId) {
                      router.push(`/build/${buildId}`);
                    }
                  }
                }}
              >
                この構成を表示
              </Button>
              <Button variant="primary" onClick={() => setShowShareModal(false)}>
                閉じる
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
