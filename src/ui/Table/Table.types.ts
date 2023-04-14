import React from 'react';

export type columnConfigType<T> = {
  id: Extract<keyof T, string>;
  name: string;
  sortable?: boolean;
  cellRenderer: (data: T, index: number) => React.ReactNode;
  tooltip?: { 'data-tip': string; 'data-for': string };
}[];

export type TableProps<T> = {
  columns: columnConfigType<T>;
  data: T[];
  sortedBy?: string;
  reverseSort?: boolean;
  totalRecords?: number;
  startRecord?: number;
  recordsPerPage?: number;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  onSortClick: (id: keyof T, reverseSort: boolean) => void;
  onPaginationClick?: (startRecord: number, recordsPerPage: number) => void;
  className?: string;
  withoutPagination?: boolean;
};