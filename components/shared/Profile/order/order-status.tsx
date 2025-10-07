import { orderStatus } from '@/lib/Arrays/order-status';
import { Status } from '@prisma/client';
import React from 'react';

interface Props {
  status: Status;
  id: number;
}

export const OrderStatus: React.FC<Props> = ({ status }) => {
  return (
    <div className="flex-1 flex justify-start max-md:w-full">
      {orderStatus
        .filter((obj) => obj.name == status)
        ?.map((obj, i) => (
          <div
            style={{ backgroundColor: obj.color }}
            key={i}
            className="text-white px-2 rounded-[5px] text-nowrap text-sm max-md:text-xs max-md:px-1">
            <div className="">{obj.text}</div>
          </div>
        ))}
    </div>
  );
};
