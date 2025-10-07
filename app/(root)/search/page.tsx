import { PageProps } from '@/.next/types/app/layout';
import ContainerProduct from '@/components/shared/Catalog/container-product';
import { SortPopup } from '@/components/shared/Catalog/sort-popup';
import { Container } from '@/components/shared/container';
import { fetchSearchProduct } from '@/components/shared/SearchPage/fetchSearchProduct';
import { InputSearch } from '@/components/shared/SearchPage/input';
import { Breadcrump } from '@/lib/components/breadcrumb';
import { words } from '@/lib/word-cals';

export default async function SearchPage({ searchParams }: PageProps) {
  const { q, order, type, page } = await searchParams;
  const newSearch = decodeURIComponent(q || '');

  const { products, count } = await fetchSearchProduct(
    newSearch,
    order || 'rating',
    type || 'desc',
    page,
  );

  return (
    <div className="my-5 w-full">
      <div className={count && newSearch ? 'border-b mb-5' : ''}>
        <Container className="max-sm:px-4">
          <Breadcrump search="Поиск" />
          <InputSearch search={newSearch} />
          {q ? (
            <h2 className="h-10 flex items-end text-gray-500 text-nowrap">
              По запросу{' '}
              <span className="mx-1 text-primary overflow-hidden text-wrap line-clamp-1">
                «{newSearch}»
              </span>{' '}
              {count ? 'найдено' : 'ничего не нашлось.'}
            </h2>
          ) : (
            <div className="h-10"></div>
          )}
          {count && newSearch ? (
            <div className="mt-8 flex justify-between items-center h-12">
              <div>
                {count} {words(count, ['товар', 'товара', 'товаров'])}
              </div>
              <SortPopup search="/search?" />
            </div>
          ) : (
            <></>
          )}
        </Container>
      </div>
      {newSearch && (
        <div className="px-4 max-sm:px-2">
          <ContainerProduct products={products} count={count} search="/search?" />
        </div>
      )}
    </div>
  );
}
