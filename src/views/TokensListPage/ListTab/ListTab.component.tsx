import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Scrolling } from '@components/Scrolling';
import { TokensTable } from '@tables/TokensTable';

import { ABsort } from '@utils/ABsort';
import { TokenType } from '@store/tokens/token/token.types';
import { useTokensListSelector } from '@store/tokens/tokensList/useTokensListSelector';

import styles from './ListTab.module.scss';

export const ListTabComponent = () => {
  const { tokensList } = useTokensListSelector();
  const [sortedBy, setSortedBy] = useState<keyof TokenType>('general_score');
  const [reverseSort, setReverseSort] = useState(false);
  const [data, setData] = useState(tokensList);

  useEffect(() => {
    setData(
      tokensList
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
    <div className={classNames(styles.container)}>
      <TokensTable
        data={data}
        sortedBy={sortedBy}
        reverseSort={reverseSort}
        totalRecords={data.length}
        onSortClick={onSortClick}
      />
    </div>
  );
};
ListTabComponent.displayName = 'ListTab';
