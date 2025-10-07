import { CategoryAndModelItem } from '@/components/shared/All-products/category-and-model-item';
import { Container } from '@/components/shared/container';
import { Breadcrump } from '@/lib/components/breadcrumb';
import { prisma } from '@/prisma/prisma-client';

export default async function ProductsPage() {
  const fetchCategoryAndModel = await prisma.category.findMany({
    include: {
      models: true,
      brands: true,
    },
  });
  const fetchBrend = await prisma.brand.findMany({});

  return (
    <div className="my-5 w-full max-md:mb-0">
      <Container className="max-md:px-4">
        <Breadcrump />
        <div className="grid grid-cols-2 mt-5 gap-5 max-lg:grid-cols-1">
          <CategoryAndModelItem brand={fetchBrend} />
          {fetchCategoryAndModel
            .filter((obj) => obj.bgImg)
            .map((obj) => (
              <CategoryAndModelItem key={obj.id} models={obj} />
            ))}
        </div>
      </Container>
    </div>
  );
}
