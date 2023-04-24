import { combineReducers } from '@reduxjs/toolkit';
import degenReducer from './degens/degen/degen.reducer';
import degensListReducer from './degens/degensList/degensList.reducer';
import groupsReducer from './degens/groups/groups.reducer';
import tokenReducer from './tokens/token/token.reducer';
import tokenConnectionsReducer from './tokens/tokenConnections/tokenConnections.reducer';
import tokenPriceReducer from './tokens/tokenPrice/tokenPrice.reducer';
import tokensListReducer from './tokens/tokensList/tokensList.reducer';

export default combineReducers({
  // tokens
  tokensList: tokensListReducer,
  tokenConnections: tokenConnectionsReducer,
  token: tokenReducer,
  tokenPrice: tokenPriceReducer,

  // degens
  groups: groupsReducer,
  degensList: degensListReducer,
  degen: degenReducer,
});
