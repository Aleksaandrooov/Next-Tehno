import { Button } from '@/components/ui/button';
import { favoritesStore } from '@/components/zustand/favorites-store';
import { Heart } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '../utils';
import { cartSettingChanges } from './toaster-changes-cart';
import { useSession } from 'next-auth/react';

interface Props {
  className?: string;
  id: number;
  variant?: 'outline' | 'ghost';
  text?: string;
}

export const ButtonAddFavorites: React.FC<Props> = ({ id, className, variant, text }) => {
  const [loading, isLoading] = useState(false);
  const { postFavorites, favoritesItem } = favoritesStore();
  const { data: session } = useSession();

  const heart = !favoritesItem.filter((obj) => obj.productItem.id == id).length;

  const addFavoritesItems = (id: number) => {
    cartSettingChanges({
      id,
      isLoading,
      settingCart: postFavorites,
      loadingText: heart ? 'Добавление товара в избранные' : '',
      successText: 'Товар успешно добавлен',
    });
  };

  return (
    <Button
      loading={loading}
      onClick={() => addFavoritesItems(id)}
      variant={!variant ? 'outline' : variant}
      className={cn('px-3 flex gap-1', !session ? 'hidden' : '', className)}>
      {text && heart && <h1 className="text-gray-600 max-xl:hidden">{text}</h1>}
      <Heart
        fill={heart ? 'none' : 'red'}
        className={cn('h-full transition-all', heart ? 'text-gray-500 fill-none' : 'text-red-500')}
      />
    </Button>
  );
};
