import { TableProps } from '@ui/Table';
import { TokenInfluencerType } from '@typings/tokens';

export type TokenInfluencersTableProps = Omit<
  TableProps<TokenInfluencerType>,
  'columns'
>;
