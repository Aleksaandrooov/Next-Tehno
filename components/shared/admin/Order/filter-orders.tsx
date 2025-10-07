import { Button } from '@/components/ui/button';
import { priceReplace } from '@/lib/priceReplace';
import { ShoppingBasket } from 'lucide-react';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Order, Status } from '@prisma/client';
import { orderStatus } from '@/lib/Arrays/order-status';
import { valueStatusType } from './orders';
import { Checkbox } from '@/components/ui/checkbox';
import { arrayDelivery } from '@/lib/Arrays/arrayDelivery';
import { deliveryType } from '@/lib/deliveryType';

interface Props {
  className?: string;
  value: valueStatusType;
  changeValue: (e: valueStatusType) => void;
  orders: Order[];
  changeStatus: (e: Status | 'all') => void;
  changeDelivery: (e: deliveryType) => void;
  changeChecked: () => void;
  pd: boolean;
  changePd: () => void;
  checked: boolean;
  statusOrder: Status | 'all';
}

export const FilterOrders: React.FC<Props> = ({
  changeValue,
  value,
  orders,
  changeChecked,
  changeStatus,
  checked,
  changeDelivery,
  statusOrder,
  changePd,
  pd,
}) => {
  const countPending = orders.filter((obj) => obj.status === 'pending').length;
  const price = orders.reduce((sum, acc) => {
    return sum + (acc.status === 'pending' ? acc.totalAmount : 0);
  }, 0);
  return (
    <div className="mb-2">
      <div className="flex gap-2 mb-2">
        {countPending && countPending > 0 && (
          <Button
            onClick={() => {
              changeValue('pending');
              changeStatus('all');
            }}
            variant={value === 'pending' ? 'secondary' : 'outline'}
            className="flex-1 flex-col items-stretch h-auto border">
            <div className="flex justify-between items-center text-gray-400">
              <h1 className="text-2xl">{countPending}</h1>
              <h2>{priceReplace(price)} ₽</h2>
            </div>
            <h1 className="mr-auto">В обработке</h1>
          </Button>
        )}
        <Button
          onClick={() => changeValue('all')}
          variant={value === 'all' ? 'secondary' : 'outline'}
          className="flex-1 flex-col items-stretch h-auto border">
          <div className="flex justify-between items-center">
            <ShoppingBasket size={32} strokeWidth={1.5} />
            <h1>{orders.length}</h1>
          </div>
          <h1 className="mr-auto">Все заказы</h1>
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        {value !== 'pending' && (
          <Select
            value={statusOrder}
            onValueChange={(e: Status | 'all') => changeStatus(e)}
            defaultValue="all">
            <SelectTrigger className="gap-1 overflow-hidden">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Статус</SelectItem>
              {orderStatus.map((obj, i) => (
                <SelectItem value={obj.name} key={i}>
                  {obj.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <Select onValueChange={(e: deliveryType) => changeDelivery(e)} defaultValue="all">
          <SelectTrigger className="overflow-hidden">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Доставка</SelectItem>
            <SelectItem value="shop">Самовывоз</SelectItem>
            {arrayDelivery.map((obj, i) => (
              <SelectItem key={i} value={obj.name}>
                {obj.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <div className="gap-1 flex items-center">
          <Checkbox checked={pd} onCheckedChange={changePd} id="pd" />
          <label className="text-sm" htmlFor="pd">
            Юр лицо
          </label>
        </div>
        {value !== 'pending' && (
          <div className="gap-1 flex items-center">
            <Checkbox checked={checked} onCheckedChange={changeChecked} id="end" />
            <label className="text-sm" htmlFor="end">
              Заверш.
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
