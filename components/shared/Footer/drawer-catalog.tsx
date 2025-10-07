import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Category, Model } from '@prisma/client';
import { LayoutPanelLeft, X } from 'lucide-react';
import React from 'react';
import { Models } from './models';
import { Accordion } from '@/components/ui/accordion';

type categoryType = {
  categories: (Category & {
    models: Model[];
  })[];
};

export const DrawerCatalog = ({ categories }: categoryType) => {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <div className="text-center cursor-pointer">
          <LayoutPanelLeft className="mx-auto size-5 max-sm:size-4" />
          <h1 className="max-sm:text-xs text-sm">Каталог</h1>
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-white flex-col max-sm:w-[300px] w-[400px] max-md:rounded-none">
        <DrawerHeader>
          <DrawerTitle className="ml-auto">
            <DrawerClose>
              <X />
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>
        <div className="h-full overflow-auto px-4">
          <div className="text-2xl ml-4 mb-5 max-sm:ml-0 max-sm:text-xl">Каталог товаров</div>
          <Accordion type="single" collapsible>
            {categories.map((obj) => (
              <Models key={obj.id} {...obj} />
            ))}
          </Accordion>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
