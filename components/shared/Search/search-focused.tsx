'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SearchStore } from '../../zustand/search-store';
import { cn } from '@/lib/utils';
import { Container } from '../container';
import { Model } from '@prisma/client';
import Link from 'next/link';
import { Input } from '../../ui/input';
import { useClickAway, useDebounce } from 'react-use';
import { X } from 'lucide-react';
import { SearchProduct } from './search-product';
import { RemoveScroll } from 'react-remove-scroll';
import { useRouter } from 'next/navigation';

export const SearchFocused = ({ models }: { models: Model[] }) => {
  const { focused, setFocused, items, fetchSearchItems } = SearchStore();
  const [search, setSearch] = useState('');
  const ref = useRef(null);
  const InputRef = useRef<HTMLInputElement>(null);

  useClickAway(ref, () => {
    if (focused) {
      setFocused(false);
    }
  });

  useEffect(() => {
    if (focused) {
      InputRef.current?.focus();
    }
  }, [focused]);

  useDebounce(
    () => {
      if (focused) {
        fetchSearchItems(search);
      }
    },
    300,
    [focused, search],
  );

  const router = useRouter();

  const onChangeSearch = () => {
    event?.preventDefault();
    if (search) {
      router.push('/search?q=' + search);
      setFocused(false);
      InputRef.current?.blur();
      setSearch('');
    }
  };

  return (
    <RemoveScroll
      enabled={focused}
      className={cn(
        'transition-all relative z-40',
        focused ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}>
      <div ref={ref} className="relative bg-white z-40 pt-3 -mt-14 shadow-xl">
        <div className="flex">
          <Container className="w-full max-sm:px-2">
            <form onSubmit={onChangeSearch} className="flex items-center gap-3">
              <Input
                ref={InputRef}
                value={search}
                onChange={(e) => setSearch(e.target?.value)}
                className="flex-1 text-base"
                placeholder="Поиск товаров..."
              />
              <Input className="hidden" type="submit" />
              <X
                className="cursor-pointer"
                size={28}
                strokeWidth={1.25}
                onClick={() => setFocused(false)}
              />
            </form>
            <div className="pt-4 mx-2">
              <h1 className="font-semibold">Популярные запросы</h1>
              <div className="flex gap-3 px-4 max-sm:px-0 py-3 max-sm:gap-1 overflow-x-auto scroll__hidden text-sm">
                {models.map((obj) => (
                  <Link
                    onClick={() => setFocused(false)}
                    key={obj.id}
                    href={'/catalog?category=' + obj.categoryId + '&model=' + obj.id}
                    className="text-nowrap bg-neutral-100 px-3 py-[2px] rounded-sm">
                    {obj.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="py-2 mx-2">
              <h1 className="font-semibold mb-2">Поиск</h1>
              <div className="flex px-4 max-sm:px-0 overflow-x-auto scroll__hidden text-sm">
                {items?.map((obj) => (
                  <SearchProduct click={() => setFocused(false)} key={obj.id} product={obj} />
                ))}
              </div>
            </div>
          </Container>
          <div className="shadow-[-25px_0px_20px_30px_rgba(255,255,255.5)] mt-24 mb-10"></div>
        </div>
      </div>
      <div
        className={cn(
          'bg-primary/30 transition-all',
          focused ? 'opacity-100 h-svh' : 'opacity-0 pointer-events-none',
        )}></div>
    </RemoveScroll>
  );
};
