import { HYDRATE } from 'next-redux-wrapper';

import {
  CreateSliceOptions,
  Slice,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';

export const createHydrationSlice = <
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string,
>(
  options: CreateSliceOptions<State, CaseReducers, Name>,
): Slice<State, CaseReducers, Name> =>
  createSlice({
    ...options,
    extraReducers: {
      ...options.extraReducers,
      [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload[options.name],
      }),
    },
  });
