import { Container } from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';
import { BreadcrumbLoading } from '@/lib/Loading/breadcrumb-loading';

export default function Loading() {
  return (
    <div className="my-5 w-full max-md:mb-0">
      <Container className="max-md:px-4">
        <BreadcrumbLoading />
        <div className="grid grid-cols-2 mt-5 gap-5 max-lg:grid-cols-1">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[500px] max-md:h-[400px]" />
          ))}
        </div>
      </Container>
    </div>
  );
}
