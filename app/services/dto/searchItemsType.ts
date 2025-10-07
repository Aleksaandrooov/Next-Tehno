import { Img, Product } from '@prisma/client';

export type ProductType = Product & {
  Img: Img | null;
};
