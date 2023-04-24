import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchDegensListSuccessAction,
  fetchDegensListForTokenAction,
  fetchDegensListForGroupAction,
} from './degensList.reducer';

import { logger } from '@utils/logger';
import { DegensService } from '@api/DegensService';
import { TokenService } from '@api/TokenService';

import {
  FetchDegensListForGroupActionType,
  FetchDegensListForTokenActionType,
  FetchDegensListResponse,
} from './degensList.types';

function* fetchDegensListForTokenSaga({
  payload,
}: FetchDegensListForTokenActionType) {
  try {
    const res: FetchDegensListResponse = yield call(
      TokenService.getTokenInfluencersStat,
      payload.symbol,
    );

    yield put(fetchDegensListSuccessAction(res.data));
  } catch (error) {
    logger(error);
  }
}

function* fetchDegensListForGroupSaga({
  payload,
}: FetchDegensListForGroupActionType) {
  try {
    const res: FetchDegensListResponse = yield call(
      DegensService.getGroupDegens,
      payload.id,
    );

    yield put(fetchDegensListSuccessAction(res.data));
  } catch (error) {
    logger(error);
  }
}

export function* degensListWatcher() {
  yield all([
    takeLatest(fetchDegensListForTokenAction.type, fetchDegensListForTokenSaga),
    takeLatest(fetchDegensListForGroupAction.type, fetchDegensListForGroupSaga),
  ]);
}
