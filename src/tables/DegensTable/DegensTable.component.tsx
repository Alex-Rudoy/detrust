import { Table } from '@ui/Table';
import { degensTableColumns } from './DegensTable.config';

import { DegensTableProps } from './DegensTable.types';

export const DegensTableComponent = (props: DegensTableProps) => {
  return <Table columns={degensTableColumns()} {...props} />;
};

DegensTableComponent.displayName = 'DegensTable';
