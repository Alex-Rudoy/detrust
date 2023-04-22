import { GetServerSideProps } from 'next';

import { TokenPage, TokenPageProps } from '@views/TokenPage';

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
import { norm } from '@utils/norm';
import { TokenService } from '@api/TokenService';

import { TokenMentionType, TokenPriceChartItemType } from '@typings/tokens';

export default function TokenDetails(props: TokenPageProps) {
  return <TokenPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<TokenPageProps> = async (
  ctx,
) => {
  try {
    const symbol = ctx.params?.symbol as string;
    if (!symbol) {
      return {
        notFound: true,
      };
    }

    const [
      tokenDataResponse,
      tokenPriceResponse,
      tokenInfluencersResponse,
      tokenMentionsResponse,
    ] = await Promise.all([
      TokenService.getTokenData(symbol),
      TokenService.getTokenPrice(symbol),
      TokenService.getTokenInfluencersStat(symbol),
      TokenService.getTokenMentions(symbol),
    ]);

    console.log(tokenInfluencersResponse.data);

    const tokenPrice = tokenPriceResponse.data
      .map((item) => ({
        timestamp: new Date(item.dt).getTime(),
        price: item.price,
      }))
      .sort((a, b) => ABsort(a.timestamp, b.timestamp));

    const mentionsEntries = getMentionsEntries(
      tokenMentionsResponse.data,
      tokenPrice,
    );

    return {
      props: {
        token: tokenDataResponse.data[0],
        tokenPrice: [...tokenPrice, ...mentionsEntries].sort((a, b) =>
          ABsort(a.timestamp, b.timestamp),
        ),
        tokenInfluencers: tokenInfluencersResponse.data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

function getMentionsEntries(
  mentions: TokenMentionType[],
  tokenPrice: TokenPriceChartItemType[],
) {
  const result = [];

  for (const mention of mentions) {
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

      result.push({
        timestamp,
        price: mentionPrice,
        color,
        stroke,
      });

      break;
    }
  }

  return result;
}
