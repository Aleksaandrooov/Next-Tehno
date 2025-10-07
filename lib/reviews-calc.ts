import { ReviewsItem } from '@prisma/client';

export const ReviewsCalc = (items: ReviewsItem[]) => {
  return items.reduce((sum: { count: number; grade: number }[], acc) => {
    const index = sum.findIndex((obj) => obj.grade == acc.grade);
    if (index !== -1) {
      sum[index].count++;
    } else {
      sum.push({ count: 1, grade: acc.grade });
    }
    return sum;
  }, []);
};
