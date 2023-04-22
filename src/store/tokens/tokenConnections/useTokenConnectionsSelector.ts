import { RootState } from '@store/index';
import { useTypedSelector } from '@store/useTypedSelector';

export const useTokenConnectionsSelector = () =>
  useTypedSelector((state: RootState) => state.tokenConnections);
