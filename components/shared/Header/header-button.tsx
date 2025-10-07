'use client';

import React, { useState } from 'react';
import { Heart, ScanFace, ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { CartNavigation } from './Navigation/cart-navigation';
import { HeaderProfile } from './header-profile';
import { ProfileModal } from '../Modal/profile-modal';
import { FetchElements } from '@/lib/fetch-elements';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';

export const HeaderButton = () => {
  const { totalPrice, cartItems, session, favoritesItem, deleteCart, newTotal, status, loading } =
    FetchElements();
  const search = useSearchParams().get('callbackUrl');
  const [url] = useState(search || '');

  return (
    <NavigationMenu className="z-20 swap max-lg:hidden">
      <NavigationMenuList>
        {status == 'loading' ? (
          <Button variant="ghost" disabled={true} className="px-3">
            <ScanFace size={22} strokeWidth={1.75} />
          </Button>
        ) : status == 'authenticated' ? (
          <HeaderProfile />
        ) : (
          <ProfileModal url={url} />
        )}
        {session && (
          <NavigationMenuItem>
            <NavigationMenuTrigger autoFocus={true}>
              <Link href="/profile/favorites" legacyBehavior passHref>
                <NavigationMenuLink className="px-3 h-full flex items-center">
                  <Heart size={22} strokeWidth={1.75} />
                  {favoritesItem.length > 0 && (
                    <div className="absolute h-5 text-xs w-5 bg-green-700 -right-1 -top-1 text-white flex justify-center items-center rounded-full">
                      {favoritesItem.length}
                    </div>
                  )}
                </NavigationMenuLink>
              </Link>
              <NavigationMenuContent>
                <></>
              </NavigationMenuContent>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <NavigationMenuTrigger autoFocus={true} className="relative">
            <Link href="/cart" className="" legacyBehavior passHref>
              <NavigationMenuLink className="px-3 h-full flex items-center">
                <ShoppingBasket
                  className={loading ? 'text-gray-400' : ''}
                  size={22}
                  strokeWidth={1.75}
                />
                {newTotal.count > 0 && (
                  <div className="absolute h-5 text-xs w-5 bg-green-700 -right-1 -top-1 text-white flex justify-center items-center rounded-full">
                    {newTotal.count}
                  </div>
                )}
              </NavigationMenuLink>
            </Link>
            {totalPrice.count > 0 && (
              <NavigationMenuContent>
                <CartNavigation
                  total={newTotal}
                  item={cartItems}
                  onDelete={(id) => deleteCart(id)}
                />
              </NavigationMenuContent>
            )}
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
