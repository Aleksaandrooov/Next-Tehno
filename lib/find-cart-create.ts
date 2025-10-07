import { prisma } from '@/prisma/prisma-client';

export const findCreateCart = async (token: string) => {
  let userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
  });

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        token,
        totalAmount: 0,
        quantity: 0,
      },
    });
  }

  return userCart;
};
