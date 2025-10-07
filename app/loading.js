import { Container } from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="w-full p-4">
      <Skeleton className="mx-auto h-[480px] max-xl:h-[380px] max-lg:h-[280px] max-[900px]:h-[230px] max-[550px]:h-[190px]" />
      <div className="flex justify-center gap-3 max-sm:gap-1 max-xl:grid grid-cols-2 max-xl:px-4 mt-5">
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            className="xl:w-[300px] h-[250px] max-md:h-[180px] max-[500px]:h-[120px] rounded-xl"
          />
        ))}
      </div>
      <div className="mt-14 max-md:mt-8">
        <Container>
          <Skeleton className="w-28 h-10 max-md:w-24 max-md:h-8" />
        </Container>
        <div className="grid grid-cols-4 mt-8 max-md:mt-4 gap-2 max-md:gap-1">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="max-md:h-[150px] max-sm:h-[130px] h-[200px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
