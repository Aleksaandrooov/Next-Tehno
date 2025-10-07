'use client';

import React from 'react';
import { Container } from '../container';
import { ProductCart } from '../ProductCart';
import { CartItemType } from '@/components/zustand/dto/getCart';
import { PaginationCatalog } from './pagination-catalog';
import { filterStore } from '@/components/zustand/filter-store';
import { cn } from '@/lib/utils';

interface Props {
  products: CartItemType['items']['productItem'][];
  count: number;
  catalog?: boolean;
  search: string;
}

export default function ContainerProduct({ products, count, catalog, search }: Props) {
  const { open } = filterStore();

  return (
    <Container className="max-w-[1150px] px-0">
      <div
        className={cn(
          'grid grid-cols-4 gap-[10px] max-md:gap-0 max-lg:grid-cols-3 max-[500px]:grid-cols-2',
          open && catalog ? 'max-xl:grid-cols-3' : '',
        )}>
        {products.map((obj) => (
          <ProductCart key={obj.id} {...obj} />
        ))}
      </div>
      <PaginationCatalog className="mx-auto mt-10" search={search} length={count} />
    </Container>
  );
}
