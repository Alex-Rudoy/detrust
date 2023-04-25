import { TableProps } from '@ui/Table';

import { DegenType } from '@store/degens/degensList/degensList.types';

export type DegensTableProps = Omit<TableProps<DegenType>, 'columns'>;
