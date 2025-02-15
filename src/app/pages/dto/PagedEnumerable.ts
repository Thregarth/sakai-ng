export interface PagedEnumerable<T> {
    page: number;
    pageSize: number;
    count: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    items: T;
  }
  