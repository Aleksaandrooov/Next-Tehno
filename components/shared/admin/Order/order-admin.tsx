import { priceReplace } from '@/lib/priceReplace';
import { Order } from '@prisma/client';
import React from 'react';
import { OrderStatusArray } from './order-status-array';
import { Mail, Phone } from 'lucide-react';
import { CartItemType } from '@/components/zustand/dto/getCart';
import { OrderAdminItems } from './order-admin-items';
import { OrderAdminDelivery } from './order-admin-delivery';

export const OrderAdmin = ({
  totalAmount,
  id,
  status,
  createdAt,
  fullName,
  company,
  number,
  inn,
  cpp,
  legalAddress,
  email,
  address,
  entrance,
  floor,
  flat,
  items,
  Comment,
  type,
  price,
}: Order) => {
  const newDate = new Date();
  const item = Object.values(items as string) as unknown as CartItemType['items'][];
  return (
    <div className="flex-1 border rounded-lg p-4 sticky top-28 max-lg:top-8">
      <div className="flex items-center gap-2 text-nowrap">
        <h1 className="text-xl font-semibold max-sm:text-base">{priceReplace(totalAmount)} ₽</h1>
        <h2 className="text-xl text-gray-400 max-sm:text-base">№{id}</h2>
        <OrderStatusArray status={status} />
        <h2 className="ml-auto text-gray-400 max-sm:text-sm">
          {createdAt.getDate() + 1 === newDate.getDate()
            ? 'Вчера '
            : createdAt.getDate() === newDate.getDate()
              ? 'Сегодня '
              : (createdAt.getDate() < 10 ? 0 : '') +
                '' +
                createdAt.getDate() +
                '.' +
                (createdAt.getMonth() + 1 < 10 ? 0 : '') +
                '' +
                (createdAt.getMonth() + 1 + '.' + createdAt.getFullYear()) +
                ' '}
          {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? 0 : ''}
          {createdAt.getMinutes()}
        </h2>
      </div>
      <div className="flex gap-2 flex-wrap mt-2">
        <OrderStatusArray
          id={id}
          status={status}
          className="px-2 shadow-md rounded-lg cursor-pointer"
        />
      </div>
      <div className="mt-4">
        <h1 className="text-xl max-sm:text-base">{fullName ?? company}</h1>
        {email ? (
          <div className="text-sm">
            <div className="flex gap-1 items-center text-gray-400 mb-1 mt-1">
              <Mail size={16} strokeWidth={1.5} /> <h1>{email}</h1>
            </div>
            <div className="flex gap-1 items-center text-gray-400">
              <Phone size={16} strokeWidth={1.5} />
              <h2>
                +7 ({number?.slice(0, 3)}) {number?.slice(3, 6)} {number?.slice(6, 8)}{' '}
                {number?.slice(8, 10)}
              </h2>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-400">
            <p className="my-1">ИНН: {inn}</p>
            <p className="my-1">КПП: {cpp}</p>
            <p className="my-1">Юр.Адрес: {legalAddress}</p>
          </div>
        )}
      </div>
      <OrderAdminDelivery
        orderId={id}
        flat={flat}
        floor={floor}
        entrance={entrance}
        address={address}
        type={type}
        price={price}
      />
      {Comment && (
        <div className="mt-4">
          <h1 className="text-lg max-sm:text-base">Комментарий</h1>
          <p className="text-sm text-gray-400">{Comment}</p>
        </div>
      )}
      <div className="flex flex-col mt-4">
        <div className="flex gap-5 text-gray-400 text-sm font-semibold">
          <h2 className="ml-[90px] max-sm:ml-[70px]">Название</h2>
          <h2 className="ml-auto">Кол-во</h2>
          <h2 className="mr-2">Итого</h2>
        </div>
        {item.map((obj) => (
          <OrderAdminItems orderId={id} key={obj.id} obj={obj} />
        ))}
      </div>
    </div>
  );
};
