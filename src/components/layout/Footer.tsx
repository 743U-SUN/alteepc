import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* サイト情報 */}
          <div>
            <h2 className="text-xl font-bold mb-4">alteePC</h2>
            <p className="text-gray-300">
              自作PC初心者向けのパーツ互換性チェック＆見積もりサイト。
              簡単操作でパーツの相性チェックとコスト計算ができます。
            </p>
          </div>
          
          {/* クイックリンク */}
          <div>
            <h2 className="text-xl font-bold mb-4">クイックリンク</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/builder" className="text-gray-300 hover:text-white">
                  PC構成ビルダー
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-gray-300 hover:text-white">
                  自作PCガイド
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  サイトについて
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 免責事項 */}
          <div>
            <h2 className="text-xl font-bold mb-4">免責事項</h2>
            <p className="text-gray-300">
              当サイトの情報は可能な限り正確を期していますが、
              実際のパーツ購入時には各メーカーの公式情報を
              必ず確認してください。
            </p>
          </div>
        </div>
        
        {/* コピーライト */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            &copy; {currentYear} alteePC - All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            * 当サイトは個人的な学習プロジェクトです。実際の製品購入には公式情報をご確認ください。
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
