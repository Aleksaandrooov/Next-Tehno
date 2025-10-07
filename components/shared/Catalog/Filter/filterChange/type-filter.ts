import {
  Brand,
  Capacity,
  Category,
  Color,
  Connector,
  Diagonal,
  Memory,
  Model,
  Power,
  Voltage,
} from '@prisma/client';

export type categoryType =
  | (Category & {
      models?: Model[];
      capacitys?: Capacity[];
      diagonals?: Diagonal[];
      memorys?: Memory[];
      powers?: Power[];
      brands?: Brand[];
      voltages?: Voltage[];
      colors?: Color[];
      connectors?: Connector[];
    })
  | null;

export interface priceProps {
  priceForm?: number;
  priceTo?: number;
}

export interface searchInterface extends priceProps {
  category: string;
  model: string;
  capacitys: string;
  diagonals: string;
  powers: string;
  memorys: string;
  brands: string;
  voltages: string;
  colors: string;
  connectors: string;
  page?: string;
  order?: 'rating' | 'price';
  type?: 'asc' | 'desc';
}
