import Link from 'next/link';

import { CustomTooltip } from '@components/CustomTooltip';
import { ScorePie } from '@components/ScorePie';
import {
  CustomLink,
  FontWeightEnum,
  Text,
  TextSizeEnum,
} from '@components/Text';
import { columnConfigType } from '@ui/Table';
import { routes } from '@views/routes';
import { TokenShortType } from '@typings/tokens';
import styles from './TokensTable.module.scss';

export const tokensTableColumns = (): columnConfigType<TokenShortType> => [
  // {
  //   id: 'id',
  //   name: 'Position',
  //   sortable: false,
  //   cellRenderer: () => (
  //     <>
  //       <Text size={TextSizeEnum.S14} fontWeight={FontWeightEnum.FW500}>
  //         {/* {index} */}
  //       </Text>
  //     </>
  //   ),
  // },
  {
    id: 'project_name',
    name: 'Name',
    sortable: true,
    cellRenderer: (data) => (
      <Link href={routes({ name: data.project_name }).tokenPage}>
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
    cellRenderer: (data, index) => (
      <div className={styles.centeredCell}>
        <ScorePie
          percent={data.project_count_followers_10k_scaled}
          data-tooltip-id={`project_count_followers_10k_${index}`}
          data-tooltip-content={data.project_count_followers_10k.toString()}
        />
        <CustomTooltip
          data-tooltip-id={`project_count_followers_10k_${index}`}
        />
      </div>
    ),
  },
  {
    id: 'project_token_ranked_followers_10k',
    name: 'Influence',
    sortable: true,
    cellRenderer: (data, index) => (
      <div className={styles.centeredCell}>
        <ScorePie
          percent={data.project_token_ranked_followers_10k_scaled}
          data-tooltip-id={`project_token_ranked_followers_10k_${index}`}
          data-tooltip-content={data.project_token_ranked_followers_10k.toString()}
        />
        <CustomTooltip
          data-tooltip-id={`project_token_ranked_followers_10k_${index}`}
        />
      </div>
    ),
  },
  {
    id: 'buying_power',
    name: 'Buying Power',
    sortable: true,
    cellRenderer: (data) => (
      <div className={styles.centeredCell}>
        <ScorePie percent={data.buying_power} />
      </div>
    ),
  },
  {
    id: 'holders_count',
    name: 'Unique Holders',
    sortable: true,
    cellRenderer: (data, index) => (
      <div className={styles.centeredCell}>
        <ScorePie
          percent={data.holders_count_scaled}
          data-tooltip-id={`holders_count_${index}`}
          data-tooltip-content={data.holders_count.toString()}
        />
        <CustomTooltip data-tooltip-id={`holders_count_${index}`} />
      </div>
    ),
  },
  {
    id: 'holders_value',
    name: 'Holders Capital',
    sortable: true,
    cellRenderer: (data, index) => (
      <div className={styles.centeredCell}>
        <ScorePie
          percent={data.holders_value_scaled}
          data-tooltip-id={`holders_value_${index}`}
          data-tooltip-content={data.holders_value.toString()}
        />
        <CustomTooltip data-tooltip-id={`holders_value_${index}`} />
      </div>
    ),
  },
  {
    id: 'volume_to_mc',
    name: 'Volume Score',
    sortable: true,
    cellRenderer: (data, index) => (
      <div className={styles.centeredCell}>
        <ScorePie
          percent={data.volume_to_mc_scaled}
          data-tooltip-id={`volume_to_mc_${index}`}
          data-tooltip-content={data.volume_to_mc.toString()}
        />
        <CustomTooltip data-tooltip-id={`volume_to_mc_${index}`} />
      </div>
    ),
  },
  {
    id: 'general_score',
    name: 'Score',
    sortable: true,
    cellRenderer: (data) => (
      <div className={styles.centeredCell}>
        <ScorePie percent={data.general_score} />
      </div>
    ),
  },
];
