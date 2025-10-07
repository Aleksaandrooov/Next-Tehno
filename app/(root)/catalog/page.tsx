import { Container } from '@/components/shared/container';
import FilterClient from '@/components/shared/Catalog/Filter/filter-client';
import { FilterOnchange } from '@/components/shared/Catalog/Filter/filter-onchange';
import Link from 'next/link';
import { Breadcrump } from '@/lib/components/breadcrumb';
import { SortPopup } from '@/components/shared/Catalog/sort-popup';
import { findProducts } from '@/lib/find-products';
import { searchInterface } from '@/components/shared/Catalog/Filter/filterChange/type-filter';
import ContainerProduct from '@/components/shared/Catalog/container-product';

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<searchInterface>;
}) {
  const params = await searchParams;
  const { category: categoryId, model } = params;
  const { products, count, category } = await findProducts(params, categoryId, model);

  return (
    <div className="my-5 w-full">
      <Container className="border-b pb-2 max-sm:px-4">
        <Breadcrump
          Category={category}
          Model={category?.models?.find((obj) => obj.id === Number(model))}
        />
        <div className="mt-8 flex justify-between items-end h-12">
          <div className="flex gap-4 items-end">
            <FilterOnchange />
            <div className="text-sm flex gap-2 max-w-[950px] max-xl:max-w-[700px] max-lg:max-w-[500px] max-md:max-w-[300px] max-sm:hidden overflow-x-auto scroll__hidden">
              {!model &&
                category?.models?.map((obj) => (
                  <Link
                    key={obj.id}
                    href={'/catalog?category=' + categoryId + '&model=' + obj.id}
                    className="py-1 px-3 rounded-md bg-gray-100 hover:bg-gray-200 text-nowrap">
                    {obj.name}
                  </Link>
                ))}
            </div>
          </div>
          <SortPopup search="/catalog?" />
        </div>
      </Container>
      <Container className="max-w-[1620px] mt-6 max-lg:mt-2 flex px-2 items-start">
        <FilterClient category={category} catogoryId={categoryId} modelId={model} />
        <ContainerProduct products={products} count={count} catalog={true} search="/catalog?" />
      </Container>
    </div>
  );
}
