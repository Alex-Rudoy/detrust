import { RootState } from '@store/index';
import { useTypedSelector } from '@store/useTypedSelector';

export const useDegenInfoSelector = () =>
  useTypedSelector((state: RootState) => state.degenInfo);
