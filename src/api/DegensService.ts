import { api } from '.';
import { AxiosResponse } from 'axios';

import { DegenType, GroupShortType } from '@typings/degens';

export const DegensService = {
  getGroups(): Promise<AxiosResponse<GroupShortType[]>> {
    return api.get('/general/groupList');
  },

  getGroupProjects(id: string): Promise<AxiosResponse<any[]>> {
    return api.get(`/general/groupProjects/${id}`);
  },

  getGroupDegens(id: string): Promise<AxiosResponse<DegenType[]>> {
    return api.get(`/general/getProjectInfluencersStatByGroup/${id}`);
  },
};
