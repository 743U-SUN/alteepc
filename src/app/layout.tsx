import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { BuildProvider } from '@/context/build-context';

export const metadata: Metadata = {
  title: 'alteePC - 自作PC初心者向けパーツ互換性チェック＆見積もりサイト',
  description: 'alteePC は自作PC初心者のためのパーツ互換性チェック＆簡易見積もりwebサイトです。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen">
        <BuildProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-6">
            {children}
          </main>
          <Footer />
        </BuildProvider>
      </body>
    </html>
  );
}
