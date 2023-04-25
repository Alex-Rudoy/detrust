import { TableProps } from '@ui/Table';

import { TokenMentionType } from '@store/tokens/tokenPrice/tokenPrice.types';

export type MentionsTableProps = Omit<TableProps<TokenMentionType>, 'columns'>;
