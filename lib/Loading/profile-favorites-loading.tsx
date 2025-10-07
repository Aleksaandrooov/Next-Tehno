import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { ProfileItemLoading } from './profile-item-loading';

export const ProfileFavoritesLoading = () => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="rounded-lg border px-4 max-sm:px-2 py-3 w-max">
        <Skeleton className="h-6 w-[180px] max-sm:h-5 max-sm:w-[160px]" />
      </div>
      {[...Array(3)].map((_, i) => (
        <ProfileItemLoading key={i} />
      ))}
    </div>
  );
};
