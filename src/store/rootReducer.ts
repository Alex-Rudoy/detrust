import { combineReducers } from '@reduxjs/toolkit';
import tokenReducer from './tokens/token/token.reducer';
import tokenConnectionsReducer from './tokens/tokenConnections/tokenConnections.reducer';
import tokenInfluencersReducer from './tokens/tokenInfluencers/tokenInfluencers.reducer';
import tokenPriceReducer from './tokens/tokenPrice/tokenPrice.reducer';
import tokensListReducer from './tokens/tokensList/tokensList.reducer';

export default combineReducers({
  // tokens
  tokensList: tokensListReducer,
  tokenConnections: tokenConnectionsReducer,
  token: tokenReducer,
  tokenInfluencers: tokenInfluencersReducer,
  tokenPrice: tokenPriceReducer,
});
