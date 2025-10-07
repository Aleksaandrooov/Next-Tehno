import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from '../container';
import { Cpu } from 'lucide-react';
import { SearchInput } from '../Search/Search-input';
import { HeaderButton } from './header-button';
import Link from 'next/link';
import { SearchFocused } from '../Search/search-focused';
import { prisma } from '@/prisma/prisma-client';

interface Props {
  className?: string;
}

export const Header = async ({ className }: Props) => {
  const models = await prisma.model.findMany({
    take: 10,
  });

  return (
    <div className={cn('bg-white h-14 border-b lg:sticky z-50 top-0 max-lg:shadow-sm', className)}>
      <Container className="flex h-full items-center px-4 max-sm:px-2">
        <Link href="/" className="flex gap-1 items-center cursor-pointer">
          <Cpu className="max-lg:size-5 max-sm:size-4" strokeWidth={1.5} />
          <h1 className="text-2xl font-semibold max-lg:text-xl max-sm:text-base max-sm:font-normal">
            Техно-Рост
          </h1>
        </Link>
        <SearchInput />
        <HeaderButton />
      </Container>
      <SearchFocused models={models} />
    </div>
  );
};
