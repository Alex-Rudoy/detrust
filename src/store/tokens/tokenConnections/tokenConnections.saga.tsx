import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchTokenConnectionsAction,
  fetchTokenConnectionsSuccessAction,
} from './tokenConnections.reducer';

import { primary_400, success_400 } from '@utils/colors';
import { logger } from '@utils/logger';
import { TokenService } from '@api/TokenService';

import {
  FetchTokenConnectionsResponse,
  GraphNode,
  TokenConnectionType,
} from './tokenConnections.types';

function* fetchTokenConnectionsSaga() {
  try {
    const res: FetchTokenConnectionsResponse = yield call(
      TokenService.getTokenConnections,
    );

    const links = res.data.map((connection) => {
      return {
        source: connection.follower_username,
        target: connection.username,
      };
    });

    //? unique keys with actual data in values
    const tokensObj: Record<string, TokenConnectionType> = res.data.reduce(
      (acc, connection) => ({ ...acc, [connection.username]: connection }),
      {},
    );

    const usersSet = new Set(
      res.data.map((connection) => connection.follower_username),
    );

    //? use token keys to filter out users that are not users
    for (const user of usersSet) {
      if (tokensObj[user]) {
        usersSet.delete(user);
      }
    }

    const tokenNodes: GraphNode[] = Object.values(tokensObj).map(
      (connection) => ({
        id: connection.username,
        type: 'tokens',
        link: connection.symbol,
        symbol: connection.symbol,
        label: connection.username,
        color: primary_400,
        neighbors: [],
        links: [],
      }),
    );

    const userNodes: GraphNode[] = [...usersSet].map((username) => ({
      id: username,
      type: 'degens',
      link: username,
      label: username,
      color: success_400,
      neighbors: [],
      links: [],
    }));

    const nodes = [...tokenNodes, ...userNodes];

    yield put(fetchTokenConnectionsSuccessAction({ nodes, links }));
  } catch (error) {
    logger(error);
  }
}

export function* tokenConnectionsWatcher() {
  yield all([
    takeLatest(fetchTokenConnectionsAction.type, fetchTokenConnectionsSaga),
  ]);
}
