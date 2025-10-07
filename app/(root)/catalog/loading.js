import { Container } from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';
import { BreadcrumbLoading } from '@/lib/Loading/breadcrumb-loading';
import { FiltersLoading } from '@/lib/Loading/filters-loading';
import { ProductsLoading } from '@/lib/Loading/products-loading';

export default function Loading() {
  return (
    <div className="w-full pt-5">
      <Container className="pb-2 max-sm:px-4 border-b">
        <BreadcrumbLoading />
        <div className="mt-8 flex justify-between items-end h-12">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>
      </Container>
      <Container className="max-w-[1620px] mt-6 max-lg:mt-2 flex px-2 items-start">
        <FiltersLoading />
        <ProductsLoading />
      </Container>
    </div>
  );
}
