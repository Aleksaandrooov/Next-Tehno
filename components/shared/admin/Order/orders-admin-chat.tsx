import { orderStatus } from '@/lib/Arrays/order-status';
import { cn } from '@/lib/utils';
import { Order } from '@prisma/client';
import React from 'react';

export const OrdersAdminChat = ({
  status,
  totalAmount,
  id,
  fullName,
  company,
  createdAt,
  changeValue,
  value,
}: Order & { changeValue: (e: number) => void; value?: number }) => {
  const newDate = new Date();
  return (
    <div
      onClick={() => changeValue(id)}
      className={cn(
        'p-3 border-b cursor-pointer transition-all',
        value === id ? 'bg-accent' : 'hover:bg-accent',
      )}>
      <div className="flex justify-between items-center mb-1">
        {orderStatus
          .filter((obj) => obj.name == status)
          ?.map((obj, i) => (
            <div
              style={{ backgroundColor: obj.name === 'pending' ? 'green' : obj.color }}
              key={i}
              className="text-white px-2 rounded-[6px] text-nowrap text-sm">
              <div className="">{obj.name === 'pending' ? 'Новый' : obj.text}</div>
            </div>
          ))}
        <h1>{totalAmount} ₽</h1>
      </div>
      <div className="flex gap-1 items-end">
        <h1>№{id}</h1>
        <h2 className="text-gray-400 line-clamp-1 text-sm">{fullName ?? company}</h2>
        {company && <h3 className="ml-auto text-sm">(Юр.Лицо)</h3>}
      </div>
      <div className="mt-1 text-sm text-gray-400 flex justify-between">
        <h1>
          Cоздан: {createdAt.getDate() < 10 ? 0 : ''}
          {createdAt.getDate()}.{createdAt.getMonth() + 1 < 10 ? 0 : ''}
          {createdAt.getMonth() + 1}.{createdAt.getFullYear()}
        </h1>
        <span>
          {createdAt.getDate() + 1 === newDate.getDate()
            ? 'Вчера '
            : createdAt.getDate() === newDate.getDate()
              ? 'Сегодня '
              : ''}
          {createdAt.getHours() < 10 ? 0 : ''}
          {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? 0 : ''}
          {createdAt.getMinutes()}
        </span>
      </div>
    </div>
  );
};
