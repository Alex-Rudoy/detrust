import { createSlice } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

import {
  FetchTokenPriceActionType,
  FetchTokenPriceForDegenActionType,
  FetchTokenPriceSuccessActionType,
  TokenPriceReducerType,
} from './tokenPrice.types';

const initialState: TokenPriceReducerType = {
  status: requestStatusEnum.INITIAL,
  tokenPrice: [],
  mentions: [],
};

const tokenPriceSlice = createSlice({
  name: 'tokenPrice',
  initialState,
  reducers: {
    fetchTokenPriceAction: (state, { payload }: FetchTokenPriceActionType) => {
      state.status = requestStatusEnum.LOADING;
    },
    fetchTokenPriceForDegenAction: (
      state,
      { payload }: FetchTokenPriceForDegenActionType,
    ) => {
      state.status = requestStatusEnum.LOADING;
    },
    fetchTokenPriceSuccessAction: (
      state,
      { payload }: FetchTokenPriceSuccessActionType,
    ) => {
      state.status = requestStatusEnum.SUCCESS;
      state.tokenPrice = payload.tokenPrice;
      state.mentions = payload.mentions;
    },
  },
});

export const {
  fetchTokenPriceAction,
  fetchTokenPriceForDegenAction,
  fetchTokenPriceSuccessAction,
} = tokenPriceSlice.actions;

export const tokenPriceReducer = tokenPriceSlice.reducer;
