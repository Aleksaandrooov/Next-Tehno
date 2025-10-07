'use client';

import { Order } from '@prisma/client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Phone, Store, Truck } from 'lucide-react';
import { CartItemType } from '@/components/zustand/dto/getCart';
import { OrderItemsProduct } from './order-items-product';
import { OrderItemBottom } from './order-item-bottom';
import { OrderStatus } from './order-status';

export const OrderItems = ({
  id,
  items,
  createdAt,
  status,
  totalAmount,
  number,
  price,
  address,
}: Order) => {
  const item = Object.values(items as string) as unknown as CartItemType['items'][];
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      className={cn(
        'border h-[170px] rounded-lg p-4 flex flex-col transition-all shadow-md relative',
        open ? 'h-full' : '',
      )}>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'cursor-pointer flex items-center border-b pb-2 gap-4 max-md:gap-2 transition-all',
          open ? 'mb-3 max-md:mb-0' : 'mb-0',
        )}>
        <div className="flex justify-between gap-2 max-md:gap-2 max-md:w-auto max-md:text-sm">
          <div className="font-semibold max-sm:hidden">Заказ: №{id}</div>
          <div className="font-semibold sm:hidden">
            <span className="max-sm:hidden">Заказ:</span> №{id}
          </div>
          <div className="">
            от: {createdAt.getDate() < 10 ? 0 : ''}
            {createdAt.getDate()}.{createdAt.getMonth() + 1 < 10 ? 0 : ''}
            {createdAt.getMonth() + 1}.{createdAt.getFullYear()}
          </div>
        </div>
        <OrderStatus status={status} id={id} />
        <ChevronDown
          color="gray"
          className={cn('transition duration-400', open ? '-scale-100' : '')}
        />
      </div>
      <div
        className={cn(
          'flex justify-between items-center transition-all px-1',
          open
            ? '-translate-y-0 pointer-events-auto opacity-100 pb-5 pt-2 border-b mb-3 max-md:pb-7'
            : '-translate-y-4 pointer-events-none opacity-0',
        )}>
        <div className="flex gap-1 items-center text-sm">
          <Phone color="gray" size={20} strokeWidth={1} />
          <div className="text-gray-500">Телефон:</div>
          <div className="max-md:absolute max-md:mt-12">
            +7 ({number?.slice(0, 3)}) {number?.slice(3, 6)} {number?.slice(6, 8)}{' '}
            {number?.slice(8, 10)}
          </div>
        </div>
        {address ? (
          <div className="flex gap-1 items-center text-sm flex-1 justify-end">
            <Truck size={20} strokeWidth={1} />
            <div className="text-gray-500">Доставка:</div>
            <div className="max-md:absolute max-md:mt-12">{address}</div>
            {price && <span className="text-gray-500">({price} ₽)</span>}
          </div>
        ) : (
          <div className="flex gap-1 text-gray-500 text-sm">
            В магазине <Store size={20} strokeWidth={1} />
          </div>
        )}
      </div>
      <OrderItemsProduct open={open} item={item} />
      <OrderItemBottom
        id={id}
        modalOpen={modalOpen}
        setModalOpen={() => setModalOpen((prev) => prev)}
        item={item}
        open={open}
        totalAmount={totalAmount}
      />
    </div>
  );
};
