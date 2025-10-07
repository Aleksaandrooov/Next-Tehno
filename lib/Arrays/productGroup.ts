import { filterType, productType } from '../../components/shared/Product/product-type';

export const productGroup = (category: productType) => {
  const filter: filterType = [
    { obj: category?.Capacity, name: 'Емкость' },
    { obj: category?.Diagonal, name: 'Диагональ' },
    { obj: category?.Power, name: 'Мощность' },
    { obj: category?.Memory, name: 'Память' },
    { obj: category?.Brand, name: 'Бренд' },
    { obj: category.Color, colorName: category.Color?.colorName, name: 'Цвет' },
    { obj: category?.Voltage, name: 'Напряжение' },
    { obj: category?.Connector, name: 'Разъем' },
    { price: category.price, name: 'Цена' },
  ];

  return filter;
};

export const productBottomGroup = [
  { name: 'Описание', id: 1 },
  { name: 'Характеристики', id: 2 },
  { name: 'Отзывы', id: 3 },
];
