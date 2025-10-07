'use client';

import { Order, Status } from '@prisma/client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { FilterOrders } from './filter-orders';
import { OrdersAdminChat } from './orders-admin-chat';
import { OrderAdmin } from './order-admin';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { deliveryType } from '@/lib/deliveryType';

export type valueStatusType = 'all' | 'pending';

export const Orders = ({ orders }: { orders: Order[] }) => {
  const [filterOrder, isFilterOrder] = useState<'all' | 'pending'>('all');
  const [statusOrder, isStatusOrder] = useState<Status | 'all'>('all');
  const [deliveryOrder, isDeliveryOrder] = useState<deliveryType>('all');
  const [ordersEnd, isOrdersEnd] = useState(false);
  const [ordersPd, isOrdersPd] = useState(false);
  const [value, setValue] = useState('');
  const [order, setOrder] = useState<number | undefined>(undefined);

  const ordersFilter = orders
    ?.filter((obj) => obj.id.toString().includes(value))
    .filter((obj) => (filterOrder === 'all' ? obj : obj.status === 'pending'))
    .filter((obj) => (ordersEnd ? obj : obj.status !== 'fulfilled' && obj.status !== 'delivered'))
    .filter((obj) => (!ordersPd ? obj : obj.company))
    .filter((obj) => (statusOrder === 'all' ? obj : obj.status === statusOrder))
    .filter((obj) =>
      deliveryOrder === 'shop'
        ? !obj.address
        : deliveryOrder === 'all'
          ? obj
          : obj.type === deliveryOrder,
    );

  return (
    <div className="w-full">
      <div className="flex gap-5">
        <div className={order ? 'max-lg:hidden w-[340px] max-w-[340px]' : 'max-lg:flex-1 w-full'}>
          <FilterOrders
            changeDelivery={(e) => isDeliveryOrder(e)}
            value={filterOrder}
            checked={ordersEnd}
            pd={ordersPd}
            changePd={() => isOrdersPd((prev) => !prev)}
            statusOrder={statusOrder}
            changeValue={(e) => isFilterOrder(e)}
            orders={orders}
            changeStatus={(e) => isStatusOrder(e)}
            changeChecked={() => isOrdersEnd((prev) => !prev)}
          />
          <div className="mb-2 text-sm gap-2 flex justify-between items-center">
            <Input
              className="flex-1 text-sm"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Поиск по номеру заказа..."
            />
            <span>кол-во: {ordersFilter.length}</span>
          </div>
          {ordersFilter.map((obj) => (
            <OrdersAdminChat changeValue={(e) => setOrder(e)} value={order} {...obj} key={obj.id} />
          ))}
        </div>
        <div className={order ? 'flex-1' : 'max-lg:hidden'}>
          <Button
            className={cn('mb-2 gap-1 px-2', order ? '' : 'hidden')}
            variant="outline"
            onClick={() => setOrder(undefined)}>
            <ChevronLeft size={18} /> Назад
          </Button>
          {orders
            .filter((obj) => obj.id === order)
            .map((obj) => (
              <OrderAdmin key={obj.id} {...obj} />
            ))}
        </div>
      </div>
    </div>
  );
};
