import { CartItemType } from '@/components/zustand/dto/getCart';
import { Tailwind } from '@react-email/components';
import { Check, ChevronRight, SquarePen } from 'lucide-react';
import React from 'react';

interface Props {
  items: CartItemType['items'][];
  token: string;
  totalAmount: number;
}

export const CreateOrder: React.FC<Props> = ({ items, token, totalAmount }) => {
  return (
    <Tailwind>
      <h2>Заказ №{token.slice(0, 8).toUpperCase()}</h2>
      <h3 className="text-center flex gap-2 items-center">
        <SquarePen size={18} /> Ваш заказ успешно создан
      </h3>
      <div className="mb-2 py-3 bg-gray-200 px-4 text-black rounded-md flex flex-col gap-2">
        {items.map((obj) => (
          <div key={obj.id} className="flex gap-2">
            <Check className="shrink-0" size={20} />{' '}
            <a href={'http://localhost:3000/catalog/product/' + obj.productItem.id}>
              {obj.productItem.title}
            </a>{' '}
            <div className="">
              <span className="text-nowrap">{obj.productItem.price} ₽</span>{' '}
              <span className="text-nowrap">({obj.quantity} шт.)</span>
            </div>
          </div>
        ))}
        <h4 className="mx-auto">На сумму: {totalAmount} ₽</h4>
      </div>
      <div className="my-3 pb-2 flex items-center gap-1 flex-wrap">
        Также вы можете посмотреть статус своего заказа в{' '}
        <a href="http://localhost:3000/profile">Профиль</a> <ChevronRight />{' '}
        <a href="http://localhost:3000/profile/orders">Мои заказы</a>.
      </div>
    </Tailwind>
  );
};
