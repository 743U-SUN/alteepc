import logger from './logger';

// ログレベルに応じたフロントエンドの利便性向上ラッパー関数
export const log = {
  error: (message: string, meta?: Record<string, any>) => {
    logger.error(message, meta);
  },
  warn: (message: string, meta?: Record<string, any>) => {
    logger.warn(message, meta);
  },
  info: (message: string, meta?: Record<string, any>) => {
    logger.info(message, meta);
  },
  debug: (message: string, meta?: Record<string, any>) => {
    logger.debug(message, meta);
  },
};

export { apiLogger } from './logger';
export default logger;
