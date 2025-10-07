import { CartStore } from '@/components/zustand/cart-store';
import { favoritesStore } from '@/components/zustand/favorites-store';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const FetchElements = () => {
  const { fetchCart, totalPrice, cartItems, deleteCart, loading } = CartStore();
  const { getFavorites, favoritesItem } = favoritesStore();
  const { data: session, status } = useSession();
  useEffect(() => {
    fetchCart();
  }, [session]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.has('verified')) {
      const data = {
        email: searchParams.get('email'),
        code: searchParams.get('code'),
      };
      signIn('credentials', {
        ...data,
        redirect: false,
      });
      return router.push('/');
    }
  }, []);

  useEffect(() => {
    getFavorites();
  }, [cartItems]);

  const newTotal = {
    count:
      totalPrice.count -
      cartItems.reduce((sum, acc) => {
        return sum + (acc.productItem.quantity == 0 ? acc.quantity : 0);
      }, 0),
    price:
      totalPrice.price -
      cartItems.reduce((sum, acc) => {
        return sum + (acc.productItem.quantity == 0 ? acc.productItem.price * acc.quantity : 0);
      }, 0),
  };

  return { totalPrice, deleteCart, favoritesItem, cartItems, session, newTotal, status, loading };
};
