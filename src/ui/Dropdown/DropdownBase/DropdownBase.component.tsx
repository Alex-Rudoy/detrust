import {
  useState,
  useRef,
  useImperativeHandle,
  PropsWithChildren,
  forwardRef,
  MouseEvent,
} from 'react';
import classNames from 'classnames';
import { usePopper } from 'react-popper';

import { Portal } from '@components/Portal';
import { Scrolling } from '@components/Scrolling';

import { DropdownBaseProps } from './DropdownBase.types';

import styles from './DropdownBase.module.scss';

export const DropdownBaseComponent = forwardRef<
  { forceUpdatePosition: () => void },
  PropsWithChildren<DropdownBaseProps>
>(
  (
    {
      caller,
      disabled,
      maxHeight = 185,
      children,
      customState,
      placement = 'bottom',
      offsetMain = 0,
      offsetSide = 0,
      className,
      dontCloseOnInnerClick = false,
      style,
      onClickOutsideCallback,
      containerClass,
    },
    ref,
  ) => {
    const [defaultIsOpen, setDefaultIsOpen] = useState(false);
    const [isOpen, setIsOpen] = customState || [
      defaultIsOpen,
      setDefaultIsOpen,
    ];
    const [callerRef, setCallerRef] = useState<HTMLDivElement | null>();
    const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>();
    const backdropRef = useRef<HTMLDivElement>(null);

    const { styles: popperStyles, update } = usePopper(callerRef, dropdownRef, {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [offsetSide, offsetMain],
          },
        },
        {
          name: 'preventOverflow',
          options: {
            mainAxis: true,
            altAxis: true,
          },
        },
      ],
    });

    useImperativeHandle(ref, () => ({
      forceUpdatePosition() {
        update?.();
      },
    }));

    const dropdownClass = classNames(
      styles.dropdown,
      { [styles.dropdown_open]: isOpen },
      className,
    );

    const toggleDropdown = () => {
      update?.();
      !disabled && setIsOpen(!isOpen);
    };

    const backdropClick = (e: MouseEvent) => {
      if (e.target === backdropRef.current && isOpen) {
        onClickOutsideCallback && onClickOutsideCallback();
        toggleDropdown();
      }
    };

    const handleClick = (e: MouseEvent) => {
      if ((e?.target as HTMLDivElement)?.classList?.contains('removeItem')) {
        return;
      }
      toggleDropdown();
    };

    return (
      <div className={classNames(styles.container, containerClass)}>
        <div
          className={classNames(styles.caller, { [styles.disable]: disabled })}
          onClick={handleClick}
          ref={(ref) => setCallerRef(ref)}
        >
          {caller}
        </div>
        <Portal>
          <div
            className={classNames(styles.backdrop, {
              [styles.backdrop_active]: isOpen,
            })}
            onClick={backdropClick}
            ref={backdropRef}
          >
            <Scrolling
              vertical
              className={dropdownClass}
              style={{
                maxHeight: `${maxHeight}px`,
                ...popperStyles.popper,
                ...style,
              }}
              ref={(ref) => setDropdownRef(ref)}
              onClick={() => {
                if (!dontCloseOnInnerClick && isOpen) {
                  toggleDropdown();
                }
              }}
            >
              {children}
            </Scrolling>
          </div>
        </Portal>
      </div>
    );
  },
);

DropdownBaseComponent.displayName = 'DropdownBase';
