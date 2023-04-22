import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchTokenInfluencersSuccessAction,
  fetchTokenInfluencersAction,
} from './tokenInfluencers.reducer';

import { logger } from '@utils/logger';
import { TokenService } from '@api/TokenService';

import {
  FetchTokenInfluencersActionType,
  FetchTokenInfluencersResponse,
} from './tokenInfluencers.types';

function* fetchTokenInfluencersSaga({
  payload,
}: FetchTokenInfluencersActionType) {
  try {
    const res: FetchTokenInfluencersResponse = yield call(
      TokenService.getTokenInfluencersStat,
      payload.symbol,
    );

    yield put(fetchTokenInfluencersSuccessAction(res.data));
  } catch (error) {
    logger(error);
  }
}

export function* tokenInfluencersWatcher() {
  yield all([
    takeLatest(fetchTokenInfluencersAction.type, fetchTokenInfluencersSaga),
  ]);
}
