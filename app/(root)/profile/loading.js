import { Container } from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';
import { NavigationProfileLoading } from '@/lib/Loading/navigation-profile-loading';

export default function Loading() {
  return (
    <Container className="mt-10 max-sm:px-2">
      <Skeleton className="h-10 w-[300px] max-md:h-8 max-md:w-[260px] max-sm:h-6 max-sm:w-[200px]" />
      <div className="flex gap-5 mt-4 max-md:mt-6 max-sm:8">
        <NavigationProfileLoading />
        <div className="flex-1">
          <div className="rounded-lg border p-5">
            <Skeleton className="h-7 w-[140px]" />
            <Skeleton className="h-4 w-[200px] mt-2" />
            <div className="grid grid-cols-2 gap-5 mt-5 max-sm:grid-cols-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="">
                  <Skeleton className="h-6 w-[80px]" />
                  <Skeleton className="h-10 mt-1" />
                </div>
              ))}
            </div>
            <div className="mt-5 justify-between flex">
              <Skeleton className="h-9 w-[100px]" />
              <Skeleton className="h-9 w-[140px]" />
            </div>
          </div>
          <div className="rounded-lg border p-5 mt-8 max-md:mt-4">
            <Skeleton className="h-7 w-[200px]" />
            <Skeleton className="h-4 w-[400px] mt-2" />
            <div className="grid grid-cols-2 gap-5 mt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={i == 0 ? 'max-sm:col-span-2' : ''}>
                  <Skeleton className="h-6 w-[80px]" />
                  <Skeleton className="h-10 mt-1" />
                </div>
              ))}
              <Skeleton className="h-9 w-[120px] mt-1" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
