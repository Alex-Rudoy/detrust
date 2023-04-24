import { api } from '.';

import { FetchDegenResponse } from '@store/degens/degen/degen.types';
import { FetchDegensListResponse } from '@store/degens/degensList/degensList.types';
import { FetchGroupsResponse } from '@store/degens/groups/groups.types';
import { FetchGroupTokensResponse } from '@store/degens/groupTokens/groupTokens.types';

export const DegensService = {
  getGroups(): Promise<FetchGroupsResponse> {
    return api.get('/general/groupList');
  },

  getGroupTokens(id: number): Promise<FetchGroupTokensResponse> {
    return api.get(`/general/groupProjects/${id}`);
  },

  getGroupDegens(id: number): Promise<FetchDegensListResponse> {
    return api.get(`/general/getProjectInfluencersStatByGroup/${id}`);
  },

  getDegen(username: string): Promise<FetchDegenResponse> {
    return api.get(`/general/getDegen/${username}`);
  },
};
