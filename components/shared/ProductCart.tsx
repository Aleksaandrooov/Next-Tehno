'use client';

import React from 'react';
import { Img, Product, ReviewsItem } from '@prisma/client';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { ButtonAddCart } from '@/lib/components/button-add-cart';
import { ButtonAddFavorites } from '@/lib/components/button-add-favorites';
import { StarReviews } from '@/lib/components/star';
import { Loader2 } from 'lucide-react';

type Products = Product & {
  Img: Img | null;
  reviewItem?: ReviewsItem[];
};

export const ProductCart: React.FC<Products> = ({
  title,
  Img,
  price,
  id,
  reviewItem,
  quantity,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      key={id}
      className="h-[390px] max-md:h-[330px] transition-all text-center hover:shadow-lg max-lg:hover:shadow-none rounded-2xl flex flex-col group">
      <div className="mt-1 h-8 mx-3 flex items-center justify-between">
        <StarReviews item={reviewItem} />
        <ButtonAddFavorites
          id={id}
          className="border-0 w-10 px-2 h-8 opacity-0 group-hover:opacity-100 transition-all max-lg:opacity-100"
        />
      </div>
      <Link
        href={'/catalog/product/' + id}
        className="cursor-pointer flex-1 flex flex-col relative">
        {!inView && (
          <Loader2
            className="absolute top-20 max-md:top-16 animate-spin mx-auto left-0 right-0"
            color="gray"
          />
        )}
        <div
          className={cn(
            'h-[160px] max-md:h-[120px] px-6 my-3 flex justify-center items-center transition-all opacity-0',
            inView && 'opacity-100',
          )}>
          {inView && (
            <img
              src={Img?.img[0]}
              alt=""
              className="max-h-[160px] max-md:max-h-[100px] max-md:max-w-[100px] max-w-[200px]"
            />
          )}
        </div>
        <h1 className="px-2 text-ellipsis line-clamp-3 max-md:text-sm">{title}</h1>
        <span className="text-lg font-semibold mb-2 mt-auto max-md:text-base">{price} ₽</span>
      </Link>
      <ButtonAddCart
        reduce={true}
        count={quantity}
        id={id}
        className="mb-3 w-[150px] mx-auto max-md:text-xs max-md:w-[100px] max-md:h-8 max-md:border shadow-md max-md:text-black"
      />
    </div>
  );
};
