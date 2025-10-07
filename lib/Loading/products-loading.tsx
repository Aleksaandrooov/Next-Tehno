import { Container } from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const ProductsLoading = () => {
  return (
    <Container className="max-w-[1150px] px-0">
      <div className="grid grid-cols-4 gap-[10px] max-md:gap-2 max-xl:grid-cols-3 max-[500px]:grid-cols-2">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-[390px] max-md:h-[330px]">
            <Skeleton className="w-full h-full" />
          </div>
        ))}
      </div>
    </Container>
  );
};
