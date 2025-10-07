import { CartItem } from '@/components/shared/Cart/CartItems';
import { CartPrices } from '@/components/shared/Cart/CartPrices';
import { Container } from '@/components/shared/container';

export default function CartPage() {
  return (
    <Container className="mt-10 max-md:px-3 flex">
      <div className="flex justify-between gap-6 xl:gap-20 max-xl:flex-col grow w-full">
        <CartItem className="flex-auto flex-col" />
        <CartPrices className="flex flex-col" />
      </div>
    </Container>
  );
}
