import React from 'react';
import { Container } from '../../container';
import { productGroup } from '../../../../lib/Arrays/productGroup';
import { Description } from './description';
import { productType } from '../product-type';
import { Specifications } from './specifications';
import { Reviews } from './reviews';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export const ProductBottom = async ({ product }: { product: productType }) => {
  const productFilters = productGroup(product);
  const session = await getServerSession(authOptions);

  return (
    <div className="mt-4">
      <Container className="flex-col flex gap-3 max-w-[1480px] max-sm:px-2">
        {product.description && (
          <Description text={product.description} title={product.title} variant="Описание" />
        )}
        <Specifications variant="Характеристики" obj={productFilters} />
        <Reviews
          email={session?.user?.email}
          id={product.id}
          title={product.title}
          variant="Отзывы"
          item={product.reviewItem}
        />
      </Container>
    </div>
  );
};
