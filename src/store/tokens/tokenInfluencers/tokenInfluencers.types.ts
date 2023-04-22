import { AxiosResponse } from 'axios';

import { PayloadAction } from '@reduxjs/toolkit';

import { DegenType } from '@typings/degens';
import { requestStatusEnum } from '@typings/requestStatus';

export type TokenInfluencersReducerType = {
  status: requestStatusEnum;
  tokenInfluencers: DegenType[];
};

// actions
export type FetchTokenInfluencersActionType = PayloadAction<{ symbol: string }>;
export type FetchTokenInfluencersSuccessActionType = PayloadAction<DegenType[]>;

// api
export type FetchTokenInfluencersResponse = AxiosResponse<DegenType[]>;
