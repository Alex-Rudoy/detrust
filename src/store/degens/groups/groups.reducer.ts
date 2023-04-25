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
  name: 'groups',
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
});

export const { fetchGroupsAction, fetchGroupsSuccessAction } =
  groupsSlice.actions;

export const groupsReducer = groupsSlice.reducer;
