import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { initDatabase } from '@/lib/db';
import '../styles/globals.css';
import ClientLayout from '@/components/layout/client-layout';

// フォント設定
const inter = Inter({ subsets: ['latin'] });

// メタデータ
export const metadata: Metadata = {
  title: 'alteePC - 自作PC初心者向けパーツ互換性チェック＆見積もりサイト',
  description: '自作PCのパーツ選びをサポート。パーツ間の互換性チェックと見積もり作成が簡単にできます。',
};

// サーバーサイドでのデータベース初期化
async function initApp() {
  try {
    // データベース接続を初期化
    await initDatabase();
    return { success: true };
  } catch (error) {
    console.error('アプリケーション初期化エラー:', error);
    return { success: false, error };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // アプリ初期化
  const initResult = await initApp();
  
  return (
    <html lang="ja">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
