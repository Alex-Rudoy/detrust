import { ReactNode } from 'react';

export type columnConfigType<T extends { id: number | string }> = {
  id: Extract<keyof T, string>;
  name: string;
  sortable?: boolean;
  cellRenderer: (data: T) => ReactNode;
  tooltip?: { 'data-tip': string; 'data-for': string };
}[];

export type TableProps<T extends { id: number | string }> = {
  columns: columnConfigType<T>;
  data: T[];
  sortedBy?: string;
  reverseSort?: boolean;
  totalRecords?: number;
  startRecord?: number;
  recordsPerPage?: number;
  isLoading?: boolean;
  emptyState?: ReactNode;
  onSortClick: (id: keyof T, reverseSort: boolean) => void;
  onPaginationClick?: (startRecord: number, recordsPerPage: number) => void;
  className?: string;
  withoutPagination?: boolean;
};
