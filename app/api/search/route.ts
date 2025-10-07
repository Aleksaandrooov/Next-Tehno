import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams.get('query') || '';

  const products = await prisma.product.findMany({
    where: {
      title: {
        contains: params,
        mode: 'insensitive',
      },
      quantity: {
        gte: 1,
      },
    },
    include: {
      Img: true,
    },
    take: 7,
  });

  return NextResponse.json(products);
}
