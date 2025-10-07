'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { useMedia } from 'react-use';
import { Toaster } from 'sonner';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const mediaQuery = useMedia('only screen and (max-width : 1024px)', false);

  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            width: mediaQuery ? 340 : undefined,
            top: !mediaQuery ? 95 : 30,
          },
        }}
        closeButton
      />
    </>
  );
};
