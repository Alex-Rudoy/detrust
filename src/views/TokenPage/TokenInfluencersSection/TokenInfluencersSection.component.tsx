import { useEffect, useState } from 'react';

import { TokenInfluencersTable } from '@tables/TokenInfluencersTable';

import { ABsort } from '@utils/ABsort';

import { TokenInfluencerType } from '@typings/tokens';

import { TokenInfluencersSectionProps } from './TokenInfluencersSection.types';

export const TokenInfluencersSectionComponent = ({
  tokenInfluencers,
}: TokenInfluencersSectionProps) => {
  const [sortedBy, setSortedBy] =
    useState<keyof TokenInfluencerType>('username');
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

  const onSortClick = (id: keyof TokenInfluencerType, reverseSort: boolean) => {
    setSortedBy(id);
    setReverseSort(reverseSort);
  };

  return (
    <TokenInfluencersTable
      data={data}
      sortedBy={sortedBy}
      reverseSort={reverseSort}
      totalRecords={data.length}
      onSortClick={onSortClick}
    />
  );
};
TokenInfluencersSectionComponent.displayName = 'TokenInfluencersSection';
