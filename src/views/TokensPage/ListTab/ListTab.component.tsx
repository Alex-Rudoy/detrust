import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Scrolling } from '@components/Scrolling';
import { TokensTable } from '@tables/TokensTable';
import { ABsort } from '@utils/ABsort';
import { TokenShortType } from '@typings/tokens';
import { TokensPageProps } from '../TokensPage.types';

import styles from './ListTab.module.scss';

export const ListTabComponent = ({ tokens }: TokensPageProps) => {
  const [sortedBy, setSortedBy] =
    useState<keyof TokenShortType>('general_score');
  const [reverseSort, setReverseSort] = useState(false);
  const [data, setData] = useState(tokens);

  useEffect(() => {
    setData(
      tokens
        .slice()
        .sort((a, b) =>
          reverseSort
            ? ABsort(a[sortedBy], b[sortedBy])
            : ABsort(b[sortedBy], a[sortedBy]),
        ),
    );
  }, [sortedBy, reverseSort]);

  const onSortClick = (id: keyof TokenShortType, reverseSort: boolean) => {
    setSortedBy(id);
    setReverseSort(reverseSort);
  };

  return (
    <Scrolling
      horizontal
      vertical
      className={classNames(styles.container, 'magic-inner-shadows')}
    >
      <TokensTable
        data={data}
        sortedBy={sortedBy}
        reverseSort={reverseSort}
        totalRecords={data.length}
        onSortClick={onSortClick}
      />
    </Scrolling>
  );
};
ListTabComponent.displayName = 'ListTab';
