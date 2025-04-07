import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            alteePC
          </Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/build" className="text-gray-600 hover:text-primary">
                  PC構成作成
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
