import { Container } from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';
import { NavigationProfileLoading } from '@/lib/Loading/navigation-profile-loading';

export default function Loading() {
  return (
    <Container className="mt-10 max-sm:px-2">
      <Skeleton className="h-10 w-[300px] max-md:h-8 max-md:w-[260px] max-sm:h-6 max-sm:w-[200px]" />
      <div className="flex gap-5 mt-4 max-md:mt-6 max-sm:8">
        <NavigationProfileLoading />
        <div className="flex-1 flex flex-col gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border max-h-[170px] rounded-lg p-4">
              <div className="border-b pb-2">
                <Skeleton className="h-6 w-[240px]" />
              </div>
              <div className="flex gap-4 mt-3 mb-2 items-center">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="w-[80px] h-[80px] max-md:hidden" />
                ))}
                <div className="ml-auto">
                  <Skeleton className="h-6 w-[120px]" />
                  <Skeleton className="h-6 w-[80px] ml-auto mt-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
