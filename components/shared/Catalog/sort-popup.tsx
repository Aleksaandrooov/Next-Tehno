'use client';
import { paramsAppend } from '@/lib/params-append';
import { sortMap } from '@/lib/Arrays/sort-items';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  search: string;
}

export const SortPopup: React.FC<Props> = ({ search }) => {
  const searchParams = useSearchParams();
  const order = searchParams.get('order');
  const type = searchParams.get('type');
  const params = paramsAppend(searchParams, 'order', 'type', 'page');
  const router = useRouter();

  const orderBy =
    sortMap.find((obj) => obj.order == order && obj.type == type) || sortMap.find((obj) => obj);

  const routerPush = (id: string) => {
    const sort = sortMap.find((obj) => obj.id == Number(id));
    router.push(search + params + '&order=' + sort?.order + '&type=' + sort?.type);
  };

  return (
    <div className="h-8 text-center">
      <Select onValueChange={(e) => routerPush(e)} defaultValue={String(orderBy?.id)}>
        <SelectTrigger className="gap-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortMap.map((obj) => (
            <SelectItem key={obj.id} value={String(obj.id)}>
              {obj.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
