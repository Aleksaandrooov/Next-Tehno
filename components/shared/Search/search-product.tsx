'use client';

import { ProductType } from '@/app/services/dto/searchItemsType';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

export const SearchProduct = ({
  click,
  product,
  className,
}: {
  click?: () => void;
  product: ProductType;
  className?: string;
}) => {
  return (
    <Link
      href={'/catalog/product/' + product.id}
      onClick={() => click?.()}
      className={cn(
        'h-[220px] w-[180px] max-sm:w-[160px] max-sm:h-[190px] text-center flex flex-col group',
        className,
      )}>
      <div className="flex-1 min-w-[180px] max-sm:min-w-[160px]">
        <div className="h-[100px] px-6 my-3 flex max-sm:h-[80px] justify-center items-center">
          <img
            src={product.Img?.img[0]}
            alt=""
            className="max-h-[80px] max-sm:max max-sm:max-h-[70px] max-w-[150px] transition-all group-hover:scale-110"
          />
        </div>
        <h1 className="px-2 text-ellipsis line-clamp-3 text-sm max-sm:text-xs">{product.title}</h1>
      </div>
      <span className="text-base font-semibold mb-2 mt-auto max-sm:text-sm">{product.price} ₽</span>
    </Link>
  );
};
