import { all, fork } from 'redux-saga/effects';

import { degenInfoWatcher } from './degens/degenInfo/degenInfo.saga';
import { degensListWatcher } from './degens/degensList/degensList.saga';
import { degenTagsWatcher } from './degens/degenTags/degenTags.saga';
import { degenTokensWatcher } from './degens/degenTokens/degenTokens.saga';
import { groupsWatcher } from './degens/groups/groups.saga';
import { groupTokensWatcher } from './degens/groupTokens/groupTokens.saga';
import { tokenWatcher } from './tokens/token/token.saga';
import { tokenConnectionsWatcher } from './tokens/tokenConnections/tokenConnections.saga';
import { tokenPriceWatcher } from './tokens/tokenPrice/tokenPrice.saga';
import { tokensListWatcher } from './tokens/tokensList/tokensList.saga';

export default function* rootSaga() {
  yield all([
    // tokens
    fork(tokensListWatcher),
    fork(tokenConnectionsWatcher),
    fork(tokenWatcher),
    fork(tokenPriceWatcher),

    // degens
    fork(groupsWatcher),
    fork(groupTokensWatcher),
    fork(degensListWatcher),
    fork(degenInfoWatcher),
    fork(degenTagsWatcher),
    fork(degenTokensWatcher),
  ]);
}
