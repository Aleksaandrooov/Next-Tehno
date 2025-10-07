import { ProductType } from '@/app/services/dto/searchItemsType';
import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import React from 'react';

export const HeaderProduct = ({ product }: { product: ProductType }) => {
  return (
    <Link href={'/catalog/product/' + product.id} legacyBehavior passHref className="group">
      <NavigationMenuLink className="flex flex-col text-center w-[180px] h-[220px]">
        <div className="flex-1 min-w-[180px]">
          <div className="h-[100px] px-6 my-3 flex justify-center items-center">
            <img
              src={product.Img?.img[0]}
              alt=""
              className="max-h-[80px] max-w-[150px] transition-all group-hover:max-h-[90px] group-hover:max-w-[160px]"
            />
          </div>
          <h1 className="px-2 text-ellipsis line-clamp-3 text-sm">{product.title}</h1>
        </div>
        <span className="text-base font-semibold mb-2 mt-auto">{product.price} ₽</span>
      </NavigationMenuLink>
    </Link>
  );
};
