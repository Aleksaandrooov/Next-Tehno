'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Store, Truck } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { words } from '@/lib/word-cals';
import { dataTime } from '@/lib/Arrays/getDate';
import { CartStore } from '@/components/zustand/cart-store';
import { useSession } from 'next-auth/react';
import { CartPricesLoading } from '@/lib/Loading/cartPrices-loading';

interface Props {
  className?: string;
}

export const CartPrices: React.FC<Props> = ({ className }) => {
  const { changePrice, loading, cartItems } = CartStore();
  const { data: session } = useSession();

  if (loading) {
    return <CartPricesLoading />;
  }

  if (!loading && !cartItems.length) {
    return <></>;
  }

  return (
    <div
      className={cn(
        'w-[400px] mt-14 max-xl:w-[600px] max-lg:w-full mx-auto max-lg:mt-0 h-full sticky top-28',
        className,
      )}>
      <div className="bg-neutral-100 rounded-lg px-8 py-6 mb-4 max-sm:px-6 max-sm:text-center max-md:py-4">
        <div className="font-semibold">
          {changePrice.count} {words(changePrice.count, ['товар', 'товара', 'товаров'])} на сумму{' '}
          {changePrice.price} ₽
        </div>
      </div>
      <div className="bg-neutral-100 rounded-lg py-6 px-8 mb-5 text-center max-sm:px-4">
        <div className="text-sm text-gray-500 pb-4 mb-4 border-gray-300 border-b text-start">
          Стоимость доставки будет рассчитана на следующем шаге
        </div>
        <div className="mb-4 text-start">
          <div className="text-lg font-bold max-sm:text-base">К оплате: {changePrice.price} ₽</div>
        </div>
        <Link className="text-center" href={changePrice.price && session ? '/cart/payment' : ''}>
          <Button
            size="lg"
            variant="outline"
            disabled={changePrice.price == 0 || !session}
            className="max-w-[400px] w-full text-base rounded-lg shadow-md">
            {session ? 'Оформить заказ' : 'Требуется авторизация'}
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-5 pt-4 border-t border-slate-200">
        <div className="flex gap-1">
          <div className="">Получить в</div>
          <div className="text-green-900 cursor-pointer">РФ</div>
        </div>
        <div className="flex flex-col gap-6 max-xl:mx-10 max-sm:mx-4">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Truck size={28} strokeWidth={1} />
              <div className="text-sm">
                <div className="">Курьером</div>
                <div className="text-gray-400">
                  {dataTime()[0].dataName}, {dataTime()[0].data}
                </div>
              </div>
            </div>
            <div className="text-sm">от 390 ₽</div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Store size={28} strokeWidth={1} />
              <div className="text-sm">
                <div className="">Забрать в магазине</div>
                <div className="text-gray-400">Можно забрать прямо сейчас</div>
              </div>
            </div>
            <div className="text-sm">бесплатно</div>
          </div>
        </div>
      </div>
    </div>
  );
};
