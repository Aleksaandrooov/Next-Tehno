import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const CartPricesLoading = () => {
  return (
    <div className="w-[400px] mt-14 max-xl:mt-6 max-xl:w-[600px] max-lg:w-full mx-auto max-md:mx-4">
      <Skeleton className="h-[70px] max-md:mx-4 max-md:h-[60px]" />
      <Skeleton className="h-[200px] max-md:h-[150px] my-4 max-md:mx-4" />
      <Skeleton className="h-8 mt-8 w-[220px]" />
    </div>
  );
};
