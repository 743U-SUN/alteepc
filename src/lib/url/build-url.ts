import { createId } from '@paralleldrive/cuid2';

/**
 * PC構成のユニークIDを生成する
 * @returns 短いユニークなID
 */
export function generateBuildId(): string {
  // cuid2を使用して短いユニークIDを生成
  return createId();
}

/**
 * PC構成の共有URLを生成する
 * @param buildId PC構成のID
 * @returns 共有用のURL
 */
export function generateBuildUrl(buildId: string): string {
  // 開発環境と本番環境で適切なURLを生成
  if (process.env.NODE_ENV === 'production') {
    // 本番環境用URL
    return `${process.env.NEXT_PUBLIC_BASE_URL || 'https://alteepc.jp'}/build/${buildId}`;
  } else {
    // 開発環境用URL
    return `/build/${buildId}`;
  }
}
