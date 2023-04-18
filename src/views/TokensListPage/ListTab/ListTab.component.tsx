import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Scrolling } from '@components/Scrolling';
import { TokensTable } from '@tables/TokensTable';

import { ABsort } from '@utils/ABsort';

import { TokenType } from '@typings/tokens';

import { TokensListPageProps } from '../TokensListPage.types';

import styles from './ListTab.module.scss';

export const ListTabComponent = ({ tokens }: TokensListPageProps) => {
  const [sortedBy, setSortedBy] = useState<keyof TokenType>('general_score');
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

  const onSortClick = (id: keyof TokenType, reverseSort: boolean) => {
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
