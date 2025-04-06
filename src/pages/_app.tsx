import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import '../styles/globals.css';
import { log } from '../utils/logging';

function MyApp({ Component, pageProps }: AppProps) {
  // アプリケーション起動をログに記録
  useEffect(() => {
    log.info('Application initialized');
  }, []);

  // ページ遷移のログを記録
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      log.info(`Route changed to: ${url}`);
    };

    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
