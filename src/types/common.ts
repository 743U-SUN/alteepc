// APIレスポンスの型定義
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// ページネーション用の型定義
export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

// フィルター条件の型定義
export type CommonFilterOptions = {
  [key: string]: string | number | boolean | string[] | number[] | null;
};

// ソート条件の型定義
export type SortOptions = {
  field: string;
  direction: 'asc' | 'desc';
};
