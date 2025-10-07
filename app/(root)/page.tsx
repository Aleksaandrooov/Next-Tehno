import { MainCart } from '@/components/shared/Main/main-cart';
import { MainCategoryCart } from '@/components/shared/Main/main-categoryCart';
import { MainInfo } from '@/components/shared/Main/main-info';
import { MainProducts } from '@/components/shared/Main/main-products';
import { PosterAdvertisement } from '@/components/shared/Main/poster-advertisement';
import { prisma } from '@/prisma/prisma-client';

export default async function Home() {
  const category = await prisma.category.findMany();
  return (
    <div className="w-full">
      <PosterAdvertisement />
      <MainCart className="mt-5" />
      <MainCategoryCart category={category} />
      <MainInfo className="mt-14 max-w-[1620px]" />
      <MainProducts />
    </div>
  );
}
