import { Container } from '@/components/shared/container';
import { Skeleton } from '@/components/ui/skeleton';
import { BreadcrumbLoading } from '@/lib/Loading/breadcrumb-loading';

export default function Loading() {
  return (
    <div className="w-full">
      <Container className="max-sm:px-2">
        <div className="my-5">
          <BreadcrumbLoading className="max-lg:hidden" />
        </div>
        <Skeleton className="px-10 max-lg:px-2 max-sm:px-0 h-8 w-[600px]" />
      </Container>
      <Container className="flex justify-around max-lg:px-2 max-lg:gap-0 max-lg:flex-col max-md:mt-24">
        <div className="w-[700px] h-[400px] max-lg:h-auto max-xl:w-[550px] max-lg:w-full max-lg:p-0 p-5 mt-20 max-lg:mt-0 mb-10 max-lg:mb-4">
          <div className="flex gap-16 max-xl:flex-col-reverse max-xl:gap-10 max-xl:items-center">
            <div className="max-h-[400px] w-[90px] max-xl:h-16 max-xl:w-[280px] max-sm:w-[240px] flex flex-col gap-2 max-xl:flex-row">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-full h-[80px]" />
              ))}
            </div>
            <div className="w-[600px] h-[420px] max-lg:w-auto max-xl:h-auto max-xl:w-auto">
              <Skeleton className="h-full w-[400px] max-xl:w-[300px] max-xl:h-[250px] max-md:w-[250px] max-md:h-[200px] max-[370px]:w-[220px]" />
            </div>
          </div>
        </div>
        <div className="my-14 max-lg:my-6 w-[440px] max-lg:w-full">
          <div className="flex mb-3 gap-2 items-center justify-between">
            <Skeleton className="h-8 w-[80px]" />
            <Skeleton className="h-8 w-8" />
          </div>
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-[70px] rounded-xl px-5" />
            ))}
          </div>
          <div className="mt-5 pt-5 border-t">
            <Skeleton className="w-full h-[50px]" />
          </div>
          <div className="flex justify-between mt-2">
            <Skeleton className="h-6 w-[80px]" />
            <Skeleton className="h-6 w-[80px]" />
          </div>
        </div>
      </Container>
      <div className="mt-4">
        <Container className="flex-col flex gap-3 max-w-[1480px] max-sm:px-2">
          <div className="mt-6 shadow-lg p-6 max-lg:mt-0 rounded-xl border">
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="mx-auto h-10 w-[320px] mt-4" />
            <Skeleton className="w-full h-32 mt-4" />
          </div>
        </Container>
      </div>
    </div>
  );
}
