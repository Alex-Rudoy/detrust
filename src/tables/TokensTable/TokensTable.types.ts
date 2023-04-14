import { TableProps } from '@ui/Table';
import { TokenShortType } from '@typings/tokens';

export type TokensTableProps = Omit<TableProps<TokenShortType>, 'columns'>;
