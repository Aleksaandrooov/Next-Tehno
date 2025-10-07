import { Cart, CartItem, Img, Product, ReviewsItem } from '@prisma/client';

export type CartItemType = Cart & {
  items: CartItem & {
    productItem: Product & {
      Img: Img | null;
      reviewItem?: ReviewsItem[];
    };
  };
};
