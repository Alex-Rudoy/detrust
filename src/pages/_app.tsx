import type { AppProps } from 'next/app';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import '@styles/index.scss';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={router.pathname}
        classNames="pageTransition"
        timeout={300}
      >
        <Component {...pageProps} />
      </CSSTransition>
    </SwitchTransition>
  );
}
