import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({ children }: PropsWithChildren) =>
  typeof window !== 'undefined'
    ? createPortal(children, document?.getElementById('root') || document?.body)
    : children;
