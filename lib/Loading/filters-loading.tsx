import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';

export const FiltersLoading = () => {
  return (
    <div className="w-[350px] shrink-0 max-lg:hidden px-6 mt-6">
      <div className="flex justify-between">
        <Skeleton className="h-8 mb-6 w-32" />
        <ChevronDown size={16} className="text-gray-400" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-8 mb-6 w-[160px]" />
        <ChevronDown size={16} className="text-gray-400" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-8 mb-6 w-[120px]" />
        <ChevronDown size={16} className="text-gray-400" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-8 mb-4 w-[80px]" />
        <ChevronUp size={16} className="text-gray-400" />
      </div>
      <div className="grid-cols-2 grid gap-6">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
      <Skeleton className="h-3 mt-4 mx-4" />
      <Skeleton className="mt-12 h-10" />
      <Skeleton className="mt-2 h-10" />
    </div>
  );
};
