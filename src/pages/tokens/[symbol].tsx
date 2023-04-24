import { END } from 'redux-saga';

import { TokenPage } from '@views/TokenPage';

import { TokenService } from '@api/TokenService';
import { SagaStore, wrapper } from '@store/index';
import { fetchTokenAction } from '@store/tokens/token/token.reducer';

export default function TokenDetails() {
  return <TokenPage />;
}

export const getStaticProps = wrapper.getStaticProps((store) => async (ctx) => {
  const symbol = ctx.params?.symbol as string;
  if (!symbol) {
    return {
      notFound: true,
    };
  }
  store.dispatch(fetchTokenAction({ symbol }));

  store.dispatch(END);
  await (store as SagaStore).sagaTask.toPromise();

  if (!store.getState().token.token.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
    revalidate: 10,
  };
});

export async function getStaticPaths() {
  const res = await TokenService.getTokens();

  const paths = res.data.map(({ symbol }) => ({
    params: { symbol },
  }));

  return { paths, fallback: 'blocking' };
}
