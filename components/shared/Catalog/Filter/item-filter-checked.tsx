'use client';

import { cn } from '@/lib/utils';
import { Circle, CircleCheckBig } from 'lucide-react';
import React from 'react';

interface Props {
  name: string;
  id: number;
  selectItem: Set<number>;
  changeItem: (id: number) => void;
}

export const ItemFilterChecked: React.FC<Props> = ({ name, id, selectItem, changeItem }) => {
  return (
    <div
      onClick={() => changeItem(id)}
      className={cn(
        'flex justify-between px-3 mx-4 max-sm:mx-0 py-2 items-center cursor-pointer transition-all rounded-md relative',
        selectItem.has(id) ? 'bg-neutral-100' : 'hover:bg-neutral-100',
      )}>
      <div className="">{name}</div>
      <Circle
        size={16}
        color="gray"
        className={cn('transition-all', selectItem.has(id) ? 'opacity-0' : 'opacity-100')}
      />
      <CircleCheckBig
        size={16}
        color="black"
        className={cn(
          'absolute right-3 transition-all',
          selectItem.has(id) ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  );
};
