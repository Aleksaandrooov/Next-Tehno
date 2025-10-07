'use client';

import { favoritesStore } from '@/components/zustand/favorites-store';
import { Heart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export const Favirotes = () => {
  const { favoritesItem } = favoritesStore();
  const { data: session } = useSession();

  return (
    <>
      {session && (
        <Link href="/profile/favorites" className="text-center">
          <div className="relative">
            <Heart className="mx-auto size-5 max-sm:size-4" />
            {favoritesItem.length > 0 && (
              <div className="absolute h-5 text-xs w-5 bg-green-700 right-3 max-sm:right-1 -top-3 text-white flex justify-center items-center rounded-full">
                {favoritesItem.length}
              </div>
            )}
          </div>
          <h1 className="max-sm:text-xs text-sm">Избранное</h1>
        </Link>
      )}
    </>
  );
};
