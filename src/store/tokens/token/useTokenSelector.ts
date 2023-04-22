import { RootState } from '@store/index';
import { useTypedSelector } from '@store/useTypedSelector';

export const useTokenSelector = () =>
  useTypedSelector((state: RootState) => state.token);
