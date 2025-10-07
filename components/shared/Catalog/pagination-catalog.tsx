'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { countPage } from '@/lib/find-products';
import { paginationCalc } from '@/lib/pagination-calc';
import { paramsAppend } from '@/lib/params-append';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface Props {
  className?: string;
  length: number;
  search: string;
}

export const PaginationCatalog: React.FC<Props> = ({ className, length, search }) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const params = paramsAppend(searchParams, 'page');
  const numberForCeil = Math.ceil(length / countPage);

  return (
    <div className={className}>
      {length > countPage && page < numberForCeil + 1 && (page ? page > 0 : true) && (
        <Pagination className="relative max-w-min">
          <PaginationContent>
            {page !== 1 && page ? (
              <PaginationItem className="absolute -left-14">
                <Link href={search + params + '&page=' + (page - 1)} legacyBehavior passHref>
                  <PaginationPrevious />
                </Link>
              </PaginationItem>
            ) : (
              <></>
            )}
            {[...Array(numberForCeil)]
              .filter((_, i) => i <= 3)
              .map((_, i) => (
                <PaginationItem key={i}>
                  <Link
                    href={search + params + '&page=' + paginationCalc(i, page, numberForCeil)}
                    legacyBehavior
                    passHref>
                    <PaginationLink
                      isActive={page ? page == paginationCalc(i, page, numberForCeil) : i == 0}>
                      {paginationCalc(i, page, numberForCeil)}
                    </PaginationLink>
                  </Link>
                </PaginationItem>
              ))}
            {numberForCeil > 4 && page < numberForCeil - 2 && page < numberForCeil && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {numberForCeil !== page && (
              <PaginationItem className="absolute -right-14">
                <Link href={search + params + '&page=' + (page + 1)} legacyBehavior passHref>
                  <PaginationNext />
                </Link>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
