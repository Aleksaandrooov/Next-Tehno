import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import ctypto from 'crypto';
import { UpdateCartItem } from '@/lib/update-cart-item';
import { findCreateCart } from '@/lib/find-cart-create';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export async function GET(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;
    const session = await getServerSession(authOptions);

    if (!token && session) {
      token = session?.user.cartToken;
    }

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

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

    return NextResponse.json(userCart);
  } catch {}
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    let token = req.cookies.get('cartToken')?.value;

    if (!token && session) {
      token = session?.user.cartToken;
    }

    if (!token) {
      token = ctypto.randomUUID();
    }

    const createCart = await findCreateCart(token);

    const data = (await req.json()) as number;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: createCart.id,
        productItemId: data,
      },
    });

    if (findCartItem) {
      await prisma.cartItem.delete({
        where: {
          id: findCartItem.id,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: createCart.id,
          productItemId: data,
          quantity: 1,
        },
      });
    }

    const updateUserCart = await UpdateCartItem(token);
    const resp = NextResponse.json(updateUserCart);

    if (!session) {
      resp.cookies.set('cartToken', token, {
        maxAge: 2147483647,
      });
    }
    return resp;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Не удалось добавить товар' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;
    const data = (await req.json()) as { id: number[] };
    const session = await getServerSession(authOptions);

    if (!token && session) {
      token = session?.user.cartToken;
    }
    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' });
    }

    const cartItem = await prisma.cart.findFirst({
      where: {
        token,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cartItem.id,
        id: {
          in: data.id,
        },
      },
    });

    const updatedUserCart = await UpdateCartItem(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_DELETEALL] Server error', error);
    return NextResponse.json({ message: 'Не удалось удалить товары из корзины' }, { status: 500 });
  }
}
