import { useEffect, useState } from 'react';
import classNames from 'classnames';
import type { AppProps } from 'next/app';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { Loader } from '@components/Loader';

import { wrapper } from '@store/index';

import '@styles/index.scss';

function App({ Component, pageProps, router }: AppProps) {
  const [loading, setLoading] = useState(false);

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
    <>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={router.pathname}
          classNames="pageTransition"
          timeout={300}
        >
          <Component {...pageProps} />
        </CSSTransition>
      </SwitchTransition>
      <div className={classNames('loaderContainer', { loading: loading })}>
        <Loader />
      </div>
    </>
  );
}

export default wrapper.withRedux(App);
