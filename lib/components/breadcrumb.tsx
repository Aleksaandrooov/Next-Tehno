import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Category, Model, Product } from '@prisma/client';
import { House } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  Category?: Category | null;
  Model?: Model | null;
  Product?: Product;
  search?: string;
  className?: string;
}

export const Breadcrump: React.FC<Props> = ({ Category, Model, Product, search, className }) => {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="flex-nowrap whitespace-nowrap">
        <BreadcrumbItem className="cursor-pointer">
          <Link href="/" legacyBehavior passHref>
            <House size={16} />
          </Link>
        </BreadcrumbItem>
        {Category && <BreadcrumbSeparator />}
        {Category && (
          <BreadcrumbItem>
            <Link href="/all-products" legacyBehavior passHref>
              Каталог
            </Link>
          </BreadcrumbItem>
        )}
        {Model || Product ? <BreadcrumbSeparator className="max-md:hidden" /> : <></>}
        {Model || Product ? (
          <BreadcrumbItem className="hover:text-black transition-all max-md:hidden">
            <Link href={'/catalog?category=' + Category?.id} legacyBehavior passHref>
              {Category?.name}
            </Link>
          </BreadcrumbItem>
        ) : (
          <></>
        )}
        {Product?.modelId && <BreadcrumbSeparator />}
        {Product?.modelId && (
          <BreadcrumbItem className="hover:text-black transition-all">
            <Link
              href={'/catalog?category=' + Category?.id + `&model=` + Model?.id}
              legacyBehavior
              passHref>
              {Model?.name}
            </Link>
          </BreadcrumbItem>
        )}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="max-w-[600px] overflow-hidden text-ellipsis">
            {!Category
              ? !search
                ? 'Каталог'
                : search
              : !Product
                ? !Model
                  ? Category?.name
                  : Model.name
                : Product.title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
