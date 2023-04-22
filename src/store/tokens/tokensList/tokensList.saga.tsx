import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchTokensListAction,
  fetchTokensListSuccessAction,
} from './tokensList.reducer';

import { logger } from '@utils/logger';
import { TokenService } from '@api/TokenService';

import { FetchTokensResponse } from './tokensList.types';

function* fetchTokensSaga() {
  try {
    const res: FetchTokensResponse = yield call(TokenService.getTokens);

    const tokens = res.data;

    let minX = tokens.reduce(
      (acc, token) => (token.x < acc ? token.x : acc),
      Infinity,
    );
    let maxX = tokens.reduce(
      (acc, token) => (token.x > acc ? token.x : acc),
      -Infinity,
    );
    let minY = tokens.reduce(
      (acc, token) => (token.y < acc ? token.y : acc),
      Infinity,
    );
    let maxY = tokens.reduce(
      (acc, token) => (token.y > acc ? token.y : acc),
      -Infinity,
    );

    const deltaX = (maxX - minX) * 0.05;
    const deltaY = (maxY - minY) * 0.05;

    minX -= deltaX;
    maxX += deltaX;
    minY -= deltaY;
    maxY += deltaY;

    const tokenBoundaries = { minX, maxX, minY, maxY };

    yield put(
      fetchTokensListSuccessAction({ tokensList: res.data, tokenBoundaries }),
    );
  } catch (error) {
    logger(error);
  }
}

export function* tokensListWatcher() {
  yield all([takeLatest(fetchTokensListAction.type, fetchTokensSaga)]);
}

// function getBoundaries(tokens: TokenType[]) {
// }
