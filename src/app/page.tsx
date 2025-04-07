import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/button';

export default function HomePage() {
  return (
    <div>
      {/* ヒーローセクション */}
      <div className="bg-white py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">自作PCの組み立てを</span>
                <span className="block text-primary">もっと簡単に</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
                alteePC は、自作PC初心者のためのパーツ互換性チェック＆見積もりサイトです。
                パーツ選びから互換性の確認まで、自作PCの組み立てをサポートします。
              </p>
              <div className="mt-8 sm:mt-10">
                <Link href="/build">
                  <Button size="lg" variant="primary">
                    PC構成を開始する
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 flex justify-center">
              <div className="w-full h-64 lg:h-80 relative">
                <Image
                  src="/images/hero-pc.jpg"
                  alt="PC Build"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 機能紹介セクション */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              主な機能
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              あなたの自作PCをサポートする機能
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-primary text-xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">互換性チェック</h3>
              <p className="text-gray-600">
                選択したパーツ間の互換性を自動的にチェックし、問題点を表示します。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-primary text-xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">簡易見積もり</h3>
              <p className="text-gray-600">
                選択したパーツの合計金額をリアルタイムで確認できます。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-primary text-xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">URL発行機能</h3>
              <p className="text-gray-600">
                アカウント登録不要でPC構成を保存・共有できます。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTAセクション */}
      <div className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">
            あなただけのPCを組み立てよう
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100">
            今すぐPC構成を開始して、理想のコンピューターを見つけましょう。
          </p>
          <div className="mt-8">
            <Link href="/build">
              <Button size="lg" variant="accent">
                PC構成を開始する
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
