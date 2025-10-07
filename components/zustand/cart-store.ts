import { create } from 'zustand';
import { CartItemType } from './dto/getCart';
import { Api } from '@/app/services/apiClient';
import { UpdateItemType } from '../shared/Cart/item';

interface State {
  cartItems: CartItemType['items'][];
  itemsSelected: CartItemType['items'][];
  totalPrice: { price: number; count: number };
  changePrice: { price: number; count: number };
  loading: boolean;
  error: boolean;
}

type Actions = {
  fetchCart: () => Promise<void>;
  addCart: (id: number) => Promise<void>;
  updateCart: (id: number, type: UpdateItemType) => Promise<void>;
  deleteCart: (id: number) => Promise<void>;
  deleteAllCart: (id: Set<number>) => Promise<void>;
  changeItems: (obj: CartItemType['items'][]) => void;
};

export const CartStore = create<State & Actions>((set) => ({
  cartItems: [],
  itemsSelected: [],
  loading: true,
  error: false,
  totalPrice: { price: 0, count: 0 },
  changePrice: { price: 0, count: 0 },

  fetchCart: async () => {
    try {
      const data = await Api.cart.fetchCart();
      const items = Array.isArray(data.items) ? data.items : [];
      set({
        cartItems: items,
        loading: false,
        totalPrice: { price: data.totalAmount, count: data.quantity },
      });
    } catch {
      set({ error: true });
    }
  },
  addCart: async (id: number) => {
    try {
      const data = await Api.cart.addCart(id);
      const items = Array.isArray(data.items) ? data.items : [];
      set({
        cartItems: items,
        totalPrice: { price: data.totalAmount, count: data.quantity },
      });
    } catch {
      set({ error: true });
    }
  },
  updateCart: async (id, type) => {
    try {
      const data = await Api.cart.updateCart(id, type);
      const items = Array.isArray(data.items) ? data.items : [];
      set({
        cartItems: items,
        totalPrice: { price: data.totalAmount, count: data.quantity },
      });
    } catch {
      set({ error: true });
    }
  },
  deleteCart: async (id: number) => {
    try {
      const data = await Api.cart.removeCart(id);
      const items = Array.isArray(data.items) ? data.items : [];
      set({
        cartItems: items,
        totalPrice: { price: data.totalAmount, count: data.quantity },
      });
    } catch {
      set({ error: true });
    }
  },
  deleteAllCart: async (id: Set<number>) => {
    try {
      const ids = Array.from(id);
      const data = await Api.cart.removeAllCart(ids);
      const items = Array.isArray(data.items) ? data.items : [];
      set({
        cartItems: items,
        totalPrice: { price: data.totalAmount, count: data.quantity },
      });
    } catch {
      set({ error: true });
    }
  },
  changeItems: (obj) => {
    if (obj.length) {
      set({
        itemsSelected: obj,
        changePrice: {
          count: obj.reduce((cur, item) => {
            return cur + item.quantity;
          }, 0),
          price: obj.reduce((cur, item) => {
            return cur + item.productItem.price * item.quantity;
          }, 0),
        },
      });
    } else {
      set({ itemsSelected: [], changePrice: { count: 0, price: 0 } });
    }
  },
}));
