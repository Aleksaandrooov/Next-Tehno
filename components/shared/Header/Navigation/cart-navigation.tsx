import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import { CartItemType } from '@/components/zustand/dto/getCart';
import { cartSettingChanges } from '@/lib/components/toaster-changes-cart';
import { ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  item: CartItemType['items'][];
  onDelete: (id: number) => Promise<void>;
  total: {
    price: number;
    count: number;
  };
}

export const CartNavigation: React.FC<Props> = ({ item, onDelete, total }) => {
  return (
    <div className="px-3 pt-2">
      <h1 className="flex items-end gap-2 mb-4 font-semibold text-lg">
        Корзина <span className="text-gray-500">{total.count > 0 ? total.count : ''}</span>
      </h1>
      <div className="w-[500px] flex flex-col gap-4 py-2 min-h-10 max-h-[340px] overflow-hidden overflow-y-auto scroll__hidden">
        {item.map((obj) => (
          <div
            key={obj.id}
            className="px-1 flex items-center gap-4 border-b pb-4 last:pb-2 last:border-b-0">
            <div className="w-[50px] h-[50px] flex justify-center items-center">
              <img className="" src={obj.productItem.Img?.img[0]} />
            </div>
            <Link
              href={'/catalog/product/' + obj.productItem.id}
              className="flex-1"
              legacyBehavior
              passHref>
              <NavigationMenuLink className="line-clamp-2 text-sm">
                {obj.productItem.title}
              </NavigationMenuLink>
            </Link>
            {obj.productItem.quantity == 0 && (
              <div className="text-nowrap text-sm">Нет в наличии</div>
            )}
            <X
              onClick={() =>
                cartSettingChanges({
                  settingCart: onDelete,
                  loadingText: 'Обновление корзины',
                  successText: 'Корзина успешно обновлена',
                  id: obj.id,
                })
              }
              className="cursor-pointer ml-auto text-gray-400 max-md:size-6 size-6 transition-all hover:text-primary"
              strokeWidth={1.25}
            />
          </div>
        ))}
      </div>
      <div className="border-t flex justify-between px-4 py-3 items-center">
        <h1 className="text-lg font-semibold">Итого: {total.price} ₽</h1>
        <Link href="/cart" legacyBehavior passHref>
          <NavigationMenuLink className="py-2 bg-neutral-100 border px-3 text-sm rounded-md flex gap-1 items-center">
            Перейти в корзину <ChevronRight size={18} />
          </NavigationMenuLink>
        </Link>
      </div>
    </div>
  );
};
