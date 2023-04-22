import { RootState } from '@store/index';
import { useTypedSelector } from '@store/useTypedSelector';

export const useTokenInfluencersSelector = () =>
  useTypedSelector((state: RootState) => state.tokenInfluencers);
