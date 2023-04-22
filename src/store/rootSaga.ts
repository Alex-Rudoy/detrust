import { all, fork } from 'redux-saga/effects';

import { tokenWatcher } from './tokens/token/token.saga';
import { tokenConnectionsWatcher } from './tokens/tokenConnections/tokenConnections.saga';
import { tokenInfluencersWatcher } from './tokens/tokenInfluencers/tokenInfluencers.saga';
import { tokenPriceWatcher } from './tokens/tokenPrice/tokenPrice.saga';
import { tokensListWatcher } from './tokens/tokensList/tokensList.saga';

export default function* rootSaga() {
  yield all([fork(tokensListWatcher)]);
  yield all([fork(tokenConnectionsWatcher)]);

  yield all([fork(tokenWatcher)]);
  yield all([fork(tokenInfluencersWatcher)]);
  yield all([fork(tokenPriceWatcher)]);
}
