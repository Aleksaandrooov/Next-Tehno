'use client';

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, ModalContent } from '@nextui-org/modal';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { addCategory, TFormAddCategory } from '../form/shemas';
import { FormInput } from '../form/formInpit/formInput';
import { addCategory as ActionAddCategory } from '@/app/admin';
import { useRouter } from 'next/navigation';

export const CategoryAdd = () => {
  const [open, isOpen] = useState(false);
  const router = useRouter();
  const form = useForm<TFormAddCategory>({
    resolver: zodResolver(addCategory),
  });
  const onSubmit = async (data: TFormAddCategory) => {
    event?.preventDefault();
    await ActionAddCategory(data).then(() => {
      isOpen(false);
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => isOpen(true)} variant="secondary" type="submit">
        Добавить
      </Button>
      <Modal size="md" placement="center" isOpen={open} backdrop="blur" onOpenChange={isOpen}>
        <ModalContent className="p-4">
          <h2 className="text-lg">Добавление категории</h2>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-2 text-sm mt-4 max-sm:grid-cols-1">
              <FormInput label="Название" name="name" />
              <FormInput label="Цена" name="price" />
              <FormInput label="Картинка" name="img" />
              <FormInput label="Большая картинка" name="bgImg" />
              <Button variant="secondary" className="sm:col-span-2 mt-2">
                Добавить
              </Button>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </div>
  );
};
