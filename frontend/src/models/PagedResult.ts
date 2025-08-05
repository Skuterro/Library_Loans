export interface PagedResult<T> {
  items: T[];
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  totalItemsCount: number;
}
