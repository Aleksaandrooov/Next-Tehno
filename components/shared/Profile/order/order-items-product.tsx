import { CartItemType } from '@/components/zustand/dto/getCart';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface Props {
  open: boolean;
  item: CartItemType['items'][];
}

export const OrderItemsProduct: React.FC<Props> = ({ open, item }) => {
  return (
    <div
      className={cn(
        'flex flex-col transition-all max-h-0 border-b',
        open
          ? 'opacity-100 overflow-auto scroll__hidden pointer-events-auto max-h-[500px] pt-1 pb-4 gap-6'
          : 'opacity-0 pointer-events-none',
      )}>
      {item.map((obj) => (
        <div key={obj.id} className="flex items-center">
          <Link
            href={'/catalog/product/' + obj.productItem.id}
            className="w-[110px] h-[90px] max-md:w-[60px] max-md:h-[80px] flex items-center justify-center">
            <img
              src={obj.productItem.Img?.img[0]}
              alt=""
              className={cn(
                'max-w-[70px] max-h-[90px] max-md:max-h-[70px] max-md:max-w-[60px] flex items-center justify-center',
                obj.productItem.categoryId == 4
                  ? 'max-w-[110px] max-h-[100px] max-md:max-w-[80px] max-md:max-h-[70px]'
                  : '',
              )}
            />
          </Link>
          <div className="flex flex-1 max-md:flex-col relative">
            <div className="flex-1 ml-5 max-md:ml-3">
              <Link
                href={'/catalog/product/' + obj.productItem.id}
                className="max-w-[450px] max-md:text-sm line-clamp-2">
                {obj.productItem.title}
              </Link>
              <div className="text-gray-500 text-sm">Код товара: {obj.productItem.id}</div>
            </div>
            <div className="max-md:absolute right-0 -bottom-1 max-md:flex-col-reverse max-md:flex">
              <div className="flex gap-1 justify-end items-center">
                <div className="max-md:text-sm">Цена:</div>
                <div className="text-lg max-md:text-base font-semibold">
                  {obj.productItem.price * obj.quantity} ₽{' '}
                  <span className="sm:hidden text-sm text-gray-500">({obj.quantity})</span>
                </div>
              </div>
              <div className="text-sm text-gray-500 text-end max-md:text-xs max-sm:hidden">
                {obj.quantity} шт.{' '}
                <span className="max-md:hidden">x {obj.productItem.price} ₽</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
