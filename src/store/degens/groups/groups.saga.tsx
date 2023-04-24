import { all, call, put, takeLatest } from 'redux-saga/effects';

import { fetchGroupsSuccessAction, fetchGroupsAction } from './groups.reducer';

import { logger } from '@utils/logger';
import { DegensService } from '@api/DegensService';

import { FetchGroupsResponse } from './groups.types';

function* fetchGroupsSaga() {
  try {
    const res: FetchGroupsResponse = yield call(DegensService.getGroups);

    yield put(fetchGroupsSuccessAction(res.data));
  } catch (error) {
    logger(error);
  }
}

export function* groupsWatcher() {
  yield all([takeLatest(fetchGroupsAction.type, fetchGroupsSaga)]);
}
