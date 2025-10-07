import { CartStore } from '@/components/zustand/cart-store';
import { useEffect } from 'react';
import { useSet } from 'react-use';

export const CartState = () => {
  const [cartItemChange, { clear: clearCartItem, toggle: setCartItemChange }] = useSet(
    new Set<number>(),
  );
  const { cartItems, changeItems, deleteAllCart, totalPrice, loading } = CartStore();
  const totalCount =
    totalPrice.count -
    cartItems.reduce((sum, curr) => {
      return sum + (curr.productItem.quantity == 0 ? curr.quantity : 0);
    }, 0);
  const filter =
    cartItems
      .filter((obj) => obj.productItem.quantity > 0)
      .filter((obj) => !cartItemChange.has(obj.id)).length > 0;

  useEffect(() => {
    const obj = cartItems.filter((obj) => {
      return cartItemChange.has(obj.id);
    });
    changeItems(obj);
  }, [cartItemChange, cartItems]);

  return {
    clearCartItem,
    setCartItemChange,
    deleteAllCart,
    totalCount,
    filter,
    cartItems,
    cartItemChange,
    loading,
  };
};
