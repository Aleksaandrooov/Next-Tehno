'use client';

import { favoritesStore } from '@/components/zustand/favorites-store';
import { cn } from '@/lib/utils';
import { words } from '@/lib/word-cals';
import React from 'react';
import { FavoritesItem } from './favoritesItem';
import { ProfileNull } from '../profile-null';
import { ProfileFavoritesLoading } from '@/lib/Loading/profile-favorites-loading';

interface Props {
  className?: string;
}

export const FavoritesItems: React.FC<Props> = ({ className }) => {
  const { favoritesItem, loading } = favoritesStore();

  const items = favoritesItem.filter((obj) => obj.productItem.quantity > 0);

  if (loading) {
    return <ProfileFavoritesLoading />;
  }

  return (
    <div className={cn('', className)}>
      {items.length ? (
        <div className="rounded-lg border shadow-md px-4 max-sm:px-2 py-3 w-max mb-3">
          <h1 className="max-sm:text-sm">
            <span className="font-semibold">{items.length}</span>{' '}
            {words(items.length, ['товар', 'товара', 'товаров'])} на сумму:{' '}
            <span className="font-semibold">
              {items.reduce((acc, sum) => {
                return acc + sum.productItem.price;
              }, 0)}{' '}
              ₽
            </span>
          </h1>
        </div>
      ) : favoritesItem.length ? (
        <></>
      ) : (
        <ProfileNull
          title="У вас нету избранных товаров"
          text="Выберите что вам понравится и нажмите на сердце, после чего он появиться здесь"
        />
      )}
      <div className="flex flex-col gap-3">
        {favoritesItem.map((obj) => (
          <FavoritesItem key={obj.id} {...obj} />
        ))}
      </div>
    </div>
  );
};
