import { Container } from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function Loading() {
  return (
    <Container className="mt-10 max-xl:px-3">
      <div className="flex justify-between max-xl:flex-col sm:items-center">
        <div className="max-md:w-[580px] max-sm:w-full">
          <Skeleton className="h-8 w-[400px]" />
          <div className="flex mt-7 gap-5 max-md:gap-2 max-md:grid-cols-2 max-md:grid">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                className={cn('w-[230px] max-md:w-full h-10', i === 2 ? 'col-span-2' : '')}
              />
            ))}
          </div>
          <Skeleton className="mt-12 h-10 w-[180px]" />
          <div className="flex gap-5 mt-2 max-md:flex-col max-md:gap-3 max-md:mt-4">
            <Skeleton className="w-[220px] max-md:w-full h-24" />
            <Skeleton className="w-[280px] max-md:w-full h-24" />
          </div>
          <Skeleton className="mt-10 h-8 w-[150px]" />
          <div className="flex gap-2 mt-3 mb-4 pb-4 border-b">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-9 w-[160px]" />
            ))}
          </div>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-3 mb-3">
              <Skeleton className="h-5 w-5" />
              <Skeleton key={i} className={cn('h-5 w-[160px]', i === 1 ? 'w-[320px]' : '')} />
            </div>
          ))}
        </div>
        <div className="flex max-sm:px-3 flex-col gap-6 w-[450px] max-xl:w-[600px] max-sm:w-full max-xl:mt-6">
          <Skeleton className="w-full h-28" />
          <Skeleton className="w-full h-44" />
        </div>
      </div>
    </Container>
  );
}
