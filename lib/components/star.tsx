import React from 'react';
import { Star } from 'lucide-react';
import { ReviewsItem } from '@prisma/client';
import { words } from '../word-cals';
import { reviewGrade } from '../reviewGrade';

interface Props {
  item?: ReviewsItem[];
}

export const StarReviews: React.FC<Props> = ({ item }) => {
  const { countReviews, reviewsGrade } = reviewGrade(item);

  return (
    <>
      {countReviews ? (
        <div className="rounded-md border shadow-sm w-max px-2 py-1 flex gap-1 items-center text-xs font-semibold">
          <Star size={14} fill="orange" color="orange" />{' '}
          <span className="font-semibold">{reviewsGrade?.toFixed(1)}</span>
          <span className="max-sm:hidden">|</span>
          <span className="max-sm:hidden">
            {countReviews} {words(countReviews, ['отзыв', 'отзыва', 'отзывов'])}
          </span>
        </div>
      ) : (
        <div className=""></div>
      )}
    </>
  );
};
