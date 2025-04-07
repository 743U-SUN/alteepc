'use client';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { BuildProvider } from '@/context/build-context';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'alteePC - 自作PC初心者向けパーツ互換性チェック＆見積もりサイト',
//   description: '自作PCのパーツ選びをサポート。パーツ間の互換性チェックと見積もり作成が簡単にできます。',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <title>alteePC - 自作PC初心者向けパーツ互換性チェック＆見積もりサイト</title>
        <meta name="description" content="自作PCのパーツ選びをサポート。パーツ間の互換性チェックと見積もり作成が簡単にできます。" />
      </head>
      <body className={inter.className}>
        <BuildProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </BuildProvider>
      </body>
    </html>
  );
}
