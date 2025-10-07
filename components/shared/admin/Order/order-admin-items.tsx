import { settingOrderQuantity } from '@/app/admin';
import { Input } from '@/components/ui/input';
import { CartItemType } from '@/components/zustand/dto/getCart';
import { priceReplace } from '@/lib/priceReplace';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  orderId: number;
  obj: CartItemType['items'];
}

export const OrderAdminItems: React.FC<Props> = ({ obj, orderId }) => {
  const router = useRouter();
  const onSubmit = () => {
    event?.preventDefault();
    (document.activeElement as HTMLElement).blur();
  };

  const onSubmitBlur = async (select: string) => {
    await settingOrderQuantity(orderId, obj.id, Number(select));
    router.refresh();
  };

  return (
    <div key={obj.id} className="flex gap-2 items-center h-[70px]">
      <div className="min-w-[70px] max-sm:min-w-[60px]">
        <img
          className="max-h-[60px] max-w-[70px] max-sm:max-w-[50px]"
          src={obj.productItem.Img?.img[0]}
        />
      </div>
      <h2 className="text-sm line-clamp-3 flex-1">{obj.productItem.title}</h2>
      <form onSubmit={() => onSubmit()}>
        <Input
          onBlur={(select) => onSubmitBlur(select.target.value)}
          defaultValue={obj.quantity}
          className="w-10 px-1 text-center"
        />
        <Input className="hidden" type="submit" />
      </form>
      <h1 className="text-nowrap">{priceReplace(obj.quantity * obj.productItem.price)} ₽</h1>
    </div>
  );
};
