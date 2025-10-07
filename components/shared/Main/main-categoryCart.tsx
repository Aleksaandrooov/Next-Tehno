import React from 'react';
import { Container } from '../container';
import Link from 'next/link';
import { Category } from '@prisma/client';

interface Props {
  category: Category[];
}

export const MainCategoryCart: React.FC<Props> = ({ category }) => {
  return (
    <div className="mt-14 max-md:mt-8">
      <Container className="text-2xl max-md:text-xl">Категории</Container>
      <div className="grid grid-cols-4 mt-8 border-t max-md:mt-4">
        {category?.map((obj) => (
          <Link
            href={'/catalog?category=' + obj.id}
            key={obj.id}
            className="text-center max-md:h-[150px] max-sm:h-[130px] h-[200px] border-r border-b flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-lg">
            <img
              className="h-[80px] max-md:h-[60px] mb-2 max-sm:h-[40px]"
              src={obj.img}
              alt={obj.name + 'Img'}
            />
            <h2 className="max-md:text-sm max-sm:text-xs">{obj.name}</h2>
            {obj.price && <span className="text-gray-400 text-sm max-sm:text-xs">{obj.price}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};
