'use client';

import { filterStore } from '@/components/zustand/filter-store';
import { cn } from '@/lib/utils';
import { SlidersHorizontal, Upload } from 'lucide-react';
import React, { useLayoutEffect } from 'react';

export const FilterOnchange = () => {
  const { open, isOpen } = filterStore();
  useLayoutEffect(() => {
    if (window.innerWidth >= 1024 && !open) {
      isOpen();
    }
  }, []);

  return (
    <div onClick={() => isOpen()} className="flex gap-1 items-center cursor-pointer">
      <SlidersHorizontal
        size={18}
        className={cn('transition-all opacity-0', !open ? 'opacity-100' : '')}
      />
      <Upload
        className={cn('transition-all opacity-0 -ml-[22px]', open ? 'opacity-100' : '')}
        size={18}
      />
      фильтры
    </div>
  );
};
