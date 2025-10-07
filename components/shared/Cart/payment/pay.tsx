import { Button } from '@/components/ui/button';
import { CartItemType } from '@/components/zustand/dto/getCart';
import { words } from '@/lib/word-cals';
import React from 'react';

interface Props {
  className?: string;
  totalItems: CartItemType['items'][];
  totalAmount: number;
  totalCount: number;
  loading: boolean;
  deliverySelect: { name: string; price?: number };
  inChange: 'delivery' | 'shop';
}

export const Pay: React.FC<Props> = ({
  className,
  totalItems,
  totalCount,
  totalAmount,
  loading,
  deliverySelect,
  inChange,
}) => {
  return (
    <div className={className}>
      <div className="px-6 py-5 flex max-sm:px-3 flex-col gap-5 border rounded-lg w-[450px] max-xl:w-[600px] max-sm:w-full shadow-md max-xl:mt-6">
        {totalItems.map((obj) => (
          <div key={obj.id} className="flex gap-4">
            <div className="w-[80px] max-sm:w-[58px] max-h-[60px] flex justify-center items-center">
              <img
                src={obj.productItem.Img?.img[0]}
                className="max-h-[60px] max-sm:max-h-[50px] my-auto"
              />
            </div>
            <div className="text-sm flex-1 line-clamp-3">{obj.productItem.title}</div>
            <div className="text-end font-semibold">
              <div className="">{obj.productItem.price * obj.quantity} ₽</div>
              {obj.quantity > 1 && (
                <div className="text-xs text-gray-500">
                  {obj.productItem.price} ₽ ({obj.quantity})
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg w-[450px] max-xl:w-[600px] mb-6 max-sm:w-full shadow-md mt-5 px-5 py-4 border">
        <div className="flex justify-between mb-2">
          <div className="">
            {totalCount} {words(totalCount, ['товар', 'товара', 'товаров'])}
          </div>
          <div className="">{totalAmount} ₽</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            {inChange === 'shop' ? 'Cамовывоз' : deliverySelect.name}
          </div>
          <div className="">
            {inChange === 'shop' ? 'Бесплатно' : deliverySelect.price}
            {inChange !== 'shop' && deliverySelect.price && ' ₽'}
          </div>
        </div>
        <div className="flex justify-between mt-3 items-end border-t pt-3">
          <div className="text-lg font-bold">
            К оплате: {totalAmount + (inChange === 'shop' ? 0 : deliverySelect.price || 0)} ₽
          </div>
          <div className="text-sm text-gray-500">До +6000 бонусов</div>
        </div>
        <Button
          type="submit"
          variant="secondary"
          loading={loading}
          className="mt-5 w-full h-10 text-base">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
