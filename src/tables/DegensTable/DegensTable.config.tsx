import Link from 'next/link';

import { BadgeDelta } from '@components/BadgeDelta';
import { Text, TextSizeEnum } from '@components/Text';
import { ScoreCell } from '@ui/ScoreCell';
import { columnConfigType } from '@ui/Table';
import { routes } from '@views/routes';

import { DegenType } from '@store/degens/degen/degen.types';

import styles from './DegensTable.module.scss';

export const degensTableColumns = (): columnConfigType<DegenType> => [
  {
    id: 'username',
    name: 'Name',
    sortable: true,
    cellRenderer: (data) => (
      <Link href={routes.degenPage(data.username)}>
        <div className={styles.textCell}>
          <Text size={TextSizeEnum.S14}>{data.username}</Text>
        </div>
      </Link>
    ),
  },
  {
    id: 'positive_mentions_count',
    name: 'Positive Mentions',
    sortable: true,
    cellRenderer: (data) => (
      <div className={styles.textCell}>
        <Text size={TextSizeEnum.S14}>{data.positive_mentions_count}</Text>
      </div>
    ),
  },
  {
    id: 'negative_mentions_count',
    name: 'Negative Mentions',
    sortable: true,
    cellRenderer: (data) => (
      <div className={styles.textCell}>
        <Text size={TextSizeEnum.S14}>{data.negative_mentions_count}</Text>
      </div>
    ),
  },
  {
    id: 'mentions_count',
    name: 'Mentions',
    sortable: true,
    cellRenderer: (data) => (
      <div className={styles.textCell}>
        <Text size={TextSizeEnum.S14}>{data.mentions_count}</Text>
      </div>
    ),
  },
  {
    id: 'positive_price_change',
    name: 'Positive Price Change',
    sortable: true,
    cellRenderer: (data) => (
      <div className={styles.badgeCell}>
        <BadgeDelta
          value={Math.round(data.positive_price_change * 100)}
          percent={true}
        />
      </div>
    ),
  },
  {
    id: 'negative_price_change',
    name: 'Negative Price Change',
    sortable: true,
    cellRenderer: (data) => (
      <div className={styles.badgeCell}>
        <BadgeDelta
          value={Math.round(data.negative_price_change * 100)}
          percent={true}
        />
      </div>
    ),
  },
  {
    id: 'reputation',
    name: 'Reputation',
    sortable: true,
    cellRenderer: (data) => (
      <div className={styles.textCell}>
        <Text size={TextSizeEnum.S14}>{data.reputation}</Text>
      </div>
    ),
  },
  {
    id: 'won',
    name: 'Won rate',
    sortable: true,
    cellRenderer: (data) => <ScoreCell normalizedData={data.won} />,
  },
];
