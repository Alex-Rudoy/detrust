import { END } from 'redux-saga';

import { TokensListPage } from '@views/TokensListPage';

import { SagaStore, wrapper } from '@store/index';
import { fetchTokensListAction } from '@store/tokens/tokensList/tokensList.reducer';

export default function Tokens() {
  return <TokensListPage />;
}

export const getStaticProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(fetchTokensListAction());

    store.dispatch(END);

    await (store as SagaStore).sagaTask.toPromise();

    return {
      props: {},
    };
  },
);
