import { Layout } from '@ui/Layout';
import { TokenPageProps } from './TokenPage.types';

export const TokenPageComponent = ({ token }: TokenPageProps) => {
  return (
    <Layout
      activeMenuLink="Tokens"
      breadcrumbs={['Tokens', token.project_name]}
    >
      Content
    </Layout>
  );
};

TokenPageComponent.displayName = 'TokenPage';
