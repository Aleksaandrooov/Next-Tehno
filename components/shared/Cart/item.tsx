'use client';

import { Minus, Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { CartItemType } from '@/components/zustand/dto/getCart';
import { CartStore } from '@/components/zustand/cart-store';
import { StarReviews } from '@/lib/components/star';
import { Button } from '@/components/ui/button';

interface Props {
  item: CartItemType['items'];
  onChangeItem: (id: number) => void;
  onCheked: Set<number>;
}

export type UpdateItemType = 'plus' | 'minus';

export const Item: React.FC<Props> = ({ onChangeItem, onCheked, item }) => {
  const { updateCart, deleteCart } = CartStore();
  const [disabled, isDisabled] = useState(false);
  const quantityNull = item.productItem.quantity == 0;

  const updateItem = (type: UpdateItemType) => {
    isDisabled(true);
    updateCart(item.id, type).then(() => isDisabled(false));
  };

  return (
    <div className="flex py-7 border-b max-h-56 relative">
      <Checkbox
        disabled={quantityNull}
        checked={onCheked.has(item.id) && true}
        onCheckedChange={() => onChangeItem(item.id)}
        id={String(item.id)}
      />
      <div className="flex items-center justify-center mx-6 w-[80px] max-sm:w-[60px] max-h-[80px] max-md:mx-2">
        <img
          src={item.productItem.Img?.img[0]}
          className={cn(
            'max-h-[85px] max-w-[80px] max-sm:max-h-[60px] max-sm:max-w-[60px]',
            item.productItem.categoryId == 4 ? 'max-sm:max-h-[36px] mt-1' : '',
          )}
        />
      </div>
      <div className="max-w-[400px] min-h-[80px] flex flex-col justify-between">
        <Link
          href={'/catalog/product/' + item.productItem.id}
          className="font-semibold cursor-pointer max-md:text-sm line-clamp-2">
          {item.productItem.title}
        </Link>
        <StarReviews item={item.productItem.reviewItem} />
      </div>
      <div className="flex ml-auto justify-between">
        {!quantityNull ? (
          <div className="flex gap-2 max-md:absolute bottom-6 right-10">
            <Button
              disabled={item.quantity == 1 || disabled}
              onClick={() => updateItem('minus')}
              size="icon"
              className="h-7 w-7"
              variant="outline">
              <Minus size={18} />
            </Button>
            <h1 className="mt-1">{item.quantity}</h1>
            <Button
              onClick={() => updateItem('plus')}
              disabled={item.quantity === item.productItem.quantity || disabled}
              size="icon"
              className="h-7 w-7"
              variant="outline">
              <Plus size={18} />
            </Button>
          </div>
        ) : (
          <div className="mr-4 max-md:absolute max-md:bottom-6 max-md:right-6 text-nowrap max-md:text-sm">
            Нет в наличии
          </div>
        )}
        <div className="">
          <div className="flex gap-2 max-md:gap-1 max-md:flex-wrap max-md:justify-between max-md:items-end max-md:h-full max-md:flex-col">
            {!quantityNull && (
              <div className="flex flex-col items-end gap-[2px] w-[130px] max-md:w-[90px]">
                <div className="font-semibold text-xl text-nowrap max-md:text-base">
                  {item.productItem.price * item.quantity} ₽
                </div>
                {item.quantity > 1 && (
                  <div className="text-sm text-gray-400 max-md:text-xs">
                    {item.productItem.price} ₽ x{item.quantity}
                  </div>
                )}
              </div>
            )}
            <X
              onClick={() => deleteCart(item.id)}
              className="cursor-pointer text-gray-400 max-md:size-6 size-7 transition-all hover:text-primary"
              strokeWidth={1.25}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
