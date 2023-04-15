import Link from 'next/link';

import { CustomTooltip } from '@components/CustomTooltip';
import { ScorePie } from '@components/ScorePie';
import { FontWeightEnum, Text, TextSizeEnum } from '@components/Text';
import { columnConfigType } from '@ui/Table';
import { routes } from '@views/routes';
import { TokenShortType } from '@typings/tokens';
import styles from './TokensTable.module.scss';

export const tokensTableColumns = (): columnConfigType<TokenShortType> => [
  {
    id: 'project_name',
    name: 'Name',
    sortable: true,
    cellRenderer: (data) => (
      <Link href={routes.tokenPage(data.id)}>
        <div className={styles.nameCell}>
          <Text size={TextSizeEnum.S14} fontWeight={FontWeightEnum.FW500}>
            {data.project_name}
          </Text>
        </div>
      </Link>
    ),
  },
  {
    id: 'project_count_followers_10k',
    name: 'Big Followers',
    sortable: true,
    cellRenderer: (data) => (
      <ScoreCell
        normalizedData={data.project_count_followers_10k_scaled}
        absoluteData={data.project_count_followers_10k}
        id={`project_count_followers_10k_${data.id}`}
      />
    ),
  },
  {
    id: 'project_token_ranked_followers_10k',
    name: 'Influence',
    sortable: true,
    cellRenderer: (data) => (
      <ScoreCell
        normalizedData={data.project_token_ranked_followers_10k_scaled}
        absoluteData={data.project_token_ranked_followers_10k}
        id={`project_token_ranked_followers_10k_${data.id}`}
      />
    ),
  },
  {
    id: 'buying_power',
    name: 'Buying Power',
    sortable: true,
    cellRenderer: (data) => <ScoreCell normalizedData={data.buying_power} />,
  },
  {
    id: 'holders_count',
    name: 'Unique Holders',
    sortable: true,
    cellRenderer: (data) => (
      <ScoreCell
        normalizedData={data.holders_count_scaled}
        absoluteData={data.holders_count}
        id={`holders_count_${data.id}`}
      />
    ),
  },
  {
    id: 'holders_value',
    name: 'Holders Capital',
    sortable: true,
    cellRenderer: (data) => (
      <ScoreCell
        normalizedData={data.holders_value_scaled}
        absoluteData={data.holders_value}
        id={`holders_value_${data.id}`}
      />
    ),
  },
  {
    id: 'volume_to_mc',
    name: 'Volume Score',
    sortable: true,
    cellRenderer: (data) => (
      <ScoreCell
        normalizedData={data.volume_to_mc_scaled}
        absoluteData={data.volume_to_mc}
        id={`volume_to_mc_${data.id}`}
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

// todo: maybe move to separate file when more tables might use it
const ScoreCell = ({
  normalizedData,
  absoluteData,
  id,
}: {
  normalizedData: number;
  absoluteData?: number;
  id?: string;
}) => {
  return (
    <div className={styles.centeredCell}>
      <ScorePie
        percent={normalizedData}
        data-tooltip-id={id}
        data-tooltip-content={(absoluteData || '').toString()}
      />
      {absoluteData && id ? <CustomTooltip data-tooltip-id={id} /> : null}
    </div>
  );
};
