import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchGroupTokensSuccessAction,
  fetchGroupTokensAction,
} from './groupTokens.reducer';

import { logger } from '@utils/logger';
import { DegensService } from '@api/DegensService';

import {
  FetchGroupTokensActionType,
  FetchGroupTokensResponse,
} from './groupTokens.types';

function* fetchGroupTokensSaga({ payload }: FetchGroupTokensActionType) {
  try {
    const res: FetchGroupTokensResponse = yield call(
      DegensService.getGroupTokens,
      payload.id,
    );

    yield put(fetchGroupTokensSuccessAction(res.data));
  } catch (error) {
    logger(error);
  }
}

export function* groupTokensWatcher() {
  yield all([takeLatest(fetchGroupTokensAction.type, fetchGroupTokensSaga)]);
}
