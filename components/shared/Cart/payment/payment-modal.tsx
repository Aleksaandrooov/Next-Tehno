import React from 'react';
import { FormInput } from '../../form/formInpit/formInput';
import { Textarea } from '@/components/ui/text-area';
import { DeliverySelect } from '@/lib/components/deliverySelect';

interface Props {
  deliverySelect: { name: string; price?: number };
  isDeliverySelect: (t: string, p?: number) => void;
}

export const PaymentModal: React.FC<Props> = ({ deliverySelect, isDeliverySelect }) => {
  return (
    <>
      <div className="flex mb-5 mt-1 justify-between items-center pr-5 max-sm:flex-col max-sm:gap-2">
        <div className="text-2xl">Способ получения</div>
        <DeliverySelect
          className="w-[270px]"
          deliverySelect={deliverySelect}
          isDeliverySelect={(t, p) => isDeliverySelect(t, p)}
        />
      </div>
      <div className="flex gap-3 max-md:grid max-md:grid-cols-3">
        <FormInput
          name="address"
          className="text-base rounded-sm flex-1 max-md:col-span-3 placeholder:text-center"
          placeholder="Введите адрес..."
        />
        <FormInput
          name="entrance"
          className="text-base rounded-sm max-md:max-w-full max-w-[110px] placeholder:text-center"
          placeholder="Подъезд"
        />
        <FormInput
          name="floor"
          className="text-base rounded-sm max-md:max-w-full max-w-[110px] placeholder:text-center"
          placeholder="Этаж"
        />
        <FormInput
          name="flat"
          className="text-base rounded-sm max-md:max-w-full max-w-[110px] placeholder:text-center"
          placeholder="Квартира"
        />
      </div>
      <Textarea
        name="comment"
        className="text-base py-3 px-3 placeholder:text-gray-500 rounded-sm min-h-20 mt-5 h-28"
        placeholder="Комментарий курьеру"
      />
    </>
  );
};
