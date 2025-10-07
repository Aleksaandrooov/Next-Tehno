import { settingOrder } from '@/app/admin';
import { orderStatus } from '@/lib/Arrays/order-status';
import { cn } from '@/lib/utils';
import { Status } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  status?: Status;
  className?: string;
  id?: number;
}

export const OrderStatusArray: React.FC<Props> = ({ status, className, id }) => {
  const router = useRouter();
  const changeOrderStatus = (e: Status) => {
    if (id) {
      settingOrder(e, id);
      router.refresh();
    }
  };

  return (
    <>
      {orderStatus
        .filter((obj) => (!className ? obj.name === status : obj.name !== status))
        ?.map((obj, i) => (
          <div
            onClick={() => changeOrderStatus(obj.name as Status)}
            key={i}
            className={cn('flex items-center gap-1', className)}>
            <div
              className={cn(
                'rounded-full',
                !className ? 'w-4 h-4 max-sm:w-3 max-sm:h-3' : 'w-3 max-sm:h-2 h-3 max-sm:w-2',
              )}
              style={{ backgroundColor: obj.name === 'pending' ? 'green' : obj.color }}></div>
            <h1
              className={!className ? 'text-lg max-sm:text-base' : 'text-base max-sm:text-sm'}
              style={{ color: obj.name === 'pending' ? 'green' : obj.color }}>
              {obj.name === 'pending' ? 'Новый' : obj.text}
            </h1>
          </div>
        ))}
    </>
  );
};
