import { TokenService } from '@api/TokenService';
import { TokensPage, TokensPageProps } from '@views/TokensPage';

export default function Tokens(props: TokensPageProps) {
  return <TokensPage {...props} />;
}

export async function getServerSideProps() {
  const [tokensResponse, tokenConnectionsResponse] = await Promise.all([
    TokenService.getTokens(),
    TokenService.getTokenConnections(),
  ]);
  const tokens = tokensResponse.data;
  const tokenConnections = tokenConnectionsResponse.data;
  return {
    props: {
      tokens,
      tokenConnections,
    },
  };
}
