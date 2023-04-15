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

    const tokenData = await TokenService.getTokenData(ctx.params.id as string);

    return {
      props: { token: tokenData.data },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
