import { RootState } from '@store/index';
import { useTypedSelector } from '@store/useTypedSelector';

export const useGroupsSelector = () =>
  useTypedSelector((state: RootState) => state.groups);
