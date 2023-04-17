import { GetServerSideProps } from 'next';

import { TokenPage, TokenPageProps } from '@views/TokenPage';
import { TokenService } from '@api/TokenService';

export default function TokenDetails(props: TokenPageProps) {
  return <TokenPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<TokenPageProps> = async (
  ctx,
) => {
  try {
    if (!ctx.params?.id) {
      return {
        notFound: true,
      };
    }

    const [tokenDataResponse, tokenPriceResponse, tokenInfluencersResponse] =
      await Promise.all([
        TokenService.getTokenData(ctx.params.id as string),
        TokenService.getTokenPrice(ctx.params.id as string),
        TokenService.getTokenInfluencersStat(ctx.params.id as string),
      ]);

    return {
      props: {
        token: tokenDataResponse.data,
        tokenPrice: tokenPriceResponse.data,
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
