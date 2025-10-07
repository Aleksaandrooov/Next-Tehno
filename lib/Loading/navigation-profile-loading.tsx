import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const NavigationProfileLoading = () => {
  return (
    <div className="w-[260px] max-lg:hidden shrink-0 h-full py-6 border rounded-lg flex flex-col gap-5">
      <Skeleton className="h-8 w-[180px] mx-4" />
      <Skeleton className="h-8 w-[80px] mx-4" />
      <Skeleton className="h-8 w-[100px] mx-4" />
      <Skeleton className="h-8 w-[120px] mx-4" />
    </div>
  );
};
