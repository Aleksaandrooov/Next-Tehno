import { Container } from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';
import { BreadcrumbLoading } from '@/lib/Loading/breadcrumb-loading';
import { ProductsLoading } from '@/lib/Loading/products-loading';

export default function Loading() {
  return (
    <div className="my-5 w-full">
      <div className="border-b mb-5">
        <Container className="max-sm:px-4">
          <BreadcrumbLoading />
          <div className="mt-6">
            <Skeleton className="h-14" />
            <Skeleton className="h-8 mt-2 w-[150px]" />
          </div>
          <div className="mt-8 flex justify-between items-center h-12">
            <Skeleton className="h-6 w-[80px]" />
            <Skeleton className="h-9 w-[130px]" />
          </div>
        </Container>
      </div>
      <div className="px-4 max-sm:px-2">
        <ProductsLoading />
      </div>
    </div>
  );
}
