import { HYDRATE } from 'next-redux-wrapper';

import { createSlice } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

import {
  DegenReducerType,
  FetchDegenActionType,
  FetchDegenSuccessActionType,
} from './degen.types';

const initialState: DegenReducerType = {
  status: requestStatusEnum.INITIAL,
  degen: {
    id: '',
    mentions_count: 0,
    username: '',
    project_id: '',
    price_change: 0,
    positive_mentions_count: 0,
    positive_price_change: 0,
    negative_mentions_count: 0,
    negative_price_change: 0,
    reputation: 0,
    won: 0,
  },
};

const degenSlice = createSlice({
  name: 'degen',
  initialState,
  reducers: {
    fetchDegenAction: (state, { payload }: FetchDegenActionType) => {
      state.status = requestStatusEnum.LOADING;
    },
    fetchDegenSuccessAction: (
      state,
      { payload }: FetchDegenSuccessActionType,
    ) => {
      state.status = requestStatusEnum.SUCCESS;
      state.degen = payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return (state = {
        ...state,
        ...action.payload.degen,
      });
    },
  },
});

export const { fetchDegenAction, fetchDegenSuccessAction } = degenSlice.actions;

export default degenSlice.reducer;
