import { ReviewsItem } from '@prisma/client';
import { ReviewsCalc } from './reviews-calc';

export const reviewGrade = (item?: ReviewsItem[]) => {
  const itemsReviews = item ? ReviewsCalc(item) : undefined;
  const reviewsGrade = item
    ? Number(
        (
          item.reduce((sum, curr) => {
            return sum + curr.grade;
          }, 0) / item.length
        ).toFixed(2),
      )
    : undefined;

  const countReviews = itemsReviews?.reduce((sum, acc) => {
    return sum + acc.count;
  }, 0);

  return { reviewsGrade, countReviews, itemsReviews };
};
