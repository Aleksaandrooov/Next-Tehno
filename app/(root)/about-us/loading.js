import { Container } from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="my-14 w-full max-md:my-8">
      <Container className="max-md:px-2">
        <Skeleton className="h-12 w-[200px]" />
        <div className="grid grid-cols-3 max-md:gap-3 max-md:grid-cols-1 mt-10 gap-5 max-md:mt-5">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
        <Skeleton className="w-full h-[600px] mt-5 rounded-2xl max-md:h-[400px] max-sm:h-[250px]" />
      </Container>
    </div>
  );
}
