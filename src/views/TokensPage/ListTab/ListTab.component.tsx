import { useEffect, useState } from 'react';
import { Scrolling } from '@components/Scrolling';
import { TokensTable } from '@tables/TokensTable';
import { TokenShortType } from '@typings/tokens';
import { TokensPageProps } from '../TokensPage.types';

import styles from './ListTab.module.scss';

export const ListTabComponent = ({ tokens }: TokensPageProps) => {
  const [startRecord, setStartRecord] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortedBy, setSortedBy] =
    useState<keyof TokenShortType>('general_score');
  const [reverseSort, setReverseSort] = useState(true);
  const [data, setData] = useState(tokens);

  useEffect(() => {
    setData(
      tokens
        .slice()
        .sort((a, b) =>
          reverseSort
            ? a[sortedBy] < b[sortedBy]
              ? 1
              : -1
            : a[sortedBy] < b[sortedBy]
            ? -1
            : 1,
        ),
    );
  }, [startRecord, recordsPerPage, sortedBy, reverseSort]);

  const onSortClick = (id: keyof TokenShortType, reverseSort: boolean) => {
    setStartRecord(0);
    setSortedBy(id);
    setReverseSort(reverseSort);
  };

  const onPaginationClick = (start: number, recordsPerPage: number) => {
    setStartRecord(start);
    setRecordsPerPage(recordsPerPage);
  };

  return (
    <Scrolling
      horizontal
      vertical
      className={(styles.container, 'magic-inner-shadows')}
    >
      <TokensTable
        data={data}
        sortedBy={sortedBy}
        reverseSort={reverseSort}
        totalRecords={data.length}
        startRecord={startRecord}
        recordsPerPage={recordsPerPage}
        onSortClick={onSortClick}
        onPaginationClick={onPaginationClick}
      />
    </Scrolling>
  );
};
ListTabComponent.displayName = 'ListTab';
