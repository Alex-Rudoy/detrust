import { TableProps } from '@ui/Table';

import { TokenType } from '@store/tokens/token/token.types';

export type TokensTableProps = Omit<TableProps<TokenType>, 'columns'>;
