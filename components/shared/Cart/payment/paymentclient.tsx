'use client';

import React, { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { FormChecked } from './form-checked';
import { Pay } from './pay';
import { PaymentModal } from './payment-modal';
import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import { redirect } from 'next/navigation';
import { CartStore } from '@/components/zustand/cart-store';
import { TFormDelivery, TFormPaymentMain, TFormPaymentMainLegal } from '../../form/shemas';
import { Modal, ModalContent } from '@nextui-org/modal';
import { PaymentState } from './payment-state';
import { createOrder } from '@/app/actions';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

export const PaymentClient = (user: User) => {
  const { changePrice, itemsSelected, deleteAllCart } = CartStore();
  const { data: session } = useSession();
  const {
    inChange,
    isOpen,
    setInChange,
    form,
    formDelivery,
    open,
    loading,
    isLoading,
    deliveryState,
    setDeliveryState,
    value,
    isValue,
    deliverySelect,
    isDeliverySelect,
  } = PaymentState(user);

  useEffect(() => {
    if (!itemsSelected.length && !session) {
      return redirect('/cart');
    }
    return;
  }, []);

  const onSubmitDelivery = (data: TFormDelivery) => {
    setInChange('delivery');
    isOpen(false);
    setDeliveryState(data);
  };

  const onSubmit = async (Main: TFormPaymentMain | TFormPaymentMainLegal) => {
    const set = new Set<number>(itemsSelected.map((obj) => obj.id));
    isLoading(true);
    try {
      await createOrder(
        Main,
        user.email,
        changePrice.price + (inChange === 'shop' ? 0 : deliverySelect.price || 0),
        itemsSelected,
        deliverySelect.name,
        deliverySelect.price,
        inChange == 'delivery' ? deliveryState : undefined,
      );
      deleteAllCart(set);
    } catch {
      isLoading(false);
      toast.error('Наличие на складе не совпадает с выбранным вами количеством товара');
      return redirect('/cart');
    }

    toast.success('Заказ был успешно оформлен');
    isLoading(false);
    return redirect('/');
  };

  return (
    <div className="">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between max-xl:flex-col max-xl:items-center">
            <FormChecked
              value={value}
              changeValue={(e) => isValue(e)}
              isOpen={(change) => isOpen(change)}
              isSetting={(string) => setInChange(string)}
              inChange={inChange}
              number={user.number || ''}
            />
            <Pay
              loading={loading}
              totalItems={itemsSelected}
              totalAmount={changePrice.price}
              totalCount={changePrice.count}
              deliverySelect={deliverySelect}
              inChange={inChange}
            />
          </div>
        </form>
      </FormProvider>
      <Modal
        placement="center"
        backdrop="blur"
        size="4xl"
        isOpen={open}
        onOpenChange={(bool) => isOpen(bool)}>
        <ModalContent className="px-5 py-4">
          <FormProvider {...formDelivery}>
            <form onSubmit={formDelivery.handleSubmit(onSubmitDelivery)}>
              <PaymentModal
                deliverySelect={deliverySelect}
                isDeliverySelect={(name, price) => isDeliverySelect({ name, price })}
              />
              <Button type="submit" className="w-[150px] mt-4 text-sm h-9">
                Подтвердить
              </Button>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </div>
  );
};
