import { RootState } from '@store/index';
import { useTypedSelector } from '@store/useTypedSelector';

export const useDegensListSelector = () =>
  useTypedSelector((state: RootState) => state.degensList);
