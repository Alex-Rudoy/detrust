import { RootState } from '@store/index';
import { useTypedSelector } from '@store/useTypedSelector';

export const useTokenPriceSelector = () =>
  useTypedSelector((state: RootState) => state.tokenPrice);
