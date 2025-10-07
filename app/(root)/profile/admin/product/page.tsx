import { fetchFilter } from '@/components/shared/admin/fetch-filter';
import { Products } from '@/components/shared/admin/products';
import { Container } from '@/components/shared/container';
import { NavigationBar } from '@/components/shared/Profile/navigation-bar';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AdminProductsPage() {
  const session = await getUserSession();

  if (session!.role !== 'ADMIN') {
    redirect('/');
  }

  const productCount = await prisma.product.findMany({
    include: {
      Img: true,
    },
    orderBy: {
      updateAt: 'desc',
    },
  });
  const { filters } = await fetchFilter();

  return (
    <Container className="mt-10 max-sm:px-2">
      <header className="text-3xl mb-5 max-md:text-2xl max-sm:text-xl">Админ | Товары</header>
      <div className="flex gap-5">
        <NavigationBar id={10} role={session!.role} />
        <Products filter={filters} products={productCount} />
      </div>
    </Container>
  );
}
