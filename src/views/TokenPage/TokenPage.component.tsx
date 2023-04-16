import { Layout } from '@ui/Layout';
import { TokenInfoSection } from './TokenInfoSection';
import { TokenPageProps } from './TokenPage.types';

export const TokenPageComponent = ({ token }: TokenPageProps) => {
  return (
    <Layout
      activeMenuLink="Tokens"
      breadcrumbs={['Tokens', token.project_name]}
    >
      <TokenInfoSection token={token} />
    </Layout>
  );
};

TokenPageComponent.displayName = 'TokenPage';
