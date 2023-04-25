import { RootState } from '@store/index';
import { useTypedSelector } from '@store/useTypedSelector';

export const useDegenTokensSelector = () =>
  useTypedSelector((state: RootState) => state.degenTokens);
