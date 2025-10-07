'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DrawerClose } from '@/components/ui/drawer';
import { Category, Model } from '@prisma/client';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = Category & {
  models: Model[];
};

export const Models: React.FC<Props> = ({ id, name, models }) => {
  return (
    <>
      {models.length ? (
        <AccordionItem value={name}>
          <AccordionTrigger className="text-base max-sm:text-sm">{name}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              {models.map((obj) => (
                <Link
                  href={'/catalog?category=' + id + '&model=' + obj.id}
                  key={obj.id}
                  className="rounded-md mx-4 hover:bg-neutral-100">
                  <DrawerClose className="w-full text-left py-3 px-4 max-sm:py-2 flex justify-between items-center text-xs">
                    {obj.name} <ChevronRight size={18} />
                  </DrawerClose>
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ) : (
        <AccordionItem value="1">
          <Link href={'/catalog?category=' + id}>
            <DrawerClose className="w-full text-start py-4 flex justify-between items-center max-sm:text-sm">
              {name} <ChevronRight size={18} />
            </DrawerClose>
          </Link>
        </AccordionItem>
      )}
    </>
  );
};
