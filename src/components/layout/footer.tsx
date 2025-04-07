import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-500">
            &copy; {currentYear} alteePC. All rights reserved.
          </p>
          <p className="text-center text-xs text-gray-400 mt-2">
            自作PC初心者向けパーツ互換性チェック＆見積もりサイト
          </p>
        </div>
      </div>
    </footer>
  );
}
