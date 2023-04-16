import { Table } from '@ui/Table';
import { tokensTableColumns } from './TokensTable.config';
import { TokensTableProps } from './TokensTable.types';

export const TokensTableComponent = (props: TokensTableProps) => {
  return <Table columns={tokensTableColumns()} {...props} />;
};

TokensTableComponent.displayName = 'TokensTable';
