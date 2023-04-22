import { Layout } from '@ui/Layout';

import { DegenGroupPageProps } from './DegenGroupPage.types';

export const DegenGroupPageComponent = (props: DegenGroupPageProps) => {
  return <Layout activeMenuLink="Tokens" breadcrumbs={['Tokens']}></Layout>;
};

DegenGroupPageComponent.displayName = 'DegenGroupPage';
