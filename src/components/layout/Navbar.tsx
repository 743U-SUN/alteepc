import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const router = useRouter();
  
  const isActive = (path: string) => {
    return router.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="font-bold text-xl tracking-tight">alteePC</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/')} hover:bg-blue-700`}
              >
                ホーム
              </Link>
              <Link
                href="/builder"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/builder')} hover:bg-blue-700`}
              >
                PC構成ビルダー
              </Link>
              <Link
                href="/guide"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/guide')} hover:bg-blue-700`}
              >
                自作PCガイド
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/about')} hover:bg-blue-700`}
              >
                サイトについて
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/contact')} hover:bg-blue-700`}
              >
                お問い合わせ
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            {/* モバイルメニューボタン - 実装は簡略化 */}
            <button
              type="button"
              className="bg-blue-700 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-800 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">メニューを開く</span>
              {/* メニューアイコン */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー - 実際の実装では開閉の状態管理が必要 */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')} hover:bg-blue-700`}
          >
            ホーム
          </Link>
          <Link
            href="/builder"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/builder')} hover:bg-blue-700`}
          >
            PC構成ビルダー
          </Link>
          <Link
            href="/guide"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/guide')} hover:bg-blue-700`}
          >
            自作PCガイド
          </Link>
          <Link
            href="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about')} hover:bg-blue-700`}
          >
            サイトについて
          </Link>
          <Link
            href="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/contact')} hover:bg-blue-700`}
          >
            お問い合わせ
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
