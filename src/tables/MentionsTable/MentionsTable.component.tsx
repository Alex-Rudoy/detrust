import { Table } from '@ui/Table';
import { mentionsTableColumns } from './MentionsTable.config';

import { MentionsTableProps } from './MentionsTable.types';

export const MentionsTableComponent = (props: MentionsTableProps) => {
  return <Table columns={mentionsTableColumns()} {...props} />;
};

MentionsTableComponent.displayName = 'MentionsTable';
