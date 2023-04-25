import { Text, TextSizeEnum } from '@components/Text';
import { columnConfigType } from '@ui/Table';

import { TokenMentionType } from '@store/tokens/tokenPrice/tokenPrice.types';

import styles from './MentionsTable.module.scss';

const sentimentMap = {
  [1]: 'Positive',
  [0]: 'Neutral',
  [-1]: 'Negative',
} as const;

export const mentionsTableColumns = (): columnConfigType<TokenMentionType> => [
  {
    id: 'content_creation_dt',
    name: 'Date',
    sortable: true,
    cellRenderer: (data) => (
      <div className={styles.textCell}>
        <Text size={TextSizeEnum.S14}>
          {new Date(data.content_creation_dt).toLocaleDateString()}
        </Text>
      </div>
    ),
  },
  {
    id: 'sentiment',
    name: 'Sentiment',
    sortable: true,
    cellRenderer: (data) => (
      <div className={styles.textCell}>
        <Text
          size={TextSizeEnum.S14}
          className={
            styles[sentimentMap[data.sentiment as keyof typeof sentimentMap]]
          }
        >
          {sentimentMap[data.sentiment as keyof typeof sentimentMap]}
        </Text>
      </div>
    ),
  },
  {
    id: 'text',
    name: 'Description',
    sortable: true,
    cellRenderer: (data) => (
      <div className={styles.textCell}>
        <Text size={TextSizeEnum.S14} className={styles.description}>
          {data.text}
        </Text>
      </div>
    ),
  },
];
