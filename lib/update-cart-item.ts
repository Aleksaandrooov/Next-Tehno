import { prisma } from '@/prisma/prisma-client';

export const UpdateCartItem = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productItem: true,
        },
      },
    },
  });

  if (!userCart) {
    return;
  }

  const totalAmount = userCart?.items.reduce((acc, item) => {
    return acc + item.productItem.price * item.quantity;
  }, 0);
  const totalQuantity = userCart?.items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalAmount,
      quantity: totalQuantity,
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productItem: {
            include: {
              Img: true,
              reviewItem: true,
            },
          },
        },
      },
    },
  });
};
