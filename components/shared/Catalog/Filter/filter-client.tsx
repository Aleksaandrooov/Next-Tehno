'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { filterStore } from '@/components/zustand/filter-store';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Item } from './accordion/item';
import { filterGroup } from './filterChange/filterGroup';
import { useRouter } from 'next/navigation';
import { categoryType, priceProps } from './filterChange/type-filter';
import { PriceChange } from './priceChange';
import { useFilterParams } from './filterChange/use-filter';
import { RemoveScroll } from 'react-remove-scroll';
import { useMedia } from 'react-use';
import { X } from 'lucide-react';

interface Props {
  className?: string;
  category: categoryType;
  catogoryId: string;
  modelId: string;
}

export default function FilterClient({ category, catogoryId, modelId }: Props) {
  const router = useRouter();
  const { open, isOpen } = filterStore();
  const [accordion, setAccordion] = useState<string[]>(['priceForm']);
  const mediaQuery = useMedia('only screen and (max-width : 1024px)', false);
  const filter = filterGroup(category);
  const { setPrice, filterUrl, updateFilters, price } = useFilterParams();

  const useFilter = () => {
    router.push(
      `catalog?category=${catogoryId}&` + (modelId ? `model=${modelId}&` : '') + filterUrl,
    );
    if (mediaQuery) {
      isOpen();
    }
  };
  const clearFilter = () => {
    router.push(`catalog?category=${catogoryId}` + (modelId ? `&model=${modelId}` : ''));
    if (accordion.filter((obj) => obj === 'priceForm').length) {
      setAccordion(['priceForm']);
    }
    setPrice({ priceForm: undefined, priceTo: undefined });
    if (mediaQuery) {
      isOpen();
    }
  };
  const openFilter = (name: string) => {
    setAccordion((prev) => [...prev, name]);
  };
  const closeFilter = (name: string) => {
    setAccordion((prev) => prev.filter((obj) => obj !== name));
  };

  return (
    <>
      <div
        onClick={() => isOpen()}
        className={cn(
          'absolute hidden top-0 right-0 left-0 bottom-0 bg-black/40 z-50',
          open ? 'max-lg:block' : '',
        )}></div>
      <RemoveScroll
        enabled={open && mediaQuery}
        className={cn(
          'w-[350px] max-lg:w-[400px] max-sm:w-full overflow-hidden max-lg:z-50 max-lg:fixed max-lg:shadow-xl max-lg:pt-8 max-lg:top-0 max-lg:bottom-0 max-lg:left-0 bg-white max-h-screen scroll__hidden overflow-y-auto mr-5 shrink-0 transition-all duration-300 -ml-[350px] opacity-0 pointer-events-none',
          open ? '-ml-0 opacity-100 mr-0 pointer-events-auto' : '',
        )}>
        <div className="flex mb-4 justify-between items-center px-4 lg:hidden">
          <h1 className="text-2xl">Фильтры</h1>
          <X onClick={() => isOpen()} strokeWidth={1.5} className="size-7 cursor-pointer" />
        </div>
        <Accordion
          type="multiple"
          value={accordion}
          onValueChange={setAccordion}
          className="px-6 mb-4 overflow-hidden overflow-y-auto">
          {filter
            .filter((obj) => obj.masiv?.length)
            .map((object, i) => (
              <Item
                openFilter={(name) => openFilter(name)}
                closeFilter={(name) => closeFilter(name)}
                key={i}
                updateFilters={(obj, name) => updateFilters(obj, name)}
                {...object}
                limit={5}
                changePrice={({ priceForm, priceTo }: priceProps) =>
                  setPrice({ priceForm, priceTo })
                }
                price={price}
              />
            ))}
          <AccordionItem value="priceForm" className="my-2">
            <AccordionTrigger className="text-base">Цена</AccordionTrigger>
            <AccordionContent>
              <PriceChange
                changePrice={({ priceForm, priceTo }: priceProps) =>
                  setPrice({ priceForm, priceTo })
                }
                price={price}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex flex-col gap-2 mx-6 sticky z-20 pb-4 bottom-0 bg-white shadow-[0_-10px_35px_20px_rgba(255,255,255.2)]">
          <Button onClick={useFilter} className="">
            Применить
          </Button>
          <Button onClick={clearFilter} variant="outline">
            Сбросить
          </Button>
        </div>
      </RemoveScroll>
    </>
  );
}
