import { Favorites, FavoritesItem, Img, Product, ReviewsItem } from '@prisma/client';

export type favoritesType = Favorites & {
  items: FavoritesItem & {
    productItem: Product & {
      Img: Img;
      reviewItem?: ReviewsItem[];
    };
  };
};
