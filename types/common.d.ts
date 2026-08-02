export interface PaginatedResponse<T> {
  items: T[] | null;
  totalRecord: number;
}
