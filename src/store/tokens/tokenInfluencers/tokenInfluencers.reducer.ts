import { HYDRATE } from 'next-redux-wrapper';

import { createSlice } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

import {
  TokenInfluencersReducerType,
  FetchTokenInfluencersActionType,
  FetchTokenInfluencersSuccessActionType,
} from './tokenInfluencers.types';

const initialState: TokenInfluencersReducerType = {
  status: requestStatusEnum.INITIAL,
  tokenInfluencers: [],
};

const tokenInfluencersSlice = createSlice({
  name: 'tokenInfluencers',
  initialState,
  reducers: {
    fetchTokenInfluencersAction: (
      state,
      { payload }: FetchTokenInfluencersActionType,
    ) => {
      state.status = requestStatusEnum.LOADING;
    },
    fetchTokenInfluencersSuccessAction: (
      state,
      { payload }: FetchTokenInfluencersSuccessActionType,
    ) => {
      state.status = requestStatusEnum.SUCCESS;
      state.tokenInfluencers = payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return (state = {
        ...state,
        ...action.payload.tokenInfluencers,
      });
    },
  },
});

export const {
  fetchTokenInfluencersAction,
  fetchTokenInfluencersSuccessAction,
} = tokenInfluencersSlice.actions;

export default tokenInfluencersSlice.reducer;
