import { Table } from '@ui/Table';
import { tokenInfluencersTableColumns } from './TokenInfluencersTable.config';
import { TokenInfluencersTableProps } from './TokenInfluencersTable.types';

import styles from './TokenInfluencersTable.module.scss';

export const TokenInfluencersTableComponent = (
  props: TokenInfluencersTableProps,
) => {
  return <Table columns={tokenInfluencersTableColumns()} {...props} />;
};

TokenInfluencersTableComponent.displayName = 'TokenInfluencersTable';
