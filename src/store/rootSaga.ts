import { all, fork } from 'redux-saga/effects';

import { degenWatcher } from './degens/degen/degen.saga';
import { degensListWatcher } from './degens/degensList/degensList.saga';
import { groupsWatcher } from './degens/groups/groups.saga';
import { tokenWatcher } from './tokens/token/token.saga';
import { tokenConnectionsWatcher } from './tokens/tokenConnections/tokenConnections.saga';
import { tokenPriceWatcher } from './tokens/tokenPrice/tokenPrice.saga';
import { tokensListWatcher } from './tokens/tokensList/tokensList.saga';

export default function* rootSaga() {
  yield all([
    fork(tokensListWatcher),
    fork(tokenConnectionsWatcher),
    fork(tokenWatcher),
    fork(tokenPriceWatcher),

    fork(groupsWatcher),
    fork(degensListWatcher),
    fork(degenWatcher),
  ]);
}
