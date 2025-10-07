import { Container } from '@/components/shared/container';
import { CartITemsLoading } from '@/lib/Loading/cartItems-loading';
import { CartPricesLoading } from '@/lib/Loading/cartPrices-loading';

export default function Loading() {
  return (
    <Container className="mt-10 max-md:px-3 flex w-full">
      <div className="flex xl:justify-between gap-6 xl:gap-20 max-xl:flex-col grow">
        <CartITemsLoading />
        <CartPricesLoading />
      </div>
    </Container>
  );
}
