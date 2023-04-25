import { useEffect, useState } from 'react';

import { MentionsTable } from '@tables/MentionsTable';

import { ABsort } from '@utils/ABsort';
import { TokenMentionType } from '@store/tokens/tokenPrice/tokenPrice.types';
import { useTokenPriceSelector } from '@store/tokens/tokenPrice/useTokenPriceSelector';

import { requestStatusEnum } from '@typings/requestStatus';

import styles from './MentionsTableSection.module.scss';

export const MentionsTableSectionComponent = () => {
  const { mentions, status } = useTokenPriceSelector();
  const [sortedBy, setSortedBy] = useState<keyof TokenMentionType>('username');
  const [reverseSort, setReverseSort] = useState(false);
  const [data, setData] = useState(mentions);

  useEffect(() => {
    setData(
      mentions
        .slice()
        .sort((a, b) =>
          reverseSort
            ? ABsort(a[sortedBy], b[sortedBy])
            : ABsort(b[sortedBy], a[sortedBy]),
        ),
    );
  }, [sortedBy, reverseSort, mentions]);

  const onSortClick = (id: keyof TokenMentionType, reverseSort: boolean) => {
    setSortedBy(id);
    setReverseSort(reverseSort);
  };

  return (
    <MentionsTable
      data={data}
      sortedBy={sortedBy}
      reverseSort={reverseSort}
      totalRecords={data.length}
      emptyState={
        <div className={styles.emptyState}>No mentions for this token</div>
      }
      onSortClick={onSortClick}
      isLoading={status !== requestStatusEnum.SUCCESS}
      className={styles.mentionsTable}
    />
  );
};
MentionsTableSectionComponent.displayName = 'MentionsTableSection';
