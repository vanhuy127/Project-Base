export interface IResponse<T> {
  success: boolean;
  message_code: string | null;
  data: T | null;
  error_code: string | null;
  errors: { field: string; error_code: string }[];
}

export interface IListResponse<T> {
  success: boolean;
  message_code: string | null;
  data: { items: T[]; totalPages: number; totalItemsCount: number; pageNumber: number };
  error_code: string | null;
  errors: { field: string; error_code: string }[];
}
