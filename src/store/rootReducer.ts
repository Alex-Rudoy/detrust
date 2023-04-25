import { combineReducers } from '@reduxjs/toolkit';
import { degenInfoReducer } from './degens/degenInfo/degenInfo.reducer';
import { degensListReducer } from './degens/degensList/degensList.reducer';
import { degenTagsReducer } from './degens/degenTags/degenTags.reducer';
import { degenTokensReducer } from './degens/degenTokens/degenTokens.reducer';
import { groupsReducer } from './degens/groups/groups.reducer';
import { groupTokensReducer } from './degens/groupTokens/groupTokens.reducer';
import { tokenReducer } from './tokens/token/token.reducer';
import { tokenConnectionsReducer } from './tokens/tokenConnections/tokenConnections.reducer';
import { tokenPriceReducer } from './tokens/tokenPrice/tokenPrice.reducer';
import { tokensListReducer } from './tokens/tokensList/tokensList.reducer';

export default combineReducers({
  // tokens
  tokensList: tokensListReducer,
  tokenConnections: tokenConnectionsReducer,
  token: tokenReducer,
  tokenPrice: tokenPriceReducer,

  // degens
  groups: groupsReducer,
  groupTokens: groupTokensReducer,
  degensList: degensListReducer,
  degenInfo: degenInfoReducer,
  degenTags: degenTagsReducer,
  degenTokens: degenTokensReducer,
});
