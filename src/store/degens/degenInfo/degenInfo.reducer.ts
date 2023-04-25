import { createHydrationSlice } from '@store/createHydrationSlice';

import { requestStatusEnum } from '@typings/requestStatus';

import {
  DegenInfoReducerType,
  FetchDegenInfoActionType,
  FetchDegenInfoSuccessActionType,
} from './degenInfo.types';

const initialState: DegenInfoReducerType = {
  status: requestStatusEnum.INITIAL,
  degenInfo: {
    assets: 0,
    assets_scaled: 0,
    big_followers: 0,
    big_followers_scaled: 0,
    followers_count: 0,
    followers_count_scaled: 0,
    general_score: 0,
    influence: 0,
    influence_scaled: 0,
    popularity: 0,
    popularity_scaled: 0,
    price_change: 0,
    price_change_scaled: 0,
    user_id: '',
    username: '',
  },
};

const degenInfoSlice = createHydrationSlice({
  name: 'degenInfo',
  initialState,
  reducers: {
    fetchDegenInfoAction: (state, { payload }: FetchDegenInfoActionType) => {
      state.status = requestStatusEnum.LOADING;
    },
    fetchDegenInfoSuccessAction: (
      state,
      { payload }: FetchDegenInfoSuccessActionType,
    ) => {
      state.status = requestStatusEnum.SUCCESS;
      state.degenInfo = payload;
    },
    fetchDegenInfoErrorAction: (state) => {
      state.status = requestStatusEnum.ERROR;
    },
  },
});

export const {
  fetchDegenInfoAction,
  fetchDegenInfoSuccessAction,
  fetchDegenInfoErrorAction,
} = degenInfoSlice.actions;

export const degenInfoReducer = degenInfoSlice.reducer;
