'use client';

import React from 'react';
import { ProfileModal } from '../Modal/profile-modal';
import { useSession } from 'next-auth/react';
import { DrawerProfile } from './drawer-profile';
import { Button } from '@/components/ui/button';
import { ScanFace } from 'lucide-react';

export const Profile = ({ role }: { role?: 'USER' | 'ADMIN' }) => {
  const { status } = useSession();

  return (
    <>
      {status === 'loading' ? (
        <Button
          variant="ghost"
          disabled={true}
          className="px-3 max-sm:text-xs text-sm w-10 max-sm:w-[34px]">
          <ScanFace size={22} strokeWidth={1.75} />
        </Button>
      ) : status === 'authenticated' ? (
        <DrawerProfile role={role} />
      ) : (
        <ProfileModal
          text="Войти"
          className="flex-col text-primary gap-0 px-0 hover:bg-white max-sm:text-xs text-sm"
        />
      )}
    </>
  );
};
