import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchDegenSuccessAction,
  fetchDegenAction,
  fetchDegenErrorAction,
} from './degen.reducer';

import { logger } from '@utils/logger';
import { DegensService } from '@api/DegensService';

import { FetchDegenActionType, FetchDegenResponse } from './degen.types';

function* fetchDegenSaga({ payload }: FetchDegenActionType) {
  try {
    const res: FetchDegenResponse = yield call(
      DegensService.getDegen,
      payload.username,
    );

    if (res.data.length) {
      yield put(fetchDegenSuccessAction(res.data[0]));
    } else {
      yield put(fetchDegenErrorAction());
    }
  } catch (error) {
    logger(error);
  }
}

export function* degenWatcher() {
  yield all([takeLatest(fetchDegenAction.type, fetchDegenSaga)]);
}
