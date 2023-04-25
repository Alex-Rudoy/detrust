import { useEffect, useState } from 'react';

import { DegensTable } from '@tables/DegensTable';

import { ABsort } from '@utils/ABsort';
import { DegenType } from '@store/degens/degensList/degensList.types';
import { useDegensListSelector } from '@store/degens/degensList/useDegensListSelector';

import { requestStatusEnum } from '@typings/requestStatus';

import styles from './DegensTableSection.module.scss';

export const DegensTableSectionComponent = () => {
  const { degensList, status } = useDegensListSelector();
  const [sortedBy, setSortedBy] = useState<keyof DegenType>('username');
  const [reverseSort, setReverseSort] = useState(false);
  const [data, setData] = useState(degensList);

  useEffect(() => {
    setData(
      degensList
        .slice()
        .sort((a, b) =>
          reverseSort
            ? ABsort(a[sortedBy], b[sortedBy])
            : ABsort(b[sortedBy], a[sortedBy]),
        ),
    );
  }, [sortedBy, reverseSort, degensList]);

  const onSortClick = (id: keyof DegenType, reverseSort: boolean) => {
    setSortedBy(id);
    setReverseSort(reverseSort);
  };

  return (
    <DegensTable
      data={data}
      sortedBy={sortedBy}
      reverseSort={reverseSort}
      totalRecords={data.length}
      emptyState={<div className={styles.emptyState}>No influencers found</div>}
      onSortClick={onSortClick}
      isLoading={status !== requestStatusEnum.SUCCESS}
      className={styles.degensTable}
    />
  );
};
DegensTableSectionComponent.displayName = 'DegensTableSection';
