import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const cookie = session?.user.favoritesToken;

    if (!session) {
      return NextResponse.json({ items: [] });
    }

    const favorites = await prisma.favorites.findFirst({
      where: {
        token: cookie,
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

    if (!favorites) {
      return NextResponse.error();
    }

    return NextResponse.json(favorites);
  } catch (error) {
    console.log(error, 'GET_FAVORITES');
    NextResponse.error();
  }
}
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const cookie = session?.user.favoritesToken;
    const id = (await req.json()) as number;

    if (!cookie) {
      return NextResponse.error();
    }

    const favorites = await prisma.favorites.findFirst({
      where: {
        token: cookie,
      },
    });

    if (!favorites) {
      return NextResponse.error();
    }

    const findItem = await prisma.favoritesItem.findFirst({
      where: {
        favoritesId: favorites.id,
        productItemId: id,
      },
    });

    if (findItem) {
      await prisma.favoritesItem.delete({
        where: {
          id: findItem.id,
        },
      });
    } else {
      await prisma.favoritesItem.create({
        data: {
          favoritesId: favorites.id,
          productItemId: id,
        },
      });
    }

    const updateFavorites = await prisma.favorites.findFirst({
      where: {
        token: cookie,
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

    return NextResponse.json(updateFavorites);
  } catch (error) {
    console.log(error, 'ADD_FAVORITES');
    NextResponse.error();
  }
}
