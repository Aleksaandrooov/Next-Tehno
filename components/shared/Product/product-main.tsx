'use client';

import React, { useEffect } from 'react';
import { productType } from './product-type';
import { productGroup } from '../../../lib/Arrays/productGroup';
import { Truck } from 'lucide-react';
import { dataTime } from '@/lib/Arrays/getDate';
import Link from 'next/link';
import { ButtonAddFavorites } from '@/lib/components/button-add-favorites';
import { ReviewsItem } from '@prisma/client';
import { ButtonAddCart } from '@/lib/components/button-add-cart';
import { QuantityProduct } from '@/lib/components/quantityProduct';
import { StarReviews } from '@/lib/components/star';

export const ProductMain = ({ product, item }: { product: productType; item: ReviewsItem[] }) => {
  const productFilters = productGroup(product);

  useEffect(() => {
    const item = localStorage
      .getItem('viewedProducts')
      ?.split(',')
      .filter((obj) => Number(obj) != product.id)
      .filter((_, i) => i <= 18)
      .join(',');

    localStorage.setItem('viewedProducts', product.id + (item ? ',' + item : ''));
  }, []);

  return (
    <div className="my-14 max-lg:my-6 w-[440px] max-lg:w-full">
      <div className="flex mb-3 gap-2 items-center">
        <StarReviews item={item} />
        <QuantityProduct count={product.quantity} />
        <ButtonAddFavorites variant="ghost" id={product.id} className="ml-auto" />
      </div>
      <div className="flex flex-col gap-3">
        {productFilters
          .filter((obj) => obj.obj || obj.price)
          .map((obj, i) => (
            <div
              key={i}
              className="h-[70px] border rounded-xl flex justify-between px-5 items-center cursor-pointer transition-all hover:shadow-md hover:border-white">
              <h1 className="">{obj.name}</h1>
              <div className="flex gap-2 items-center">
                {obj.colorName && (
                  <div
                    style={{ backgroundColor: obj.colorName }}
                    className="h-4 w-4 rounded-full shadow-2xl drop-shadow-md"></div>
                )}
                <h2 className="text-gray-500">{obj.obj?.name || obj?.price + ' ₽'}</h2>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <ButtonAddCart
          count={product.quantity}
          id={product.id}
          className="h-12 w-full text-base"
          text="Добавить в корзину"
        />
        <div className="flex justify-between items-center mt-2 mb-4">
          <div className="text-gray-400">Код товара: {product.id}</div>
          {product.Brand && (
            <Link
              href={'/catalog?category=' + product.categoryId + '&brands=' + product.Brand?.id}
              className="text-gray-400 cursor-pointer">
              Все товары {product.Brand.name}
            </Link>
          )}
        </div>
        <div className="bg-neutral-100 py-4 px-6 rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Truck size={32} strokeWidth={1} />
              <div className="text-sm">
                <div className="">Курьером</div>
                <div className="text-gray-400">
                  {dataTime()[0].dataName}, {dataTime()[0].data} {dataTime()[0].time[0]}
                </div>
              </div>
            </div>
            <div className="text-sm">бесплатно</div>
          </div>
        </div>
      </div>
    </div>
  );
};
