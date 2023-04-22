import { useEffect, useState } from 'react';

import { DegensTable } from '@tables/DegensTable';

import { ABsort } from '@utils/ABsort';
import { useTokenInfluencersSelector } from '@store/tokens/tokenInfluencers/useTokenInfluencersSelector';

import { DegenType } from '@typings/degens';

export const TokenInfluencersSectionComponent = () => {
  const { tokenInfluencers } = useTokenInfluencersSelector();
  const [sortedBy, setSortedBy] = useState<keyof DegenType>('username');
  const [reverseSort, setReverseSort] = useState(false);
  const [data, setData] = useState(tokenInfluencers);

  useEffect(() => {
    setData(
      tokenInfluencers
        .slice()
        .sort((a, b) =>
          reverseSort
            ? ABsort(a[sortedBy], b[sortedBy])
            : ABsort(b[sortedBy], a[sortedBy]),
        ),
    );
  }, [sortedBy, reverseSort]);

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
      emptyState={<div>No influencers found</div>}
      onSortClick={onSortClick}
    />
  );
};
TokenInfluencersSectionComponent.displayName = 'TokenInfluencersSection';
