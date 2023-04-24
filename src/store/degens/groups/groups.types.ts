import { AxiosResponse } from 'axios';

import { PayloadAction } from '@reduxjs/toolkit';

import { requestStatusEnum } from '@typings/requestStatus';

export type GroupsReducerType = {
  status: requestStatusEnum;
  groups: GroupShortType[];
};

// actions
export type FetchGroupsSuccessActionType = PayloadAction<GroupShortType[]>;

// api
export type FetchGroupsResponse = AxiosResponse<GroupShortType[]>;

// utils
export type GroupShortType = {
  category: string;
  category_id: number;
};
