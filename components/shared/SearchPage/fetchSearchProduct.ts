import { countPage } from '@/lib/find-products';
import { prisma } from '@/prisma/prisma-client';

export const fetchSearchProduct = async (
  q: string,
  order: 'price' | 'rating',
  type: 'asc' | 'desc',
  page: number,
) => {
  const products = await prisma.product.findMany({
    where: {
      title: {
        contains: q,
        mode: 'insensitive',
      },
      quantity: {
        gte: 1,
      },
    },
    include: {
      Img: true,
      reviewItem: true,
    },
    orderBy: [
      { rating: order == 'rating' ? type : undefined },
      { price: order == 'rating' ? undefined : type },
    ],
    skip: page > 0 ? (page - 1) * countPage || undefined : undefined,
    take: countPage,
  });

  const count = await prisma.product.count({
    where: {
      title: {
        contains: q,
        mode: 'insensitive',
      },
      quantity: {
        gte: 1,
      },
    },
  });

  return {
    products,
    count,
  };
};
