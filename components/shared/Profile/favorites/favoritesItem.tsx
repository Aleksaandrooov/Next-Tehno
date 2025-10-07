import { favoritesType } from '@/app/services/dto/favoritesType';
import { ButtonAddCart } from '@/lib/components/button-add-cart';
import { ButtonAddFavorites } from '@/lib/components/button-add-favorites';
import { QuantityProduct } from '@/lib/components/quantityProduct';
import { StarReviews } from '@/lib/components/star';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

export const FavoritesItem = ({ productItem }: favoritesType['items']) => {
  return (
    <div className="rounded-lg border shadow-md p-5 flex gap-1 max-md:p-3">
      <div className="w-[100px] max-md:h-[90px] max-md:w-[70px] max-md:mr-2 h-[120px] max-sm:w-[50px] max-sm:h-[80px] flex items-center mr-4 justify-center">
        <img src={productItem.Img.img[0]} className="max-md:max-h-[80px] max-sm:max-h-[70px]"></img>
      </div>
      <Link
        href={'/catalog/product/' + productItem.id}
        className="flex-1 max-md:text-sm flex flex-col justify-between">
        <h2 className="line-clamp-5 max-md:line-clamp-3 max-sm:text-xs">{productItem.title}</h2>
        <div className="flex gap-3 items-center max-sm:mt-1">
          {productItem.reviewItem?.length ? <StarReviews item={productItem.reviewItem} /> : <></>}
          <QuantityProduct count={productItem.quantity} />
        </div>
      </Link>
      <div className="flex flex-col max-sm:justify-end items-end justify-between relative">
        <h2
          className={cn(
            'text-xl font-medium max-sm:hidden',
            productItem.quantity == 0 ? 'text-gray-500/80' : '',
          )}>
          {productItem.price} ₽
        </h2>
        <div className="flex gap-3">
          <ButtonAddFavorites id={productItem.id} className="w-11 max-md:w-8 max-md:h-8" />
          <ButtonAddCart
            reduce={true}
            count={productItem.quantity}
            id={productItem.id}
            className={
              productItem.quantity > 0
                ? 'w-[110px] max-md:h-8 max-md:w-[90px] max-md:text-xs max-sm:hidden'
                : 'w-[140px] max-md:h-8 max-md:w-[120px] max-md:text-xs'
            }
          />
        </div>
      </div>
    </div>
  );
};
