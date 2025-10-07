import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const CartITemsLoading = () => {
  return (
    <div className="flex-auto flex-col">
      <Skeleton className="w-36 h-12" />
      <div className="flex justify-between mt-10 max-md:mt-6">
        <Skeleton className="w-32 h-8" />
        <Skeleton className="w-[180px] h-8" />
      </div>
      <div className="w-full">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[80px] my-4 first:mt-6" />
        ))}
      </div>
    </div>
  );
};
