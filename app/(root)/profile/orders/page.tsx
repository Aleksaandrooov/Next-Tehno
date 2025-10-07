import { Container } from '@/components/shared/container';
import { NavigationBar } from '@/components/shared/Profile/navigation-bar';
import { ProfileNull } from '@/components/shared/Profile/profile-null';
import { OrderItems } from '@/components/shared/Profile/order/order-items';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';

export default async function OrdersPage() {
  const session = await getUserSession();

  const orderItem = await prisma.order.findMany({
    where: {
      userId: session!.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <Container className="mt-10 max-md:px-2 mb-10">
      <header className="text-3xl mb-5 max-md:text-2xl max-sm:text-xl">Профиль | Заказы</header>
      <div className="flex gap-5">
        <NavigationBar id={2} role={session!.role} />
        {orderItem.length ? (
          <div className="flex-1 flex flex-col gap-5">
            {orderItem?.map((obj) => <OrderItems key={obj.id} {...obj} />)}
          </div>
        ) : (
          <ProfileNull
            title="У вас ещё нету заказов"
            text="Выберите что вам понравится и закажите, после чего ваш заказ появиться здесь"
          />
        )}
      </div>
    </Container>
  );
}
