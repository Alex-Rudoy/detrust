import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({ children }: PropsWithChildren) =>
  createPortal(
    children,
    document.getElementById('main_portal_target') ||
      document.getElementById('root') ||
      document.body,
  );
