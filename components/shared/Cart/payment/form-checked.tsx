'use client';

import { Button } from '@/components/ui/button';
import { Store, Truck } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { dataTime } from '@/lib/Arrays/getDate';
import { Checkbox } from '@/components/ui/checkbox';
import { DefaultPay } from './default-pay';
import { SelectForPay, selectForPayType } from './select-for-pay';
import { LegalPay } from './legal-pay';

interface Props {
  className?: string;
  isOpen: (change: boolean) => void;
  inChange: 'delivery' | 'shop';
  isSetting: (string: 'delivery' | 'shop') => void;
  number: string;
  value: selectForPayType;
  changeValue: (e: selectForPayType) => void;
}

export const FormChecked: React.FC<Props> = ({
  className,
  isOpen,
  inChange,
  isSetting,
  number,
  changeValue,
  value,
}) => {
  const onChangeDelivery = () => {
    isOpen(true);
    isSetting('shop');
  };

  return (
    <div className={className}>
      <div className="flex justify-between gap-3">
        <h1 className="text-xl max-xl:text-lg">Информация для заказа</h1>
        <SelectForPay value={value} changeValue={(e) => changeValue(e)} />
      </div>
      <div className="">{value === 'default' ? <DefaultPay number={number} /> : <LegalPay />}</div>
      <div className="mt-10 text-xl font-semibold">Способ получения</div>
      <div className="flex gap-5 mt-2 flex-wrap max-md:gap-3 max-md:mt-4">
        <div
          onClick={() => onChangeDelivery()}
          className={cn(
            'border cursor-pointer border-gray-200 max-md:w-full flex-col flex min-w-[200px] justify-between px-3 py-3 h-[100px] transition-all rounded-md shadow-lg hover:scale-[1.02]',
            inChange == 'delivery' ? 'border-black' : '',
          )}>
          <div className="flex justify-between items-top gap-5">
            <div className="">
              Доставка {dataTime()[0].dataName}
              {inChange == 'delivery' && (
                <div className="text-sm text-gray-400">{dataTime()[0].time[0]}</div>
              )}
            </div>
            <Truck size={28} strokeWidth={1} />
          </div>
          <div className="flex justify-between items-end">
            <div className="text-green-800">{inChange == 'delivery' ? 'Изменить' : 'Выбрать'}</div>
            <div className="text-sm text-gray-400">Бесплатно</div>
          </div>
        </div>
        <div
          onClick={() => isSetting('shop')}
          className={cn(
            'border cursor-pointer border-gray-200 max-md:w-full flex-col flex min-w-[200px] justify-between px-3 py-3 h-[100px] transition-all rounded-md shadow-lg hover:scale-[1.02]',
            inChange == 'shop' ? 'border-black' : '',
          )}>
          <div className="flex justify-between items-center gap-5">
            <div className="">В магазине в любое время</div>
            <Store size={26} strokeWidth={1} />
          </div>
          <div className="flex justify-between items-end">
            <div className="text-green-800">{inChange == 'shop' ? 'Выбрано' : 'Выбрать'}</div>
            <div className="text-sm text-gray-400">Бесплатно</div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-xl font-semibold">Способ оплаты</div>
      <div className="mt-3 flex gap-4">
        <Button className="px-7 text-white" type="button">
          При получении
        </Button>
        <Button disabled={true} className="px-7 bg-gray-100 text-black hover:text-white">
          Онлайн-оплата
        </Button>
      </div>
      <div className="border-t w-full mt-5">
        <div className="flex items-center gap-3 mt-5">
          <Checkbox id="11" />
          <label htmlFor="11">Перезвоните мне для подтверждения заказа</label>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <Checkbox defaultChecked={true} disabled id="21" />
          <label htmlFor="21">Я соглашаюсь с условиями оферты и политикой конфиденциальности</label>
        </div>
      </div>
    </div>
  );
};
