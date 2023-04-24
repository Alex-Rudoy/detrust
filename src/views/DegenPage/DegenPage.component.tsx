import { useRouter } from 'next/router';

import { Layout } from '@ui/Layout';

export const DegenPageComponent = () => {
  const router = useRouter();
  const username = router.query.username as string;

  return <Layout breadcrumbs={['Degens', username]}>degen</Layout>;
};

DegenPageComponent.displayName = 'DegenPage';
