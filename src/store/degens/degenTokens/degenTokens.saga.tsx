import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchDegenTokensSuccessAction,
  fetchDegenTokensAction,
} from './degenTokens.reducer';

import { logger } from '@utils/logger';
import { DegensService } from '@api/DegensService';

import {
  FetchDegenTokensActionType,
  FetchDegenTokensResponse,
} from './degenTokens.types';

function* fetchDegenTokensSaga({ payload }: FetchDegenTokensActionType) {
  try {
    const res: FetchDegenTokensResponse = yield call(
      DegensService.getDegenTokens,
      payload.username,
    );

    yield put(fetchDegenTokensSuccessAction(res.data));
  } catch (error) {
    logger(error);
  }
}

export function* degenTokensWatcher() {
  yield all([takeLatest(fetchDegenTokensAction.type, fetchDegenTokensSaga)]);
}
