import { categoryType } from './type-filter';

export const filterGroup = (category: categoryType) => {
  const filter = [
    { masiv: category?.capacitys, name: 'Емкость', urlName: 'capacitys' },
    { masiv: category?.diagonals, name: 'Диагональ', urlName: 'diagonals' },
    { masiv: category?.powers, name: 'Мощность', urlName: 'powers' },
    { masiv: category?.memorys, name: 'Память', urlName: 'memorys' },
    { masiv: category?.brands, name: 'Бренд', urlName: 'brands' },
    { masiv: category?.voltages, name: 'Напряжение', urlName: 'voltages' },
    { masiv: category?.colors, name: 'Цвет', urlName: 'colors' },
    { masiv: category?.connectors, name: 'Разъем', urlName: 'connectors' },
  ];

  return filter;
};
