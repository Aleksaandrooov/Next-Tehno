'use client';

import { deleteReview } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Img, Product, ReviewsItem as ReviewsItemType } from '@prisma/client';
import { ChevronRight, MessageSquareMore, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { SettingModal } from '../../Modal/settingModal';
import { ReviewStar } from '@/lib/components/review-star';

type ReviewsItemsType = ReviewsItemType & {
  productItem: Product & {
    Img: Img | null;
  };
};

export const ReviewsItem = ({
  productItem,
  comment,
  grade,
  id,
  userId,
  admin,
}: ReviewsItemsType & { admin?: boolean }) => {
  const [open, isOpen] = useState(false);

  return (
    <div className="rounded-lg border shadow-md p-5 flex gap-1 max-sm:p-3">
      <div className="w-[100px] max-sm:hidden h-[120px] flex items-center my-auto mr-4 justify-center">
        <img src={productItem.Img?.img[0]} className="min-w-[70px]"></img>
      </div>
      <div className="w-full flex flex-col justify-between">
        <div className="flex items-start">
          <Link href={'/catalog/product/' + productItem.id} className="line-clamp-3 max-sm:text-sm">
            {productItem.title}
          </Link>
          {!admin ? (
            <Link className="ml-auto" href={'/catalog/product/' + productItem.id}>
              <Button className="flex gap-1 max-sm:text-xs max-sm:px-3" variant="outline">
                К товару <ChevronRight size={18} className="size-5 max-sm:size-4" />
              </Button>
            </Link>
          ) : (
            <div className="ml-auto">userId: {userId}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {comment && (
            <h2>
              <span className="font-semibold flex gap-1 items-center max-sm:text-sm mt-1">
                <MessageSquareMore size={20} strokeWidth={1.5} /> Комментарий:
              </span>
              <span className="comment">{comment}</span>
            </h2>
          )}
          <div className="flex justify-between items-center">
            <ReviewStar grade={grade} className="max-sm:size-4" />
            <Button
              variant="outline"
              type="button"
              onClick={() => isOpen(true)}
              className="flex gap-2 w-[110px] max-sm:text-xs max-sm:w-[94px]">
              <Trash2 className="size-5 max-sm:size-4" />
              Удалить
            </Button>
            <SettingModal
              text="Вы точно хотите удалить отзыв?"
              id={id}
              open={open}
              isOpen={() => isOpen(false)}
              settingPromise={deleteReview}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
