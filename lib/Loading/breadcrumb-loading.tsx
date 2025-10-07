import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { cn } from '../utils';

export const BreadcrumbLoading = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex gap-1 items-center', className)}>
      <Skeleton className="w-5 h-5" />
      <ChevronRight size={16} className="text-gray-300" />
      <Skeleton className="h-5 w-[50px]" />
      <ChevronRight size={16} className="text-gray-300 max-md:hidden" />
      <Skeleton className="h-5 w-24 max-md:hidden" />
      <ChevronRight size={16} className="text-gray-300" />
      <Skeleton className="h-5 w-36" />
    </div>
  );
};
