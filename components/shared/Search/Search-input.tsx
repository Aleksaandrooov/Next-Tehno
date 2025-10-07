'use client';

import React from 'react';
import { SearchStore } from '../../zustand/search-store';

export const SearchInput: React.FC = () => {
  const { setFocused } = SearchStore();

  return (
    <div className="flex-1 px-10 max-lg:px-5">
      <div
        onClick={() => setFocused(true)}
        className="bg-neutral-100 py-2 cursor-pointer rounded-md border px-2 w-full text-gray-600 text-sm">
        Поиск товаров...
      </div>
    </div>
  );
};
