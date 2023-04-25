import { RootState } from '@store/index';
import { useTypedSelector } from '@store/useTypedSelector';

export const useDegenTagsSelector = () =>
  useTypedSelector((state: RootState) => state.degenTags);
