'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Props {
  search: string;
}

export const InputSearch: React.FC<Props> = ({ search }) => {
  const [value, isValue] = useState(search);
  const router = useRouter();

  const onChangeSearch = () => {
    event?.preventDefault();
    if (value) {
      router.push('/search?q=' + value);
    }
  };

  useEffect(() => {
    isValue(search);
  }, [search]);

  return (
    <div className="mt-6 relative">
      <form onSubmit={onChangeSearch}>
        <Input
          value={value}
          onChange={(e) => isValue(e.target.value)}
          className="h-14 text-3xl border-0 font-medium max-sm:text-xl pr-14 shadow-md rounded-lg focus-visible:ring-0"
          placeholder={!search ? 'Что вы ищете?' : ''}
        />
        <Search
          strokeWidth={1.5}
          onClick={() => onChangeSearch()}
          size={32}
          fill="white"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
        />
      </form>
    </div>
  );
};
