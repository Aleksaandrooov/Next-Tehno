import { UpdateItemType } from '@/components/shared/Cart/item';
import { authOptions } from '@/lib/auth-options';
import { UpdateCartItem } from '@/lib/update-cart-item';
import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = (await req.json()) as { type: UpdateItemType };
    let token = req.cookies.get('cartToken')?.value;
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    if (data.type === 'plus') {
      await prisma.cartItem.update({
        where: {
          id: Number(id),
          cartId: cartItem.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    } else {
      const cartItemFind = await prisma.cartItem.findFirst({
        where: {
          id: Number(id),
          cartId: cartItem.id,
        },
      });
      if (cartItemFind!.quantity > 1) {
        await prisma.cartItem.update({
          where: {
            id: Number(id),
            cartId: cartItem.id,
          },
          data: {
            quantity: {
              decrement: 1,
            },
          },
        });
      }
    }

    const updatedUserCart = await UpdateCartItem(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_PATCH Server error]', error);
    return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    let token = req.cookies.get('cartToken')?.value;
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

    await prisma.cartItem.delete({
      where: {
        cartId: cartItem.id,
        id: Number(id),
      },
    });

    const updatedUserCart = await UpdateCartItem(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_DELETE] Server error', error);
    return NextResponse.json({ message: 'Не удалось удалить корзину' }, { status: 500 });
  }
}
