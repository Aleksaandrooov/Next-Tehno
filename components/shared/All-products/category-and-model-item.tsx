import { Brand, Category, Model } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface categoryAndModel {
  models?: Category & { models: Model[] };
  brand?: Brand[];
}

export const CategoryAndModelItem = ({ models, brand }: categoryAndModel) => {
  return (
    <div
      style={{
        backgroundImage: models
          ? `url(${models?.bgImg})`
          : 'url(https://static.re-store.ru/upload/iblock/cb1/dx48mgsu8s28o08m7lff523tkeo6fc44.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className="h-[500px] max-md:h-[400px] text-white flex flex-col items-center py-10 px-2">
      <h2 className="text-4xl font-medium max-md:text-3xl py-1 ">
        {!models ? 'Бренды' : models.name}
      </h2>
      <div className="flex flex-wrap justify-center py-1 rounded-md text-lg px-10 max-md:text-base max-md:px-2">
        {models?.models.map((obj) => (
          <Link
            key={obj.id}
            className="transition-all hover:underline hover:backdrop-blur-lg px-3 rounded-md"
            href={'/catalog?category=' + obj.categoryId + '&model=' + obj.id}>
            {obj.name}
          </Link>
        ))}
        {brand?.map((obj) => (
          <Link
            key={obj.id}
            className="transition-all hover:underline hover:backdrop-blur-lg px-3 rounded-md"
            href={'/search?q=' + obj.name}>
            {obj.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
