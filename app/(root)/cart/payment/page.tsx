import { PaymentClient } from '@/components/shared/Cart/payment/paymentclient';
import { Container } from '@/components/shared/container';
import { getUserSession } from '@/lib/get-user-session';
import { redirect } from 'next/navigation';

export default async function PaymentPage() {
  const session = await getUserSession();

  if (!session) {
    redirect('/');
  }

  return (
    <div className="w-full">
      <Container className="mt-10 max-xl:px-3">
        <PaymentClient {...session} />
      </Container>
    </div>
  );
}
