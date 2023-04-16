import { useEffect, useState } from 'react';
import classNames from 'classnames';
import type { AppProps } from 'next/app';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { IconsEnum, SvgIcon } from '@components/SvgIcon';
import '@styles/index.scss';

export default function App({ Component, pageProps, router }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      return;
    };

    const handleRouteComplete = () => {
      setLoading(false);
      return;
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
        <SvgIcon src={IconsEnum.loader} size={40} className="loader" />
      </div>
    </>
  );
}
