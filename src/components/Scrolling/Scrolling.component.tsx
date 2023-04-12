import classNames from 'classnames';
import React from 'react';

import styles from './Scrolling.module.scss';
import { ScrollingProps } from './Scrolling.types';

export const ScrollingComponent = React.forwardRef<
  HTMLDivElement,
  ScrollingProps
>(({ horizontal, vertical, onClick, className, style, children }, ref) => {
  const scrollingClass = classNames(
    styles.scrolling,
    {
      [styles[`scrolling_horizontal`]]: horizontal,
      [styles[`scrolling_vertical`]]: vertical,
    },
    className
  );

  return (
    <div ref={ref} className={scrollingClass} style={style} onClick={onClick}>
      {children}
    </div>
  );
});

ScrollingComponent.displayName = 'Scrolling';
