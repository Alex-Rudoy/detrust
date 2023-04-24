import { createHydrationSlice } from '@store/createHydrationSlice';

import { requestStatusEnum } from '@typings/requestStatus';

import {
  GroupTokensReducerType,
  FetchGroupTokensActionType,
  FetchGroupTokensSuccessActionType,
} from './groupTokens.types';

const initialState: GroupTokensReducerType = {
  status: requestStatusEnum.INITIAL,
  groupTokens: [],
};

const groupTokensSlice = createHydrationSlice({
  name: 'groupTokens',
  initialState,
  reducers: {
    fetchGroupTokensAction: (
      state,
      { payload }: FetchGroupTokensActionType,
    ) => {
      state.status = requestStatusEnum.LOADING;
    },
    fetchGroupTokensSuccessAction: (
      state,
      { payload }: FetchGroupTokensSuccessActionType,
    ) => {
      state.status = requestStatusEnum.SUCCESS;
      state.groupTokens = payload;
    },
  },
});

export const { fetchGroupTokensAction, fetchGroupTokensSuccessAction } =
  groupTokensSlice.actions;

export default groupTokensSlice.reducer;
