import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchTokenSuccessAction,
  fetchTokenAction,
  fetchTokenErrorAction,
} from './token.reducer';

import { logger } from '@utils/logger';
import { TokenService } from '@api/TokenService';

import { FetchTokensResponse } from '../tokensList/tokensList.types';
import { FetchTokenActionType } from './token.types';

function* fetchTokenSaga({ payload }: FetchTokenActionType) {
  try {
    const res: FetchTokensResponse = yield call(
      TokenService.getTokenData,
      payload.symbol,
    );

    if (res.data.length) {
      yield put(fetchTokenSuccessAction(res.data[0]));
    } else {
      yield put(fetchTokenErrorAction());
    }
  } catch (error) {
    logger(error);
  }
}

export function* tokenWatcher() {
  yield all([takeLatest(fetchTokenAction.type, fetchTokenSaga)]);
}
