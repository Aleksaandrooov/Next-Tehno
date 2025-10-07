import { CartItemType } from '@/components/zustand/dto/getCart';
import { axiosInstance } from './instance';
import { UpdateItemType } from '@/components/shared/Cart/item';

export const fetchCart = async (): Promise<CartItemType> => {
  const { data } = await axiosInstance.get<CartItemType>('/cart');

  return data;
};

export const updateCart = async (id: number, type: UpdateItemType): Promise<CartItemType> => {
  return (await axiosInstance.patch<CartItemType>('/cart/' + id, { type })).data;
};

export const removeCart = async (id: number): Promise<CartItemType> => {
  return (await axiosInstance.delete<CartItemType>('/cart/' + id)).data;
};

export const addCart = async (productId: number): Promise<CartItemType> => {
  return (await axiosInstance.post<CartItemType>('/cart', productId)).data;
};

export const removeAllCart = async (id: number[]): Promise<CartItemType> => {
  return (await axiosInstance.put<CartItemType>('/cart', { id })).data;
};
