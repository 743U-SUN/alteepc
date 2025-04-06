// シンプルな共通インターフェース定義
export interface Logger {
  error: (message: string, meta?: any) => void;
  warn: (message: string, meta?: any) => void;
  info: (message: string, meta?: any) => void;
  debug: (message: string, meta?: any) => void;
}

// クライアント用の簡易ロガー
const clientLogger: Logger = {
  error: (message, meta) => console.error(`[ERROR] ${message}`, meta || ''),
  warn: (message, meta) => console.warn(`[WARN] ${message}`, meta || ''),
  info: (message, meta) => console.info(`[INFO] ${message}`, meta || ''),
  debug: (message, meta) => console.debug(`[DEBUG] ${message}`, meta || ''),
};

// サーバーかクライアントかを判定
const isServer = typeof window === 'undefined';

// ロガーを選択してエクスポート
const logger: Logger = clientLogger;

// APIリクエストのログを記録するミドルウェア（シンプル版）
export const apiLogger = (req: any, res: any, next: () => void) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const message = `${req.method} ${req.url} ${res.statusCode} - ${duration}ms`;
    
    if (res.statusCode >= 500) {
      logger.error(message);
    } else if (res.statusCode >= 400) {
      logger.warn(message);
    } else {
      logger.info(message);
    }
  });
  
  next();
};

export default logger;
