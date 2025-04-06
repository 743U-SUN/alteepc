import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout/Layout';
import { log } from '../utils/logging';

const Home: React.FC = () => {
  // ページアクセスをログに記録
  React.useEffect(() => {
    log.info('Home page accessed');
  }, []);

  const features = [
    {
      title: 'パーツ互換性チェック',
      description: 'CPUとマザーボードのソケット、GPUの長さなど、自作PCのパーツ互換性を自動でチェックします。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: '簡易見積もり',
      description: '選択したパーツの合計金額をリアルタイムで計算し、予算に合わせたPC構成を簡単に作成できます。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: '構成共有',
      description: 'アカウント登録不要で、作成したPC構成を友人や専門家と簡単に共有できます。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      ),
    },
  ];

  return (
    <Layout>
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                自作PCの構築を、もっとカンタンに
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                alteePC - 自作PC初心者向けのパーツ互換性チェッカー＆見積もりツール
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link href="/builder" 
                      className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium text-center">
                  PC構成を作成する
                </Link>
                <Link href="/guide" 
                      className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium text-center">
                  自作PCガイド
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-96 w-full">
              <Image
                src="/images/hero-pc.jpg"
                alt="自作PC"
                fill
                style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 機能セクション */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              簡単3ステップで、理想のPCを設計
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              自作PCの知識がなくても、互換性のある最適なパーツ構成が見つかります
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            あなただけの自作PCを、今すぐ設計しましょう
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            アカウント登録不要、完全無料でお使いいただけます
          </p>
          <Link href="/builder" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg text-lg transition-colors">
            今すぐPC構成を作成する
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
