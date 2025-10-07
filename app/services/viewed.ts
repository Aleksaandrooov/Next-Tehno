import { axiosInstance } from './instance';

export const viewedProducts = async (local: string) => {
  return (
    await axiosInstance.get('/viewed', {
      params: { local },
    })
  ).data;
};
