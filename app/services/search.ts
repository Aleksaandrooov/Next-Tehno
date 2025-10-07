import { axiosInstance } from './instance';
import { ProductType } from './dto/searchItemsType';

export const fetchSearchItems = async (str: string): Promise<ProductType[]> => {
  return (
    await axiosInstance.get<ProductType[]>('/search', {
      params: { query: str },
    })
  ).data;
};
