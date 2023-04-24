import { createHydrationSlice } from '@store/createHydrationSlice';

import { requestStatusEnum } from '@typings/requestStatus';

import {
  FetchTokenConnectionsSuccessActionType,
  TokenConnectionsReducerType,
} from './tokenConnections.types';

const initialState: TokenConnectionsReducerType = {
  status: requestStatusEnum.INITIAL,
  nodes: [],
  links: [],
};

const tokenConnectionsSlice = createHydrationSlice({
  name: 'tokenConnections',
  initialState,
  reducers: {
    fetchTokenConnectionsAction: (state) => {
      state.status = requestStatusEnum.LOADING;
    },
    fetchTokenConnectionsSuccessAction: (
      state,
      { payload }: FetchTokenConnectionsSuccessActionType,
    ) => {
      state.status = requestStatusEnum.SUCCESS;
      state.nodes = payload.nodes;
      state.links = payload.links;
    },
  },
});

export const {
  fetchTokenConnectionsAction,
  fetchTokenConnectionsSuccessAction,
} = tokenConnectionsSlice.actions;

export default tokenConnectionsSlice.reducer;
