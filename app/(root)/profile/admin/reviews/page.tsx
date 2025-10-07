import { Reviews } from '@/components/shared/admin/reviews';
import { Container } from '@/components/shared/container';
import { NavigationBar } from '@/components/shared/Profile/navigation-bar';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AdminReviewsPage() {
  const session = await getUserSession();

  if (session!.role !== 'ADMIN') {
    redirect('/');
  }

  const productReviews = await prisma.reviewsItem.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      productItem: {
        include: {
          Img: true,
        },
      },
    },
  });

  return (
    <Container className="mt-10 max-sm:px-2">
      <header className="text-3xl mb-5 max-md:text-2xl max-sm:text-xl">Админ | Все отзывы</header>
      <div className="flex gap-5">
        <NavigationBar id={7} role={session!.role} />
        <Reviews reviews={productReviews} />
      </div>
    </Container>
  );
}
