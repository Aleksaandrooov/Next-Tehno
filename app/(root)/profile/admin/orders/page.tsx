import { Orders } from '@/components/shared/admin/Order/orders';
import { Container } from '@/components/shared/container';
import { NavigationBar } from '@/components/shared/Profile/navigation-bar';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AdminOrdersPage() {
  const session = await getUserSession();

  if (session!.role !== 'ADMIN') {
    redirect('/');
  }

  const orderItem = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <Container className="mt-10 max-sm:px-2">
      <header className="text-3xl mb-5 max-md:text-2xl max-sm:text-xl">Админ | Все заказы</header>
      <div className="flex gap-5">
        <NavigationBar id={6} role={session!.role} />
        <Orders orders={orderItem} />
      </div>
    </Container>
  );
}
