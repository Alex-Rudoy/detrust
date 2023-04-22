import { useEffect, useState } from 'react';
import classNames from 'classnames';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { Loader } from '@components/Loader';

import { wrapper } from '@store/index';

import '@styles/index.scss';

function App({ Component, router, ...rest }: AppProps) {
  const [loading, setLoading] = useState(false);
  const { store, props } = wrapper.useWrappedStore(rest);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };

    const handleRouteComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteComplete);
    };
  }, []);

  return (
    <Provider store={store}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={router.pathname}
          classNames="pageTransition"
          timeout={300}
        >
          <Component {...props.pageProps} />
        </CSSTransition>
      </SwitchTransition>
      <div className={classNames('loaderContainer', { loading: loading })}>
        <Loader />
      </div>
    </Provider>
  );
}

export default App;
