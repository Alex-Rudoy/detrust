import { AxiosResponse } from 'axios';

import { BadgeColorsEnum } from '@components/Badge';
import { PayloadAction } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

export type DegenTagsReducerType = {
  status: requestStatusEnum;
  degenTags: DegenTagType[];
};

// actions
export type FetchDegenTagsActionType = PayloadAction<{ username: string }>;
export type FetchDegenTagsSuccessActionType = PayloadAction<DegenTagType[]>;

// api
export type FetchDegenTagsResponse = AxiosResponse<DegenTagType[]>;

// utils
export type DegenTagType = {
  category: string;
  category_color: BadgeColorsEnum;
  category_id: number;
};
