'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal, ModalContent, ModalHeader } from '@nextui-org/modal';
import { Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { nameType } from '../admin/fetch-filter';
import { addFilters, deleteFilters } from '@/app/admin';
import { useRouter } from 'next/navigation';

export const AddFilter = ({ name }: { name: nameType }) => {
  const [open, isOpen] = useState(false);
  const [value, setValue] = useState('');
  const router = useRouter();

  const add = async () => {
    if (value) {
      await addFilters(name, value);
      router.refresh();
      isOpen(false);
    }
  };
  const del = async () => {
    if (value) {
      await deleteFilters(name, value);
      router.refresh();
      isOpen(false);
    }
  };

  return (
    <>
      {name !== 'category' && (
        <div className="">
          <div
            onClick={() => isOpen(true)}
            className="rounded-sm border px-3 cursor-pointer bg-gray-400 text-white text-center">
            Изменить
          </div>
          <Modal size="md" placement="center" isOpen={open} backdrop="blur" onOpenChange={isOpen}>
            <ModalContent>
              <ModalHeader>{name}</ModalHeader>
              <div className="pb-4 px-4">
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Название..."
                />
                <div className="flex gap-2 justify-center">
                  <Button className="mt-2" onClick={() => add()}>
                    Добавить <Plus size={22} />
                  </Button>
                  <Button className="mt-2" variant="outline" onClick={() => del()}>
                    Удалить <X size={22} />
                  </Button>
                </div>
              </div>
            </ModalContent>
          </Modal>
        </div>
      )}
    </>
  );
};
