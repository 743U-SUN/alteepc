import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">altee<span className="text-accent">PC</span></span>
            </Link>
            <nav className="ml-6 flex space-x-4">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
                トップ
              </Link>
              <Link href="/build" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
                PC構成
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
