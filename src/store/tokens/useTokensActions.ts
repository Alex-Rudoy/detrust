import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTokenAction } from './token/token.reducer';
import { fetchTokenConnectionsAction } from './tokenConnections/tokenConnections.reducer';
import { fetchTokenInfluencersAction } from './tokenInfluencers/tokenInfluencers.reducer';
import { fetchTokenPriceAction } from './tokenPrice/tokenPrice.reducer';
import { fetchTokensListAction } from './tokensList/tokensList.reducer';

export const useTokensActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      fetchTokensListAction,
      fetchTokenConnectionsAction,
      fetchTokenAction,
      fetchTokenPriceAction,
      fetchTokenInfluencersAction,
    },
    dispatch,
  );
};
