import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import { log } from '../utils/logging';

const Guide: React.FC = () => {
  useEffect(() => {
    log.info('Guide page accessed');
  }, []);

  const guideItems = [
    {
      title: 'CPUについて',
      content: 'CPUはコンピュータの頭脳です。ゲームを主に使用する場合はIntelのCore i5/i7またはAMDのRyzen 5/7シリーズがおすすめです。ソケットタイプと世代に注意しましょう。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
    },
    {
      title: 'マザーボードについて',
      content: 'マザーボードはPCの全コンポーネントを接続する基盤です。CPUソケットタイプ、フォームファクター（ATX、Micro-ATX、Mini-ITX）、拡張スロット数に注目しましょう。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: 'メモリ(RAM)について',
      content: 'RAMは一時的なデータを保存します。最低16GB推奨。DDR4かDDR5か、マザーボードに対応したタイプを選びましょう。動作周波数も重要です。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: 'グラフィックカード(GPU)について',
      content: 'GPUは画像処理を担当します。ゲームやクリエイティブ作業に重要。使用目的に合わせた性能のものを選びましょう。サイズと消費電力も要チェックです。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'ストレージについて',
      content: 'データを永続的に保存します。SSDはHDDより高速で、OSとアプリケーションにはSSDを強く推奨。大容量データ保存用に追加のHDDも検討されるといいでしょう。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
    },
    {
      title: '電源ユニット(PSU)について',
      content: 'すべてのパーツに電力を供給します。総消費電力より少し高めのワット数のものを選びましょう。80PLUS認証で効率の良いものがおすすめです。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'PCケースについて',
      content: 'パーツをすべて収めるケース。マザーボードのフォームファクターに対応したサイズ、冷却性能、GPUの長さやCPUクーラーの高さが収まるかをチェックしましょう。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: 'CPUクーラーについて',
      content: 'CPUの熱を逃がす重要パーツ。空冷式と水冷式があります。CPUのTDP値に対応したものを選びましょう。ケースに収まる高さかもチェックが必要です。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
  ];

  const assemblySteps = [
    {
      title: '準備',
      content: '静電気防止用リストバンドを着用し、作業スペースを確保します。パーツのマニュアルも手元に用意しておきましょう。',
    },
    {
      title: 'マザーボードにCPUを取り付ける',
      content: 'ソケットのレバーを解除し、CPUの向きに注意して設置します。力を入れず、自然に収まるはずです。',
    },
    {
      title: 'CPUクーラーを取り付ける',
      content: 'CPUに熱伝導グリスを適量塗り、マニュアルに従ってクーラーを取り付けます。',
    },
    {
      title: 'メモリを取り付ける',
      content: 'マザーボードのメモリスロットの向きに合わせて、両端がカチッと音がするまで差し込みます。',
    },
    {
      title: 'マザーボードをケースに取り付ける',
      content: 'スタンドオフを取り付け、マザーボードを固定します。このとき、I/Oパネルが正しく位置しているか確認してください。',
    },
    {
      title: '電源ユニットを取り付ける',
      content: 'ケース後方または下部に電源ユニットを設置し、ネジで固定します。',
    },
    {
      title: 'ストレージを取り付ける',
      content: 'SSDやHDDをケースの所定の位置に取り付けます。M.2 SSDはマザーボードに直接取り付けます。',
    },
    {
      title: 'グラフィックカードを取り付ける',
      content: 'マザーボードのPCIeスロットにGPUを差し込み、カチッと音がするまで押し込みます。必要に応じてネジで固定します。',
    },
    {
      title: '電源ケーブルを接続する',
      content: '各パーツに電源ケーブルを接続します。マザーボード（24ピン＋8ピン）、GPU、ストレージなど全て接続してください。',
    },
    {
      title: 'ケースファンやその他のケーブルを接続',
      content: 'ケースファン、フロントパネルのUSBや電源ボタンなどのケーブルをマザーボードに接続します。',
    },
    {
      title: '最終チェック',
      content: 'すべての接続を再確認し、ケーブル管理を行います。ケーブルタイなどを使って整理するといいでしょう。',
    },
    {
      title: '電源を入れてみる',
      content: 'すべて揃ったらモニターを接続し、電源を入れてみましょう。BIOSが起動すれば成功です！',
    },
  ];

  return (
    <Layout
      title="自作PCガイド | alteePC"
      description="自作PCの基礎知識や組み立て方、パーツの選び方など初心者向けの情報をご紹介します。"
    >
      {/* ヒーローセクション */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">自作PCガイド</h1>
          <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
            初めて自作PCに挑戦する方のために、基本的な知識からパーツの選び方、組み立て方までをご紹介します。
          </p>
          <a
            href="#pc-parts"
            className="inline-block bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            パーツの知識を見る
          </a>
        </div>
      </div>

      {/* パーツ知識セクション */}
      <div id="pc-parts" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">各パーツの基礎知識</h2>
            <p className="mt-4 text-xl text-gray-600">
              自作PCの主要パーツについての基本的な知識と選び方のポイント
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guideItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 transition-all hover:shadow-md bg-white"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/builder" className="btn btn-primary">
              PC構成ビルダーを使ってみる
            </Link>
          </div>
        </div>
      </div>

      {/* 互換性解説セクション */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">互換性について</h2>
            <p className="mt-4 text-xl text-gray-600">
              自作PC成功のカギは、パーツ同士の互換性です
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4">特に重要な互換性ポイント</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
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
                <div>
                  <p className="font-medium">CPU ↔ マザーボード</p>
                  <p className="text-gray-600">
                    CPUソケットタイプが完全に一致している必要があります。例えば、Intel LGA1700のCPUはLGA1700対応のマザーボードにのみ対応します。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
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
                <div>
                  <p className="font-medium">メモリ ↔ マザーボード</p>
                  <p className="text-gray-600">
                    メモリのタイプ（DDR4かDDR5など）がマザーボードの対応タイプと合っている必要があります。また、速度（MHz）についても確認が必要です。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
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
                <div>
                  <p className="font-medium">マザーボード ↔ ケース</p>
                  <p className="text-gray-600">
                    マザーボードのフォームファクター（ATX、Micro-ATX、Mini-ITXなど）がケースに対応しているか確認しましょう。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
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
                <div>
                  <p className="font-medium">GPU/CPUクーラー ↔ ケース</p>
                  <p className="text-gray-600">
                    GPUの長さやCPUクーラーの高さがケースに収まるか確認が必要です。特に高性能GPUや大型クーラーは注意が必要です。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
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
                <div>
                  <p className="font-medium">全パーツ ↔ 電源ユニット</p>
                  <p className="text-gray-600">
                    すべてのパーツの消費電力の合計に対して、余裕を持った電源容量（W）が必要です。一般的には、計算した消費電力の1.3倍程度の容量があると安心です。
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              alteePCの構成ビルダーを使えば、これらの互換性チェックを自動で行えます。
            </p>
            <Link href="/builder" className="btn btn-primary">
              互換性チェッカーを使う
            </Link>
          </div>
        </div>
      </div>

      {/* 組み立て手順セクション */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">PC組み立て手順</h2>
            <p className="mt-4 text-xl text-gray-600">
              初めての方でも分かりやすい、基本的な組み立て手順
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 h-full w-2 bg-blue-100 left-1/2 -translate-x-1/2 rounded-full"></div>
            <div className="space-y-8 relative">
              {assemblySteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} max-w-lg`}>
                      <h3 className="text-xl font-semibold mb-2">
                        {index + 1}. {step.title}
                      </h3>
                      <p className="text-gray-600">{step.content}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold border-4 border-white">
                    {index + 1}
                  </div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-600 mb-8">
              具体的な組み立て方は、パーツのマニュアルや詳細なYouTubeチュートリアルも参考にすることをおすすめします。
              まずは準備したパーツに互換性があるか確認することが重要です。
            </p>
            <Link href="/builder" className="btn btn-primary">
              PC構成ビルダーで確認する
            </Link>
          </div>
        </div>
      </div>

      {/* アドバイスセクション */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">初心者へのアドバイス</h2>
            <p className="mt-4 text-xl text-gray-600">
              自作PC初心者がよく陥る落とし穴と成功のためのヒント
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold mb-4 text-red-600">よくある失敗</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>互換性のないパーツを購入してしまう</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>電源容量が不足している</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>CPUクーラーの取り付け不良やグリス塗り過ぎ</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>メモリの向きを間違える</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>電源ケーブルの接続忘れや差し込み不足</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>静電気対策をしないでパーツを触る</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold mb-4 text-green-600">成功のコツ</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>パーツ購入前に互換性をしっかり確認する</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>各パーツのマニュアルを事前によく読む</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>作業前に手順を整理しておく</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>パーツにはやさしく、無理な力を加えない</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>ケーブル管理をしっかり行う</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>分からないことはすぐに検索して調べる</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA セクション */}
      <div className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            準備はできましたか？
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            自作PCを成功させるための第一歩は、互換性のあるパーツを選ぶことです。
            alteePCの構成ビルダーを使って、あなたの理想のPCを設計してみましょう。
          </p>
          <Link href="/builder"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg text-lg transition-colors">
            PC構成ビルダーを使う
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Guide;
