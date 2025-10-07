import { NavigationArray } from '@/lib/Arrays/navigation-array';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

export const NavigationBar = ({ id, role }: { id: number; role: 'USER' | 'ADMIN' }) => {
  return (
    <div
      className={cn(
        'w-[260px] shrink-0 py-4 border rounded-lg shadow-md flex h-full flex-col gap-2 max-lg:hidden',
        id === 6 ? 'max-xl:hidden' : '',
      )}>
      {NavigationArray.filter((obj) => obj.role === role || obj.role === 'USER').map((obj) => (
        <Link
          className={cn(
            'flex justify-between py-[10px] px-4 group',
            obj.id == 5 ? 'mt-5' : '',
            id == obj.id
              ? 'border-l-2 border-l-green-800 text-green-800 pl-[14px]'
              : 'hover:text-green-800',
          )}
          href={obj.url}
          key={obj.id}>
          <h1>{obj.name}</h1>
          <div className={id == obj.id ? '' : 'text-gray-400 group-hover:text-green-800'}>
            {obj.jsx}
          </div>
        </Link>
      ))}
    </div>
  );
};
