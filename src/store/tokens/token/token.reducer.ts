import { HYDRATE } from 'next-redux-wrapper';

import { createSlice } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

import {
  FetchTokenActionType,
  FetchTokenSuccessActionType,
  TokenReducerType,
} from './token.types';

const initialState: TokenReducerType = {
  status: requestStatusEnum.INITIAL,
  token: {
    id: 0,
    symbol: '',
    project_name: '',
    contract_address: '',
    categories: '',
    description: '',
    twitter_screen_name: '',
    buying_power: 0,
    project_count_followers_10k: 0,
    project_count_followers_10k_scaled: 0,
    x: 0,
    y: 0,
    project_token_ranked_followers_10k: 0,
    project_token_ranked_followers_10k_scaled: 0,
    holders_value: 0,
    holders_value_scaled: 0,
    holders_count: 0,
    holders_count_scaled: 0,
    volume_to_mc: 0,
    volume_to_mc_scaled: 0,
    general_score: 0,
  },
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    fetchTokenAction: (state, { payload }: FetchTokenActionType) => {
      state.status = requestStatusEnum.LOADING;
    },
    fetchTokenSuccessAction: (
      state,
      { payload }: FetchTokenSuccessActionType,
    ) => {
      state.status = requestStatusEnum.SUCCESS;
      state.token = payload;
    },
    fetchTokenErrorAction: (state) => {
      state.status = requestStatusEnum.ERROR;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return (state = {
        ...state,
        ...action.payload.token,
      });
    },
  },
});

export const {
  fetchTokenAction,
  fetchTokenSuccessAction,
  fetchTokenErrorAction,
} = tokenSlice.actions;

export default tokenSlice.reducer;
