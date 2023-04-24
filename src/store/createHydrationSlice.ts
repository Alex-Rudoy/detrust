import { CreateSliceOptions, createSlice } from '@reduxjs/toolkit';

export const createHydrationSlice = (config: CreateSliceOptions) =>
  createSlice({
    ...config,
    extraReducers: {
      ...config.extraReducers,
      HYDRATE: (state, action) => {
        return (state = {
          ...state,
          ...action.payload[config.name],
        });
      },
    },
  });
