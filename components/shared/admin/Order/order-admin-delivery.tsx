import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, ModalContent } from '@nextui-org/modal';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { delivery, TFormDelivery } from '../../form/shemas';
import { FormInput } from '../../form/formInpit/formInput';
import { settingOrderDelivery } from '@/app/admin';
import { useRouter } from 'next/navigation';
import { DeliverySelect } from '@/lib/components/deliverySelect';

interface Props {
  orderId: number;
  address: string | null;
  type: string | null;
  price: number | null;
  entrance: number | null;
  floor: number | null;
  flat: number | null;
}

export const OrderAdminDelivery: React.FC<Props> = ({
  orderId,
  address,
  type,
  price,
  entrance,
  flat,
  floor,
}) => {
  const router = useRouter();
  const [deliverySelect, isDeliverySelect] = useState<{ name: string; price?: number }>({
    name: type || 'Доставка в пределах МКАД',
    price: price || undefined,
  });
  const [open, isOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(delivery),
    defaultValues: {
      address: address || '',
      floor: String(floor) || '',
      flat: String(flat) || '',
      entrance: String(entrance) || '',
    },
  });

  const onSubmit = async (data: TFormDelivery) => {
    await settingOrderDelivery(orderId, data, deliverySelect).then(() => {
      router.refresh();
      isOpen(false);
    });
  };

  return (
    <div className="mt-4">
      {address ? (
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg max-sm:text-base">Доставка</h2>
            <Button onClick={() => isOpen(true)} size="sm" variant="outline">
              Редактировать
            </Button>
            <Modal isOpen={open} backdrop="blur" placement="center" onOpenChange={(b) => isOpen(b)}>
              <ModalContent className="p-4">
                <h2 className="text-lg">Доставка</h2>
                <FormProvider {...form}>
                  <DeliverySelect
                    className="justify-start w-min mt-2"
                    deliverySelect={deliverySelect}
                    isDeliverySelect={(name, price) => isDeliverySelect({ name, price })}
                  />
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid-cols-3 grid gap-2 mt-4 text-sm">
                    <FormInput label="Адресс" className="col-span-3" name="address" />
                    <FormInput label="Подьезд" name="entrance" />
                    <FormInput label="Этаж" name="floor" />
                    <FormInput label="Квартира" name="flat" />
                    <Button className="w-full col-span-3 mt-2">Изменить</Button>
                  </form>
                </FormProvider>
              </ModalContent>
            </Modal>
          </div>
          <div className="text-sm text-gray-400">
            <div className="my-1">
              Тип: {type} {price ? '(' + price + ' ₽' + ')' : ''}
            </div>
            <p className="my-1">Адрес: {address}</p>
            <p className="my-1">Подъезд: {entrance}</p>
            <p className="my-1">Этаж: {floor}</p>
            <p className="my-1">Квартира: {flat}</p>
          </div>
        </div>
      ) : (
        <h2 className="text-lg max-sm:text-base">В магазине</h2>
      )}
    </div>
  );
};
