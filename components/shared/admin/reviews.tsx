'use client';

import { Img, Product, ReviewsItem as ReviewsItemType } from '@prisma/client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ReviewsItem } from '../Profile/reviews/reviews-item';

export const Reviews = ({
  reviews,
}: {
  reviews: (ReviewsItemType & { productItem: Product & { Img: Img | null } })[];
}) => {
  const [value, setValue] = useState('');

  return (
    <div className="w-full">
      <div className="flex mb-2 justify-between items-center text-sm">
        <Input
          className="w-[220px] text-sm"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Поиск по навзанию товара..."
        />
        <span>кол-во: {reviews.length}</span>
      </div>
      <div className="flex flex-col gap-5">
        {reviews
          ?.filter((obj) => obj.productItem.title.includes(value))
          .map((obj) => <ReviewsItem key={obj.id} {...obj} admin />)}
      </div>
    </div>
  );
};
