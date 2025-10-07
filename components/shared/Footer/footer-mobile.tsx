import { House } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Favirotes } from './favirotes';
import { Profile } from './profile';
import { Cart } from './cart';
import { prisma } from '@/prisma/prisma-client';
import { DrawerCatalog } from './drawer-catalog';
import { getUserSession } from '@/lib/get-user-session';

export const FooterMobile = async () => {
  const categories = await prisma.category.findMany({
    include: {
      models: {
        orderBy: {
          id: 'asc',
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
  });

  const session = await getUserSession();

  return (
    <div className="bottom-0 sticky z-30 lg:hidden bg-white border-t pt-3 pb-1 max-sm:pt-2">
      <div className="flex justify-around max-w-[640px] mx-auto">
        <Link href="/" className="text-center">
          <House className="mx-auto size-5 max-sm:size-4" />
          <h1 className="max-sm:text-xs text-sm">Главная</h1>
        </Link>
        <DrawerCatalog categories={categories} />
        <Cart />
        <Favirotes />
        <Profile role={session?.role} />
      </div>
    </div>
  );
};
