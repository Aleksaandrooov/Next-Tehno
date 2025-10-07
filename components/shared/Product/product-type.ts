import {
  Brand,
  Capacity,
  Color,
  Connector,
  Diagonal,
  Img,
  Memory,
  Model,
  Power,
  Product,
  ReviewsItem,
  User,
  Voltage,
} from '@prisma/client';

export type productType = Product & {
  Model?: Model | null;
  Capacity?: Capacity | null;
  Diagonal?: Diagonal | null;
  Memory?: Memory | null;
  Power?: Power | null;
  Brand?: Brand | null;
  Voltage?: Voltage | null;
  Color?: Color | null;
  Connector?: Connector | null;
  Img?: Img | null;
  reviewItem?: (ReviewsItem & {
    user: User;
  })[];
};

export interface descriptionType {
  text?: string;
  title?: string;
  variant?: string;
  obj?: filterType;
  id?: number;
  item?: (ReviewsItem & {
    user: User;
  })[];
  email?: string | null;
}

export type filterType = {
  obj?: {
    name: string;
    id: number;
  } | null;
  name: string;
  colorName?: string;
  price?: number;
}[];
