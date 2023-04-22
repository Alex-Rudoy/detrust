import { HYDRATE } from 'next-redux-wrapper';

import { createSlice } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

import {
  FetchTokensListSuccessActionType,
  TokensListReducerType,
} from './tokensList.types';

const initialState: TokensListReducerType = {
  status: requestStatusEnum.INITIAL,
  tokensList: [],
  tokenBoundaries: {
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
  },
};

const tokensListSlice = createSlice({
  name: 'tokensList',
  initialState,
  reducers: {
    fetchTokensListAction: (state) => {
      state.status = requestStatusEnum.LOADING;
    },
    fetchTokensListSuccessAction: (
      state,
      { payload }: FetchTokensListSuccessActionType,
    ) => {
      state.status = requestStatusEnum.SUCCESS;
      state.tokensList = payload.tokensList;
      state.tokenBoundaries = payload.tokenBoundaries;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return (state = {
        ...state,
        ...action.payload.tokensList,
      });
    },
  },
});

export const { fetchTokensListAction, fetchTokensListSuccessAction } =
  tokensListSlice.actions;

export default tokensListSlice.reducer;
