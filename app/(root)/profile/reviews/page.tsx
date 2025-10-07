import { Container } from '@/components/shared/container';
import { NavigationBar } from '@/components/shared/Profile/navigation-bar';
import { ProfileNull } from '@/components/shared/Profile/profile-null';
import { ReviewsItem } from '@/components/shared/Profile/reviews/reviews-item';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import React from 'react';

export default async function ReviewsPage() {
  const session = await getUserSession();

  const productReviews = await prisma.reviewsItem.findMany({
    where: {
      userId: session!.id,
    },
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
    <Container className="mt-10 max-md:px-2">
      <header className="text-3xl mb-5 max-md:text-2xl max-sm:text-xl">Профиль | Мои отзывы</header>
      <div className="flex gap-5">
        <NavigationBar role={session!.role} id={4} />
        <div className="flex-1 flex flex-col gap-3">
          {productReviews.length ? (
            <>
              {productReviews.map((obj) => (
                <ReviewsItem key={obj.id} {...obj} />
              ))}
            </>
          ) : (
            <ProfileNull
              title="У вас ещё нету оставленных отзывов"
              text="Под любым понравившимся товаром вы можете написать свой отзыв"
            />
          )}
        </div>
      </div>
    </Container>
  );
}
