import { createHydrationSlice } from '@store/createHydrationSlice';

import { requestStatusEnum } from '@typings/requestStatus';

import {
  FetchGroupsSuccessActionType,
  GroupsReducerType,
} from './groups.types';

const initialState: GroupsReducerType = {
  status: requestStatusEnum.INITIAL,
  groups: [],
};

const groupsSlice = createHydrationSlice({
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
});

export const { fetchGroupsAction, fetchGroupsSuccessAction } =
  groupsSlice.actions;

export default groupsSlice.reducer;
