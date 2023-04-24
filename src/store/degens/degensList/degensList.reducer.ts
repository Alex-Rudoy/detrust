import { HYDRATE } from 'next-redux-wrapper';

import { createSlice } from '@reduxjs/toolkit';

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

const degensListSlice = createSlice({
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
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return (state = {
        ...state,
        ...action.payload.degensList,
      });
    },
  },
});

export const {
  fetchDegensListForTokenAction,
  fetchDegensListForGroupAction,
  fetchDegensListSuccessAction,
} = degensListSlice.actions;

export default degensListSlice.reducer;
