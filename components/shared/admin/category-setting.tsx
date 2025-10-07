'use client';

import { settingCategory } from '@/app/admin';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, ModalContent } from '@nextui-org/modal';
import { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { addCategory, TFormAddCategory } from '../form/shemas';
import { FormInput } from '../form/formInpit/formInput';

export const CategorySetting = ({ id, name, img, bgImg, price }: Category) => {
  const [open, isOpen] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(addCategory),
    defaultValues: {
      name,
      img,
      bgImg: bgImg || '',
      price,
    },
  });

  const onSubmitSetting = async (data: TFormAddCategory) => {
    await settingCategory(id, data).then(() => router.refresh());
  };
  const onSubmitDelete = async () => {
    await settingCategory(id).then(() => {
      isOpen(false);
      router.refresh();
    });
  };

  return (
    <div className="">
      <Button size="sm" variant="outline" className="h-6 px-2" onClick={() => isOpen(true)}>
        Редактировать
      </Button>
      <Modal size="md" placement="center" isOpen={open} backdrop="blur" onOpenChange={isOpen}>
        <ModalContent className="p-4 max-w-[600px]">
          <h2 className="text-lg">{name}</h2>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitSetting)}
              className="mt-4 grid-cols-2 grid gap-2 text-sm max-sm:grid-cols-1">
              <FormInput name="name" label="Название" />
              <FormInput name="price" label="Цена" />
              <FormInput name="img" label="Картинка" />
              <FormInput name="bgImg" label="Большая картинка" />
              <div className="flex gap-2 mt-2 sm:col-span-2">
                <Button type="submit">Изменить</Button>
                <Button
                  type="button"
                  onClick={() => onSubmitDelete()}
                  className="w-[100px] hover:text-red-500"
                  variant="outline">
                  Удалить
                </Button>
              </div>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </div>
  );
};
