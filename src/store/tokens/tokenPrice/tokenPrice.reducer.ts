import { HYDRATE } from 'next-redux-wrapper';

import { createSlice } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

import {
  FetchTokenPriceActionType,
  FetchTokenPriceSuccessActionType,
  TokenPriceReducerType,
} from './tokenPrice.types';

const initialState: TokenPriceReducerType = {
  status: requestStatusEnum.INITIAL,
  tokenPrice: [],
};

const tokenPriceSlice = createSlice({
  name: 'tokenPrice',
  initialState,
  reducers: {
    fetchTokenPriceAction: (state, { payload }: FetchTokenPriceActionType) => {
      state.status = requestStatusEnum.LOADING;
    },
    fetchTokenPriceSuccessAction: (
      state,
      { payload }: FetchTokenPriceSuccessActionType,
    ) => {
      state.status = requestStatusEnum.SUCCESS;
      state.tokenPrice = payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return (state = {
        ...state,
        ...action.payload.tokenPrice,
      });
    },
  },
});

export const { fetchTokenPriceAction, fetchTokenPriceSuccessAction } =
  tokenPriceSlice.actions;

export default tokenPriceSlice.reducer;
