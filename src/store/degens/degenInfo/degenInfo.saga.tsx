import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchDegenInfoSuccessAction,
  fetchDegenInfoAction,
  fetchDegenInfoErrorAction,
} from './degenInfo.reducer';

import { logger } from '@utils/logger';
import { DegensService } from '@api/DegensService';

import {
  FetchDegenInfoActionType,
  FetchDegenInfoResponse,
} from './degenInfo.types';

function* fetchDegenInfoSaga({ payload }: FetchDegenInfoActionType) {
  try {
    const res: FetchDegenInfoResponse = yield call(
      DegensService.getDegen,
      payload.username,
    );

    if (res.data.length) {
      yield put(fetchDegenInfoSuccessAction(res.data[0]));
    } else {
      yield put(fetchDegenInfoErrorAction());
    }
  } catch (error) {
    logger(error);
  }
}

export function* degenInfoWatcher() {
  yield all([takeLatest(fetchDegenInfoAction.type, fetchDegenInfoSaga)]);
}
