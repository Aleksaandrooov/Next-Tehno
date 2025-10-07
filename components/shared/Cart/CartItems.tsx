'use client';

import { cn } from '@/lib/utils';
import React, { useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Item } from './item';
import { cartSettingChanges } from '@/lib/components/toaster-changes-cart';
import { CartState } from './cart-state';
import { CartAmountNUll } from './CartAmountNull';
import { CartITemsLoading } from '@/lib/Loading/cartItems-loading';

interface Props {
  className?: string;
}

export const CartItem: React.FC<Props> = ({ className }) => {
  const {
    clearCartItem,
    cartItems,
    deleteAllCart,
    setCartItemChange,
    cartItemChange,
    filter,
    totalCount,
    loading,
  } = CartState();

  const ChangeAll = () => {
    clearCartItem();
    cartItems.map((obj) => obj.productItem.quantity > 0 && setCartItemChange(obj.id));
  };

  const removeAllVoid = () => {
    cartSettingChanges({
      ids: cartItemChange,
      removeAllCart: deleteAllCart,
      loadingText: 'Обновление корзины',
      successText: 'Корзина успешно обновлена',
      clearCartItem: clearCartItem,
    });
  };

  useEffect(() => {
    ChangeAll();
  }, [cartItems]);

  if (loading) {
    return <CartITemsLoading />;
  }

  if (!loading && !cartItems.length) {
    return <CartAmountNUll />;
  }

  return (
    <div className={cn('', className)}>
      <div className="flex items-center gap-2 mb-14 max-md:mb-10">
        <h1 className="text-2xl font-medium">Корзина</h1>
        {totalCount > 0 && (
          <div className="text-[24px] text-gray-300 font-medium">{totalCount}</div>
        )}
      </div>
      <div className="flex justify-between items-end pb-4 border-b">
        <div className="flex gap-2 group items-center">
          <Checkbox
            checked={filter ? false : true}
            onCheckedChange={() => {
              return filter && ChangeAll();
            }}
            id="0"
            defaultChecked
          />
          <label htmlFor="0" className="group-hover:cursor-pointer">
            Выбрать все
          </label>
        </div>
        {cartItemChange.size ? (
          <div
            onClick={() => removeAllVoid()}
            className="cursor-pointer text-gray-400 hover:text-primary transition-all flex gap-2">
            Удалить выбранные
            <Trash2 size={20} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col">
        {cartItems?.map((obj, i) => (
          <Item
            key={i}
            item={obj}
            onCheked={cartItemChange}
            onChangeItem={(id) => setCartItemChange(id)}
          />
        ))}
      </div>
    </div>
  );
};
