import { RootState } from '@store/index';
import { useTypedSelector } from '@store/useTypedSelector';

export const useDegenSelector = () =>
  useTypedSelector((state: RootState) => state.degen);
