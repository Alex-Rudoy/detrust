import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchDegenAction } from './degen/degen.reducer';
import {
  fetchDegensListForGroupAction,
  fetchDegensListForTokenAction,
} from './degensList/degensList.reducer';
import { fetchGroupsAction } from './groups/groups.reducer';

export const useDegensActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      fetchGroupsAction,
      fetchDegensListForTokenAction,
      fetchDegensListForGroupAction,
      fetchDegenAction,
    },
    dispatch,
  );
};
