import { RootState } from '@store/index';
import { useTypedSelector } from '@store/useTypedSelector';

export const useGroupTokensSelector = () =>
  useTypedSelector((state: RootState) => state.groupTokens);
