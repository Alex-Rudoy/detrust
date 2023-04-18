import { Layout } from '@ui/Layout';
import { TokenInfluencersSection } from './TokenInfluencersSection';
import { TokenInfoSection } from './TokenInfoSection';
import { TokenPriceChart } from './TokenPriceChart';

import { TokenPageProps } from './TokenPage.types';

export const TokenPageComponent = ({
  token,
  tokenInfluencers,
  tokenPrice,
}: TokenPageProps) => {
  return (
    <Layout
      activeMenuLink="Tokens"
      breadcrumbs={['Tokens', token.project_name]}
    >
      <TokenInfoSection token={token} />
      <TokenPriceChart tokenPrice={tokenPrice} />
      <TokenInfluencersSection tokenInfluencers={tokenInfluencers} />
    </Layout>
  );
};

TokenPageComponent.displayName = 'TokenPage';
