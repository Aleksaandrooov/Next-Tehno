'use client';

import { CartStore } from '@/components/zustand/cart-store';
import { cn } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const Cart = () => {
  const { totalPrice, cartItems, loading } = CartStore();
  const countCart =
    totalPrice.count -
    cartItems.reduce((sum, acc) => {
      return sum + (acc.productItem.quantity == 0 ? acc.quantity : 0);
    }, 0);

  return (
    <Link href="/cart" className={cn('text-center', loading ? 'text-gray-400' : '')}>
      <div className="relative">
        <ShoppingCart className="mx-auto size-5 max-sm:size-4" />
        {countCart > 0 && (
          <div className="absolute h-5 text-xs w-5 bg-green-700 max-sm:-right-1 right-0 -top-3 text-white flex justify-center items-center rounded-full">
            {countCart}
          </div>
        )}
      </div>
      <h1 className="max-sm:text-xs text-sm">Корзина</h1>
    </Link>
  );
};
