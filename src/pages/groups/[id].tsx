import { END } from 'redux-saga';

import { DegenGroupPage } from '@views/DegenGroupPage';

import { SagaStore, wrapper } from '@store/index';

export default function DegenGroup() {
  return <DegenGroupPage />;
}

export const getStaticProps = wrapper.getStaticProps((store) => async (ctx) => {
  const symbol = ctx.params?.symbol as string;
  if (!symbol) {
    return {
      notFound: true,
    };
  }
  // store.dispatch(fetchTokenAction({ symbol })); // todo

  store.dispatch(END);
  await (store as SagaStore).sagaTask.toPromise();

  return {
    props: {},
    revalidate: 10,
  };
});
