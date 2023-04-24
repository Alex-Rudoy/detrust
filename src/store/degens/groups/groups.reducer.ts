import { HYDRATE } from 'next-redux-wrapper';

import { createSlice } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

import {
  FetchGroupsSuccessActionType,
  GroupsReducerType,
} from './groups.types';

const initialState: GroupsReducerType = {
  status: requestStatusEnum.INITIAL,
  groups: [],
};

const groupsSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    fetchGroupsAction: (state) => {
      state.status = requestStatusEnum.LOADING;
    },
    fetchGroupsSuccessAction: (
      state,
      { payload }: FetchGroupsSuccessActionType,
    ) => {
      state.status = requestStatusEnum.SUCCESS;
      state.groups = payload;
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

export const { fetchGroupsAction, fetchGroupsSuccessAction } =
  groupsSlice.actions;

export default groupsSlice.reducer;
