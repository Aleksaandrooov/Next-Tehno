import { productType } from '@/components/shared/Product/product-type';

export const setReset = (product: productType | undefined) => {
  const set = {
    title: product?.title,
    price: String(product?.price),
    img: product?.Img?.img.join(', '),
    rating: String(product?.rating),
    quantity: String(product?.quantity),
    description: product?.description,
    category: String(product?.categoryId),
    model: String(product?.modelId),
    capacity: String(product?.capacityId),
    diagonal: String(product?.diagonalId),
    memory: String(product?.memoryId),
    power: String(product?.powerId),
    brand: String(product?.brandId),
    voltage: String(product?.voltageId),
    color: String(product?.colorId),
    connector: String(product?.connectorId),
  };

  return set;
};
