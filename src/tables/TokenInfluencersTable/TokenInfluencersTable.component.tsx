import { Table } from '@ui/Table';
import { tokenInfluencersTableColumns } from './TokenInfluencersTable.config';

import { TokenInfluencersTableProps } from './TokenInfluencersTable.types';

export const TokenInfluencersTableComponent = (
  props: TokenInfluencersTableProps,
) => {
  return <Table columns={tokenInfluencersTableColumns()} {...props} />;
};

TokenInfluencersTableComponent.displayName = 'TokenInfluencersTable';
