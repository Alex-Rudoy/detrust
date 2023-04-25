import { createHydrationSlice } from '@store/createHydrationSlice';

import { requestStatusEnum } from '@typings/requestStatus';

import {
  DegenTagsReducerType,
  FetchDegenTagsActionType,
  FetchDegenTagsSuccessActionType,
} from './degenTags.types';

const initialState: DegenTagsReducerType = {
  status: requestStatusEnum.INITIAL,
  degenTags: [],
};

const degenTagsSlice = createHydrationSlice({
  name: 'degenTags',
  initialState,
  reducers: {
    fetchDegenTagsAction: (state, { payload }: FetchDegenTagsActionType) => {
      state.status = requestStatusEnum.LOADING;
    },
    fetchDegenTagsSuccessAction: (
      state,
      { payload }: FetchDegenTagsSuccessActionType,
    ) => {
      state.status = requestStatusEnum.SUCCESS;
      state.degenTags = payload;
    },
  },
});

export const { fetchDegenTagsAction, fetchDegenTagsSuccessAction } =
  degenTagsSlice.actions;

export const degenTagsReducer = degenTagsSlice.reducer;
