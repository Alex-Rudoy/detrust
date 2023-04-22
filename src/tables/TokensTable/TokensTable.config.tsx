import Link from 'next/link';

import { Text, TextSizeEnum } from '@components/Text';
import { ScoreCell } from '@ui/ScoreCell';
import { columnConfigType } from '@ui/Table';
import { routes } from '@views/routes';

import { TokenType } from '@store/tokens/token/token.types';

import styles from './TokensTable.module.scss';

export const tokensTableColumns = (): columnConfigType<TokenType> => [
  {
    id: 'project_name',
    name: 'Name',
    sortable: true,
    cellRenderer: (data) => (
      <Link href={routes.tokenPage(data.symbol)}>
        <div className={styles.nameCell}>
          <Text size={TextSizeEnum.S14}>{data.project_name}</Text>
        </div>
      </Link>
    ),
  },
  {
    id: 'project_count_followers_10k',
    name: 'Big Followers',
    tooltip: 'Amount of followers with more than 10K Followers',
    sortable: true,
    cellRenderer: (data) => (
      <ScoreCell
        normalizedData={data.project_count_followers_10k_scaled}
        absoluteData={data.project_count_followers_10k}
      />
    ),
  },
  {
    id: 'project_token_ranked_followers_10k',
    name: 'Influence',
    tooltip: 'Amount of influencers from top 10K list in current domain',
    sortable: true,
    cellRenderer: (data) => (
      <ScoreCell
        normalizedData={data.project_token_ranked_followers_10k_scaled}
        absoluteData={data.project_token_ranked_followers_10k}
      />
    ),
  },
  {
    id: 'buying_power',
    name: 'Buying Power',
    tooltip: 'Buying Power of subject community',
    sortable: true,
    cellRenderer: (data) => <ScoreCell normalizedData={data.buying_power} />,
  },
  {
    id: 'holders_count',
    name: 'Unique Holders',
    tooltip: 'Count of unique token holders',
    sortable: true,
    cellRenderer: (data) => (
      <ScoreCell
        normalizedData={data.holders_count_scaled}
        absoluteData={data.holders_count}
      />
    ),
  },
  {
    id: 'holders_value',
    name: 'Holders Capital',
    tooltip: 'Amount of top 1000 holders capital',
    sortable: true,
    cellRenderer: (data) => (
      <ScoreCell
        normalizedData={data.holders_value_scaled}
        absoluteData={data.holders_value}
      />
    ),
  },
  {
    id: 'volume_to_mc',
    name: 'Volume Score',
    tooltip: 'AVG daily volume to MC',
    sortable: true,
    cellRenderer: (data) => (
      <ScoreCell
        normalizedData={data.volume_to_mc_scaled}
        absoluteData={data.volume_to_mc}
      />
    ),
  },
  {
    id: 'general_score',
    name: 'Score',
    sortable: true,
    cellRenderer: (data) => <ScoreCell normalizedData={data.general_score} />,
  },
];
