import { searchInterface } from '@/components/shared/Catalog/Filter/filterChange/type-filter';
import { prisma } from '@/prisma/prisma-client';

const MIN_PRICE = 90;
const MAX_PRICE = 429990;
export const countPage = 30;

export const findProducts = async (params: searchInterface, categoryId: string, model: string) => {
  const capacity = params.capacitys?.split(',').map(Number);
  const diagonal = params.diagonals?.split(',').map(Number);
  const memory = params.memorys?.split(',').map(Number);
  const power = params.powers?.split(',').map(Number);
  const brand = params.brands?.split(',').map(Number);
  const voltage = params.voltages?.split(',').map(Number);
  const color = params.colors?.split(',').map(Number);
  const connector = params.connectors?.split(',').map(Number);
  const priceForm = Number(params.priceForm) || MIN_PRICE;
  const priceTo = Number(params.priceTo) || MAX_PRICE;
  const page = Number(params.page);
  const sort = params.order || 'rating';
  const type = params.type || 'desc';

  const [products, count, category] = await Promise.all([
    prisma.product.findMany({
      where: {
        categoryId: Number(categoryId) || 1,
        modelId: Number(model) || undefined,
        capacityId: {
          in: capacity || undefined,
        },
        diagonalId: {
          in: diagonal || undefined,
        },
        memoryId: {
          in: memory || undefined,
        },
        powerId: {
          in: power || undefined,
        },
        brandId: {
          in: brand || undefined,
        },
        voltageId: {
          in: voltage || undefined,
        },
        colorId: {
          in: color || undefined,
        },
        connectorId: {
          in: connector || undefined,
        },
        price: {
          gte: priceForm,
          lte: priceTo,
        },
        quantity: {
          gte: 1,
        },
      },
      orderBy: [
        { rating: sort == 'rating' ? type : undefined },
        { price: sort == 'rating' ? undefined : type },
      ],
      include: {
        Img: true,
        reviewItem: true,
      },
      skip: page > 0 ? (page - 1) * countPage || undefined : undefined,
      take: countPage,
    }),
    prisma.product.count({
      where: {
        categoryId: Number(categoryId) || 1,
        modelId: Number(model) || undefined,
        capacityId: {
          in: capacity || undefined,
        },
        diagonalId: {
          in: diagonal || undefined,
        },
        memoryId: {
          in: memory || undefined,
        },
        powerId: {
          in: power || undefined,
        },
        brandId: {
          in: brand || undefined,
        },
        voltageId: {
          in: voltage || undefined,
        },
        colorId: {
          in: color || undefined,
        },
        connectorId: {
          in: connector || undefined,
        },
        price: {
          gte: priceForm,
          lte: priceTo,
        },
        quantity: {
          gte: 1,
        },
      },
    }),
    prisma.category.findFirst({
      where: {
        id: Number(categoryId) || undefined,
      },
      include: {
        models: {
          orderBy: {
            id: 'asc',
          },
        },
        capacitys: {
          orderBy: {
            id: 'asc',
          },
        },
        diagonals: {
          orderBy: {
            id: 'asc',
          },
        },
        memorys: {
          orderBy: {
            id: 'asc',
          },
        },
        powers: {
          orderBy: {
            id: 'asc',
          },
        },
        brands: {
          orderBy: {
            name: 'asc',
          },
        },
        voltages: {
          orderBy: {
            id: 'asc',
          },
        },
        colors: {
          orderBy: {
            name: 'asc',
          },
        },
        connectors: {
          orderBy: {
            id: 'asc',
          },
        },
      },
    }),
  ]);

  return { products, count, category };
};
