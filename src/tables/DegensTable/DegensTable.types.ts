import { TableProps } from '@ui/Table';

import { DegenType } from '@store/degens/degen/degen.types';

export type DegensTableProps = Omit<TableProps<DegenType>, 'columns'>;
