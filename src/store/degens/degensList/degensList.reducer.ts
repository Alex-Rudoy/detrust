import { createHydrationSlice } from '@store/createHydrationSlice';

import { requestStatusEnum } from '@typings/requestStatus';

import {
  DegensListReducerType,
  FetchDegensListForTokenActionType,
  FetchDegensListForGroupActionType,
  FetchDegensListSuccessActionType,
} from './degensList.types';

const initialState: DegensListReducerType = {
  status: requestStatusEnum.INITIAL,
  degensList: [],
};

const degensListSlice = createHydrationSlice({
  name: 'degensList',
  initialState,
  reducers: {
    fetchDegensListForTokenAction: (
      state,
      { payload }: FetchDegensListForTokenActionType,
    ) => {
      state.status = requestStatusEnum.LOADING;
    },
    fetchDegensListForGroupAction: (
      state,
      { payload }: FetchDegensListForGroupActionType,
    ) => {
      state.status = requestStatusEnum.LOADING;
    },
    fetchDegensListSuccessAction: (
      state,
      { payload }: FetchDegensListSuccessActionType,
    ) => {
      state.status = requestStatusEnum.SUCCESS;
      state.degensList = payload;
    },
  },
});

export const {
  fetchDegensListForTokenAction,
  fetchDegensListForGroupAction,
  fetchDegensListSuccessAction,
} = degensListSlice.actions;

export const degensListReducer = degensListSlice.reducer;
