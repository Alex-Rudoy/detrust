import React from 'react';

export type ScrollingProps = React.PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  vertical?: boolean;
  onClick?: () => void;
}>;
