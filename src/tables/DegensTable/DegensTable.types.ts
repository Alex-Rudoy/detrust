import { TableProps } from '@ui/Table';

import { DegenType } from '@typings/degens';

export type DegensTableProps = Omit<TableProps<DegenType>, 'columns'>;
