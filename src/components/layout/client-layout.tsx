'use client';

import React from 'react';
import Header from './header';
import Footer from './footer';
import { BuildProvider } from '@/context/build-context';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BuildProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </BuildProvider>
  );
}
