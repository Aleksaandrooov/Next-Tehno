import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { cartSettingChanges } from './toaster-changes-cart';
import { CartStore } from '@/components/zustand/cart-store';
import { cn } from '../utils';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
  id: number;
  text?: string;
  disabled?: boolean;
  count: number;
  reduce?: boolean;
}

export const ButtonAddCart: React.FC<Props> = ({
  className,
  id,
  text,
  disabled,
  count,
  reduce,
}) => {
  const { addCart, cartItems } = CartStore();
  const [loading, isLoading] = useState(false);
  const router = useRouter();

  const selected = cartItems.filter((obj) => obj.productItem.id == id).length;

  const onSubmit = () => {
    cartSettingChanges({
      id,
      isLoading,
      settingCart: addCart,
      loadingText: 'Добавление товара в корзину',
      successText: 'Товар успешно добавлен',
    });
  };

  return (
    <Button
      onClick={() => {
        if (selected) {
          router.push('/cart');
        } else {
          onSubmit();
        }
      }}
      loading={loading}
      variant={selected ? 'outline' : 'default'}
      disabled={disabled || count == 0}
      className={cn(
        selected && count !== 0
          ? 'gap-[2px] bg-neutral-100 hover:text-black'
          : 'hover:text-white bg-white text-black border',
        className,
      )}>
      {count == 0
        ? 'Нет в наличии'
        : selected
          ? reduce
            ? 'Перейти'
            : 'Перейти в корзину'
          : !text
            ? 'В корзину'
            : text}
      {selected && count !== 0 ? <ChevronRight size={18} /> : <></>}
    </Button>
  );
};
