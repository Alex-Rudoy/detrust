import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTokenAction } from './token/token.reducer';
import { fetchTokenConnectionsAction } from './tokenConnections/tokenConnections.reducer';
import {
  fetchTokenPriceAction,
  fetchTokenPriceForDegenAction,
} from './tokenPrice/tokenPrice.reducer';
import { fetchTokensListAction } from './tokensList/tokensList.reducer';

export const useTokensActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      fetchTokensListAction,
      fetchTokenConnectionsAction,
      fetchTokenAction,
      fetchTokenPriceAction,
      fetchTokenPriceForDegenAction,
    },
    dispatch,
  );
};
