import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const local = req.nextUrl.searchParams.get('local')?.split(',').map(Number) || [];

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: local,
      },
    },
    include: {
      Img: true,
    },
  });

  const filtersProduct = local
    .map((obj) => products.find((product) => product.id == obj))
    .filter(Boolean);

  return NextResponse.json(filtersProduct);
}
