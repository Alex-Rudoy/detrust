import { createHydrationSlice } from '@store/createHydrationSlice';

import { requestStatusEnum } from '@typings/requestStatus';

import {
  DegenTokensReducerType,
  FetchDegenTokensActionType,
  FetchDegenTokensSuccessActionType,
} from './degenTokens.types';

const initialState: DegenTokensReducerType = {
  status: requestStatusEnum.INITIAL,
  degenTokens: [],
};

const degenTokensSlice = createHydrationSlice({
  name: 'degenTokens',
  initialState,
  reducers: {
    fetchDegenTokensAction: (
      state,
      { payload }: FetchDegenTokensActionType,
    ) => {
      state.status = requestStatusEnum.LOADING;
    },
    fetchDegenTokensSuccessAction: (
      state,
      { payload }: FetchDegenTokensSuccessActionType,
    ) => {
      state.status = requestStatusEnum.SUCCESS;
      state.degenTokens = payload;
    },
  },
});

export const { fetchDegenTokensAction, fetchDegenTokensSuccessAction } =
  degenTokensSlice.actions;

export const degenTokensReducer = degenTokensSlice.reducer;
