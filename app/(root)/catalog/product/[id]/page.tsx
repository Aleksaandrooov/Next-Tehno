import { Container } from '@/components/shared/container';
import { ImageProduct } from '@/components/shared/Product/image-product';
import { ProductBottom } from '@/components/shared/Product/productBottom/product-bottom';
import { ProductMain } from '@/components/shared/Product/product-main';
import { Breadcrump } from '@/lib/components/breadcrumb';
import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';
import { PageProps } from '@/.next/types/app/layout';

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      Img: true,
      Capacity: true,
      Memory: true,
      Diagonal: true,
      Connector: true,
      Power: true,
      Brand: true,
      Color: true,
      Model: true,
      Voltage: true,
      Category: true,
      reviewItem: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });
  if (!product) {
    return redirect('/catalog');
  }

  return (
    <div className="w-full">
      <Container className="max-sm:px-2">
        <div className="my-5">
          <Breadcrump
            className="max-lg:hidden"
            Product={product}
            Category={product.Category}
            Model={product.Model}
          />
        </div>
        <h1 className="text-xl font-medium px-10 max-lg:px-2 max-sm:px-0">{product.title}</h1>
      </Container>
      <Container className="flex justify-center max-lg:px-2 gap-20 max-lg:gap-0 max-xl:gap-10 max-lg:flex-col max-lg:items-center">
        <ImageProduct image={product.Img!} />
        <ProductMain product={product} item={product.reviewItem} />
      </Container>
      <ProductBottom product={product} />
    </div>
  );
}
