export type TablePaginationProps = {
  totalRecords: number;
  startRecord: number;
  recordsPerPage: number;
  onPaginationClick: (startFrom: number, recordsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  immutableRecordPerPage?: boolean;
};
