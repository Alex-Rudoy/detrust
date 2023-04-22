import { HYDRATE } from 'next-redux-wrapper';

import { createSlice } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

import {
  FetchTokenConnectionsSuccessActionType,
  TokenConnectionsReducerType,
} from './tokenConnections.types';

const initialState: TokenConnectionsReducerType = {
  status: requestStatusEnum.INITIAL,
  nodes: [],
  links: [],
};

const tokenConnectionsSlice = createSlice({
  name: 'tokenConnections',
  initialState,
  reducers: {
    fetchTokenConnectionsAction: (state) => {
      state.status = requestStatusEnum.LOADING;
    },
    fetchTokenConnectionsSuccessAction: (
      state,
      { payload }: FetchTokenConnectionsSuccessActionType,
    ) => {
      state.status = requestStatusEnum.SUCCESS;
      state.nodes = payload.nodes;
      state.links = payload.links;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return (state = {
        ...state,
        ...action.payload.tokenConnections,
      });
    },
  },
});

export const {
  fetchTokenConnectionsAction,
  fetchTokenConnectionsSuccessAction,
} = tokenConnectionsSlice.actions;

export default tokenConnectionsSlice.reducer;
