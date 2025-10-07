import { CartItemType } from '@/components/zustand/dto/getCart';
import { cn } from '@nextui-org/theme';
import React from 'react';
import { words } from '@/lib/word-cals';

interface Props {
  item: CartItemType['items'][];
  setModalOpen: () => void;
  open: boolean;
  modalOpen: boolean;
  totalAmount: number;
  id: number;
}

export const OrderItemBottom: React.FC<Props> = ({ item, open, totalAmount }) => {
  return (
    <div className="flex justify-between px-2 transition-all duration-150">
      <div
        className={cn(
          'flex gap-6 transition-all duration-150 ml-1',
          open ? 'opacity-0' : 'opacity-100',
        )}>
        {item
          .filter((_, i) => i < 5)
          .map((obj) => (
            <div key={obj.id} className="flex max-md:hidden">
              <div className="max-w-[70px] h-[80px] flex items-center justify-center">
                <img
                  src={obj.productItem.Img?.img[0]}
                  alt=""
                  className={cn(
                    'max-w-[70px] max-h-[80px]',
                    obj.productItem.categoryId == 4 ? 'max-w-[100px]' : '',
                  )}
                />
              </div>
            </div>
          ))}
        <div className="md:hidden mt-auto">
          <div className="mb-1 text-gray-500">Количество:</div>
          <span className="font-semibold">{item.length}</span>{' '}
          {words(item.length, ['товар', 'товара', 'товаров'])}
        </div>
      </div>
      <div className={cn('text-end transition-all mt-1', open ? 'mt-4' : '')}>
        <div className="mb-1 text-gray-500">Сумма заказа:</div>
        <div className="text-lg font-semibold">{totalAmount} ₽</div>
      </div>
    </div>
  );
};
