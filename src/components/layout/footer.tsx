import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-semibold">
              alteePC
            </Link>
            <p className="text-gray-400 text-sm mt-1">
              自作PC初心者向けパーツ互換性チェック＆見積もりサイト
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white my-1 md:my-0">
              ホーム
            </Link>
            <Link href="/build" className="text-gray-300 hover:text-white my-1 md:my-0">
              PC構成作成
            </Link>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} alteePC - MITライセンスの下で公開
        </div>
      </div>
    </footer>
  );
}
