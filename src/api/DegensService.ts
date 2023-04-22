import { api } from '.';

import { ApiPromise } from '@typings/apiPromise';
import { DegenType, GroupShortType } from '@typings/degens';

export const DegensService = {
  getGroups(): ApiPromise<GroupShortType[]> {
    return api.get('/general/groupList');
  },

  getGroupProjects(id: string): ApiPromise<any[]> {
    return api.get(`/general/groupProjects/${id}`);
  },

  getGroupDegens(id: string): ApiPromise<DegenType[]> {
    return api.get(`/general/getProjectInfluencersStatByGroup/${id}`);
  },
};
