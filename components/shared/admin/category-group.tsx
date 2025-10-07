'use client';

import React, { useState } from 'react';
import { filterType } from './fetch-filter';
import { Modal, ModalContent, ModalHeader } from '@nextui-org/modal';
import { settingFilter } from '@/app/admin';
import { useRouter } from 'next/navigation';

interface Props {
  filter: filterType;
  name: string;
  categoryId: number;
}

export const CategoryGroup: React.FC<Props> = ({ filter, name, categoryId }) => {
  const [open, isOpen] = useState(false);
  const router = useRouter();

  const setting = (id: number) => {
    settingFilter(categoryId, filter.name, id);
    router.refresh();
  };

  return (
    <div className="">
      <h2 onClick={() => isOpen(true)} className="px-2 rounded-sm border cursor-pointer">
        {filter.name}
      </h2>
      <Modal size="md" placement="center" isOpen={open} backdrop="blur" onOpenChange={isOpen}>
        <ModalContent>
          <ModalHeader>
            {name} | {filter.name}
          </ModalHeader>
          <div className="flex justify-around mx-2 mb-4">
            <div className="">
              <h1 className="mb-2">{name}</h1>
              <div className="flex flex-col gap-1 max-h-[450px] overflow-y-auto scroll__hidden text-sm text-nowrap">
                {filter.filter
                  .filter(
                    (obj) =>
                      obj.category?.filter((object) => object.id === categoryId).length ||
                      obj.categoryId == categoryId,
                  )
                  .map((obj) => (
                    <div
                      key={obj.id}
                      onClick={() => setting(obj.id)}
                      className="cursor-pointer hover:bg-neutral-100 px-2 rounded-sm transition-all w-min">
                      {obj.name}
                    </div>
                  ))}
              </div>
            </div>
            <div className="">
              <h1 className="mb-2">Остальные</h1>
              <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto scroll__hidden text-sm text-nowrap">
                {filter.filter
                  .filter(
                    (obj) => !obj.category?.filter((object) => object.id === categoryId).length,
                  )
                  .map((obj) => (
                    <div
                      key={obj.id}
                      onClick={() => setting(obj.id)}
                      className="cursor-pointer hover:bg-neutral-100 px-2 rounded-sm transition-all w-min">
                      {obj.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};
