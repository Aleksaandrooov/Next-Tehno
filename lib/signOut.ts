import { signOut } from 'next-auth/react';

export const onClickSignOut = () => {
  signOut({
    callbackUrl: '/',
  });
};
