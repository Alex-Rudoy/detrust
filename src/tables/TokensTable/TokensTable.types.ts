import { TableProps } from '@ui/Table';
import { TokenType } from '@typings/tokens';

export type TokensTableProps = Omit<TableProps<TokenType>, 'columns'>;
