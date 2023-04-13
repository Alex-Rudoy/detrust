import React, { PropsWithChildren, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import { Portal } from '@components/Portal';
import { Scrolling } from '@components/Scrolling';
import { IconsEnum, SvgIcon } from '@components/SvgIcon';
import { ModalSideProps } from './ModalSide.types';

import styles from './ModalSide.module.scss';

export const ModalSideComponent = ({
  isVisible,
  backdrop = true,
  children,
  className,
  renderCustomCross,
  onClose,
}: PropsWithChildren<ModalSideProps>) => {
  const backdropRef = useRef(null);

  const backdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const trackEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        onClose();
      }
    };

    window.addEventListener('keydown', trackEsc);

    return () => {
      window.removeEventListener('keydown', trackEsc);
    };
  }, [onClose]);

  const backdropClass = classNames(styles.backdrop, {
    [styles.backdrop_enabled]: backdrop,
  });

  const cross = renderCustomCross ? (
    renderCustomCross(onClose)
  ) : (
    <div className={styles.cross} onClick={onClose}>
      <SvgIcon src={IconsEnum.cross} size={20} />
    </div>
  );

  return (
    <Portal>
      <CSSTransition
        in={isVisible}
        classNames="sideModalTransition"
        timeout={300}
        unmountOnExit
      >
        <div
          className={backdropClass}
          onClick={backdropClick}
          ref={backdropRef}
        >
          <div className={styles.container}>
            {cross}
            <Scrolling
              vertical
              className={classNames(styles.side_modal, className)}
            >
              {children}
            </Scrolling>
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

ModalSideComponent.displayName = 'ModalSide';
