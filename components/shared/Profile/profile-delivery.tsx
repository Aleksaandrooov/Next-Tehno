'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { delivery, TFormDelivery } from '../form/shemas';
import { User } from '@prisma/client';
import { FormInput } from '../form/formInpit/formInput';
import { Button } from '@/components/ui/button';
import { ArrowDownToLine, BadgeCheck, Trash2 } from 'lucide-react';
import { addDelivery, removeDelivery } from '@/app/actions';
import { useRouter } from 'next/navigation';

export const ProfileDelivery = ({ user }: { user: User }) => {
  const [save, isSave] = useState(true);
  const form = useForm({
    resolver: zodResolver(delivery),
    defaultValues: {
      address: user.address || '',
      entrance: user.entrance ? String(user.entrance) : '',
      floor: user.floor ? String(user.floor) : '',
      flat: user.flat ? String(user.flat) : '',
    },
  });
  const router = useRouter();
  const onSubmit = async (data: TFormDelivery) => {
    await addDelivery(user.email, data);
    router.refresh();
    isSave(true);
  };

  const RemoveSubmit = async () => {
    await removeDelivery(user.email);
    router.refresh();
    form.reset();
  };

  return (
    <div className="rounded-lg border shadow-md p-5 mt-8 max-md:mt-4">
      <header className="flex justify-between">
        <div className="">
          <h1 className="text-lg">Информация о доставке</h1>
          <span className="text-gray-500 text-sm">
            Данные которые помогут быстро и удобно оформить доствку
          </span>
        </div>
        {save && user.address && (
          <h1 className="text-sm flex max-sm:hidden gap-1 items-center text-green-700">
            Данные обновленны <BadgeCheck size={18} />
          </h1>
        )}
      </header>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
          <div className="grid grid-cols-2 gap-5">
            <FormInput
              onChange={() => save && isSave(false)}
              className="max-sm:col-span-2"
              name="address"
              label="Адрес"
            />
            <FormInput
              onChange={() => save && isSave(false)}
              type="number"
              name="entrance"
              label="Подъезд"
            />
            <FormInput
              onChange={() => save && isSave(false)}
              type="number"
              name="floor"
              label="Этаж"
            />
            <FormInput
              onChange={() => save && isSave(false)}
              type="number"
              name="flat"
              label="Квартира"
            />
            {save && user.address && (
              <h1 className="text-sm flex gap-1 sm:hidden justify-end mt-auto items-center text-green-700">
                Данные обновленны <BadgeCheck size={18} />
              </h1>
            )}
          </div>
          <div className="flex gap-3 mt-5">
            <Button type="submit" className="flex gap-1">
              <ArrowDownToLine size={18} />
              Сохранить
            </Button>
            {user.address && (
              <Button
                type="button"
                onClick={() => RemoveSubmit()}
                className="flex gap-1"
                variant="outline">
                <Trash2 size={18} /> Сбросить
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
