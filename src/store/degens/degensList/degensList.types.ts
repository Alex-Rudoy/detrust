import { AxiosResponse } from 'axios';

import { PayloadAction } from '@reduxjs/toolkit';

import { DegenType } from '@store/degens/degen/degen.types';

import { requestStatusEnum } from '@typings/requestStatus';

export type DegensListReducerType = {
  status: requestStatusEnum;
  degensList: DegenType[];
};

// actions
export type FetchDegensListForTokenActionType = PayloadAction<{
  symbol: string;
}>;
export type FetchDegensListForGroupActionType = PayloadAction<{ id: number }>;
export type FetchDegensListSuccessActionType = PayloadAction<DegenType[]>;

// api
export type FetchDegensListResponse = AxiosResponse<DegenType[]>;
