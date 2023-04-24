import { api } from '.';
import { AxiosResponse } from 'axios';

import { FetchDegenResponse } from '@store/degens/degen/degen.types';
import { FetchDegensListResponse } from '@store/degens/degensList/degensList.types';
import { GroupShortType } from '@store/degens/groups/groups.types';

export const DegensService = {
  getGroups(): Promise<AxiosResponse<GroupShortType[]>> {
    return api.get('/general/groupList');
  },

  getGroupProjects(id: string): Promise<AxiosResponse<any[]>> {
    return api.get(`/general/groupProjects/${id}`);
  },

  getGroupDegens(id: number): Promise<FetchDegensListResponse> {
    return api.get(`/general/getProjectInfluencersStatByGroup/${id}`);
  },

  getDegen(username: string): Promise<FetchDegenResponse> {
    return api.get(`/general/getDegen/${username}`);
  },
};
