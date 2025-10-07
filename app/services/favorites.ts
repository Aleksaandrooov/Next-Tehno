import { favoritesType } from './dto/favoritesType';
import { axiosInstance } from './instance';

export const getFavorites = async (): Promise<favoritesType> => {
  return (await axiosInstance.get<favoritesType>('/favorites')).data;
};
export const postFavorites = async (id: number): Promise<favoritesType> => {
  return (await axiosInstance.post<favoritesType>('/favorites', id)).data;
};
