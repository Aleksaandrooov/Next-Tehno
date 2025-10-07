import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const ProfileItemLoading = () => {
  return (
    <div className="border rounded-lg p-4 flex gap-3">
      <Skeleton className="w-[100px] max-md:h-[80px] max-md:w-[64px] h-[120px] max-sm:w-[50px] max-sm:h-[60px] shrink-0" />
      <Skeleton className="flex-1 h-14" />
      <div className="flex flex-col justify-between max-sm:justify-end">
        <Skeleton className="ml-auto h-9 w-[80px] max-sm:hidden" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-[110px] max-sm:hidden" />
        </div>
      </div>
    </div>
  );
};
