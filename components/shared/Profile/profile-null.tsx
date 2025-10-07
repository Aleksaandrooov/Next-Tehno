import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronRight, PackageOpen } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  title: string;
  text: string;
  className?: string;
}

export const ProfileNull: React.FC<Props> = ({ title, text, className }) => {
  return (
    <div className="w-full text-center">
      <h1
        className={cn(
          'mt-10 mb-2 text-3xl flex gap-3 justify-center items-center max-sm:text-xl text-nowrap',
          className,
        )}>
        {title} <PackageOpen className="size-12 max-sm:size-8" strokeWidth={1.25} />
      </h1>
      <div className="text-gray-500 mb-4 max-sm:text-sm">{text}</div>
      <Link href="/all-products" className="w-min">
        <Button className="mx-auto max-sm:text-xs max-sm:h-8 gap-1">
          Перейти в каталог <ChevronRight className="size-5 max-sm:size-4" />
        </Button>
      </Link>
    </div>
  );
};
