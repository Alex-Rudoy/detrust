import { GetStaticProps } from 'next';

import { NotFoundPage } from '@views/NotFoundPage';

export default function Tokens() {
  return <NotFoundPage />;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
