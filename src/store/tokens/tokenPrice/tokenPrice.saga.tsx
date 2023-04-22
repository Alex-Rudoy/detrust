import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchTokenPriceSuccessAction,
  fetchTokenPriceAction,
} from './tokenPrice.reducer';

import { ABsort } from '@utils/ABsort';
import {
  error_400,
  error_600,
  gray_400,
  gray_600,
  success_400,
  success_600,
} from '@utils/colors';
import { lerp } from '@utils/lerp';
import { logger } from '@utils/logger';
import { norm } from '@utils/norm';
import { TokenService } from '@api/TokenService';

import {
  FetchTokenMentionsResponse,
  FetchTokenPriceActionType,
  FetchTokenPriceResponse,
} from './tokenPrice.types';

function* fetchTokenPriceSaga({ payload }: FetchTokenPriceActionType) {
  try {
    const [tokenPriceResponse, tokenMentionsResponse]: [
      FetchTokenPriceResponse,
      FetchTokenMentionsResponse,
    ] = yield all([
      call(TokenService.getTokenPrice, payload.symbol),
      call(TokenService.getTokenMentions, payload.symbol),
    ]);

    const tokenPrice = tokenPriceResponse.data
      .map((item) => ({
        timestamp: new Date(item.dt).getTime(),
        price: item.price,
      }))
      .sort((a, b) => ABsort(a.timestamp, b.timestamp));

    const mentionsEntries = [];

    for (const mention of tokenMentionsResponse.data) {
      const timestamp = new Date(mention.content_creation_dt_h).getTime();

      for (let i = 0; i < tokenPrice.length; i++) {
        if (timestamp > tokenPrice[i].timestamp) continue;

        const normalizedTimestamp = norm(
          timestamp,
          tokenPrice[i - 1].timestamp,
          tokenPrice[i].timestamp,
        );
        const mentionPrice = lerp(
          normalizedTimestamp,
          tokenPrice[i - 1].price,
          tokenPrice[i].price,
        );

        let color = success_600;
        let stroke = success_400;

        if (mention.sentiment === -1) {
          color = error_600;
          stroke = error_400;
        }

        if (mention.sentiment_score < 0.6) {
          // can and should rewrite previous if statement
          color = gray_600;
          stroke = gray_400;
        }

        mentionsEntries.push({
          timestamp,
          price: mentionPrice,
          color,
          stroke,
        });

        break;
      }
    }

    yield put(
      fetchTokenPriceSuccessAction(
        [...tokenPrice, ...mentionsEntries].sort((a, b) =>
          ABsort(a.timestamp, b.timestamp),
        ),
      ),
    );
  } catch (error) {
    logger(error);
  }
}

export function* tokenPriceWatcher() {
  yield all([takeLatest(fetchTokenPriceAction.type, fetchTokenPriceSaga)]);
}
