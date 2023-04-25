import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchDegenTagsSuccessAction,
  fetchDegenTagsAction,
} from './degenTags.reducer';

import { logger } from '@utils/logger';
import { DegensService } from '@api/DegensService';

import {
  FetchDegenTagsActionType,
  FetchDegenTagsResponse,
} from './degenTags.types';

function* fetchDegenTagsSaga({ payload }: FetchDegenTagsActionType) {
  try {
    const res: FetchDegenTagsResponse = yield call(
      DegensService.getDegenTags,
      payload.username,
    );

    yield put(fetchDegenTagsSuccessAction(res.data));
  } catch (error) {
    logger(error);
  }
}

export function* degenTagsWatcher() {
  yield all([takeLatest(fetchDegenTagsAction.type, fetchDegenTagsSaga)]);
}
