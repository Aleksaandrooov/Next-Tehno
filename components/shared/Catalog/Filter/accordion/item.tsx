'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import React, { useEffect, useState } from 'react';
import { ItemFilterChecked } from '../item-filter-checked';
import { useSet } from 'react-use';
import { Minus, Plus } from 'lucide-react';
import { priceProps } from '../filterChange/type-filter';
import { useSearchParams } from 'next/navigation';

interface Props {
  className?: string;
  name: string;
  masiv?: {
    name: string;
    id: number;
  }[];
  changePrice: ({}: priceProps) => void;
  price: priceProps;
  limit: number;
  updateFilters: (obj: Set<number>, name: string) => void;
  urlName: string;
  closeFilter: (name: string) => void;
  openFilter: (name: string) => void;
}

export const Item: React.FC<Props> = ({
  name,
  urlName,
  masiv,
  limit,
  updateFilters,
  closeFilter,
  openFilter,
}) => {
  const searchParams = useSearchParams();
  const getItem = (str: string) => {
    return searchParams.get(str) ? searchParams.get(str)?.split(',').map(Number) : [];
  };
  const [open, isOpen] = useState(false);
  const [changeItem, { toggle: setChangeItem, clear }] = useSet(new Set<number>(getItem(urlName)));
  const itemsOgr = masiv!
    .filter((obj, i) => changeItem.has(obj.id) && i + 1 > limit)
    .slice(0, limit);
  if (!open) {
    if (masiv!.length > limit) {
      limit = limit - itemsOgr.length;
    } else {
      limit = limit;
    }
  }
  const Items = open
    ? masiv
    : masiv!.filter((obj, i) => (i + 1 > limit ? !changeItem?.has(obj.id) : obj)).slice(0, limit);

  useEffect(() => {
    updateFilters(changeItem, urlName);
  }, [changeItem]);

  useEffect(() => {
    if (!searchParams.get(urlName)) {
      clear();
      closeFilter(urlName);
    } else {
      openFilter(urlName);
    }
  }, [searchParams]);

  return (
    <AccordionItem value={urlName} className="my-2">
      <AccordionTrigger className="text-base">{name}</AccordionTrigger>
      <AccordionContent>
        <div className="">
          <div className="flex flex-col gap-1 max-h-[400px] overflow-hidden overflow-y-auto">
            {!open &&
              itemsOgr?.map((obj) => (
                <ItemFilterChecked
                  key={obj.id}
                  {...obj}
                  selectItem={changeItem}
                  changeItem={(id: number) => setChangeItem(id)}
                />
              ))}
            {Items?.map((obj) => (
              <ItemFilterChecked
                key={obj.id}
                {...obj}
                selectItem={changeItem}
                changeItem={(id: number) => setChangeItem(id)}
              />
            ))}
          </div>
          {masiv!.length > limit && (
            <div
              onClick={() => isOpen((prev) => !prev)}
              className="flex mt-2 items-center gap-1 mx-1 cursor-pointer">
              {open ? <Minus size={15} /> : <Plus size={15} />}
              <div className="">{open ? 'Скрыть' : 'Показать ещё'}</div>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
