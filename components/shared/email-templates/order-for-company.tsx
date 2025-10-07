import { CartItemType } from '@/components/zustand/dto/getCart';
import { Tailwind } from '@react-email/components';
import { Check } from 'lucide-react';
import React from 'react';
import { TFormDelivery } from '../form/shemas';

interface Props {
  items: CartItemType['items'][];
  token: string;
  delivery?: TFormDelivery;
  number: string;
}

export const OrderForCompany: React.FC<Props> = ({ items, token, number, delivery }) => {
  return (
    <Tailwind>
      <h2>Новый заказ №{token.slice(0, 8).toUpperCase()}</h2>
      <div className="mb-2 py-3 bg-white px-4 text-black rounded-md flex flex-col gap-2">
        {items.map((obj) => (
          <div key={obj.id} className="flex gap-2">
            <Check className="shrink-0" size={20} />{' '}
            <a href={'http://localhost:3000/catalog/product/' + obj.productItem.id}>
              {obj.productItem.title}
            </a>{' '}
            <div className="">
              <span className="text-nowrap">{obj.productItem.price} ₽ </span>
              <span className="text-nowrap">({obj.quantity} шт.)</span>
            </div>
          </div>
        ))}
      </div>
      <div className="my-3 pb-2 flex flex-col gap-1">
        <span>
          Телефон: +7 ({number?.slice(0, 3)}) {number?.slice(3, 6)} {number?.slice(6, 8)}{' '}
          {number?.slice(8, 10)}
        </span>
        {delivery ? (
          <h4>
            Доставка: {delivery.address}, подъезд: {delivery.entrance}, этаж: {delivery.floor},
            квартира: {delivery.flat}, {delivery.comment && 'комментарий: ' + delivery.comment}
          </h4>
        ) : (
          <h3>Самовывоз</h3>
        )}
      </div>
    </Tailwind>
  );
};
