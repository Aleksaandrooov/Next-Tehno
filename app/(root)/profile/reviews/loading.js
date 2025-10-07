import { Container } from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';
import { NavigationProfileLoading } from '@/lib/Loading/navigation-profile-loading';
import { ProfileItemLoading } from '@/lib/Loading/profile-item-loading';

export default function Loading() {
  return (
    <Container className="mt-10 max-sm:px-2">
      <Skeleton className="h-10 w-[300px] max-md:h-8 max-md:w-[260px] max-sm:h-6 max-sm:w-[200px]" />
      <div className="flex gap-5 mt-4 max-md:mt-6 max-sm:8">
        <NavigationProfileLoading />
        <div className="flex-1 flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <ProfileItemLoading key={i} />
          ))}
        </div>
      </div>
    </Container>
  );
}
