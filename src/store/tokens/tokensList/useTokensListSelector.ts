import { RootState } from '@store/index';
import { useTypedSelector } from '@store/useTypedSelector';

export const useTokensListSelector = () =>
  useTypedSelector((state: RootState) => state.tokensList);
