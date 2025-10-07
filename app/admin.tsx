'use server';

import { nameType } from '@/components/shared/admin/fetch-filter';
import { TFormAddCategory, TFormAddProduct, TFormDelivery } from '@/components/shared/form/shemas';
import { CartItemType } from '@/components/zustand/dto/getCart';
import { prisma } from '@/prisma/prisma-client';
import { Status } from '@prisma/client';

export async function addFilters(name: nameType, text: string) {
  const find = await (prisma[name] as any).findFirst({
    where: {
      name: text,
    },
  });

  if (find) {
    throw Error();
  }

  if (name !== 'model') {
    await (prisma[name] as any).create({
      data: {
        name: text,
      },
    });
  } else {
    await prisma[name].create({
      data: {
        name: text,
        categoryId: 1,
      },
    });
  }
}

export async function deleteFilters(name: nameType, text: string) {
  const find = await (prisma[name] as any).findFirst({
    where: {
      name: text,
    },
  });

  if (!find) {
    throw Error();
  }

  await (prisma[name] as any).delete({
    where: {
      id: find.id,
    },
  });
}

export async function settingFilter(categoryId: number, name: nameType, id: number) {
  if (name !== 'model') {
    const find = await (prisma[name] as any).findFirst({
      where: {
        id,
        category: {
          some: {
            id: categoryId,
          },
        },
      },
    });

    if (find) {
      await (prisma[name] as any).update({
        where: {
          id,
        },
        data: {
          category: {
            disconnect: {
              id: categoryId,
            },
          },
        },
      });
    } else {
      await (prisma[name] as any).update({
        where: {
          id,
        },
        data: {
          category: {
            connect: {
              id: categoryId,
            },
          },
        },
      });
    }
  } else {
    const model = await prisma.model.findFirst({
      where: {
        id,
        categoryId,
      },
    });

    if (!model) {
      await prisma.model.update({
        where: {
          id,
        },
        data: {
          categoryId: categoryId,
        },
      });
    }
  }
}

export async function settingCategory(categoryId: number, data?: TFormAddCategory) {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new Error();
  }
  if (data) {
    await prisma.category.update({
      where: {
        id: categoryId,
      },
      data,
    });
  } else {
    await prisma.product.deleteMany({
      where: {
        categoryId: categoryId,
      },
    });
    await prisma.model.deleteMany({
      where: {
        categoryId: categoryId,
      },
    });
    await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        capacitys: {
          set: [],
        },
        diagonals: {
          set: [],
        },
        memorys: {
          set: [],
        },
        powers: {
          set: [],
        },
        brands: {
          set: [],
        },
        voltages: {
          set: [],
        },
        colors: {
          set: [],
        },
        connectors: {
          set: [],
        },
      },
    });
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
}
export async function addCategory(data: TFormAddCategory) {
  await prisma.category.create({
    data,
  });
}

export async function createProduct(data: TFormAddProduct, id?: string) {
  const img = data.img.split(',');

  const createImage = await prisma.img.create({
    data: {
      img,
    },
  });

  if (id) {
    await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        title: data.title,
        price: Number(data.price),
        rating: Number(data.rating),
        quantity: Number(data.quantity),
        description: data.description || '',
        categoryId: Number(data.category),
        imgId: createImage.id,
        modelId: data.model ? Number(data.model) : undefined,
        capacityId: data.capacity ? Number(data.capacity) : undefined,
        diagonalId: data.diagonal ? Number(data.diagonal) : undefined,
        memoryId: data.memory ? Number(data.memory) : undefined,
        powerId: data.power ? Number(data.power) : undefined,
        brandId: data.brand ? Number(data.brand) : undefined,
        voltageId: data.voltage ? Number(data.voltage) : undefined,
        colorId: data.color ? Number(data.color) : undefined,
        connectorId: data.connector ? Number(data.connector) : undefined,
      },
    });
  } else {
    await prisma.product.create({
      data: {
        title: data.title,
        price: Number(data.price),
        rating: Number(data.rating),
        quantity: Number(data.quantity),
        description: data.description || '',
        categoryId: Number(data.category),
        imgId: createImage.id,
        modelId: data.model ? Number(data.model) : undefined,
        capacityId: data.capacity ? Number(data.capacity) : undefined,
        diagonalId: data.diagonal ? Number(data.diagonal) : undefined,
        memoryId: data.memory ? Number(data.memory) : undefined,
        powerId: data.power ? Number(data.power) : undefined,
        brandId: data.brand ? Number(data.brand) : undefined,
        voltageId: data.voltage ? Number(data.voltage) : undefined,
        colorId: data.color ? Number(data.color) : undefined,
        connectorId: data.connector ? Number(data.connector) : undefined,
      },
    });
  }
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    return null;
  }

  await prisma.cartItem.deleteMany({
    where: {
      productItemId: product.id,
    },
  });

  await prisma.product.delete({
    where: {
      id: product.id,
    },
  });
}

export async function settingOrder(status: Status, id: number) {
  const findOrder = await prisma.order.findFirst({
    where: {
      id,
    },
  });

  if (!findOrder) {
    throw new Error();
  }

  await prisma.order.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
}

export async function settingOrderQuantity(orderId: number, id: number, count: number) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      throw new Error();
    }

    const item = Object.values(order.items as string) as unknown as CartItemType['items'][];
    if (count > 0) {
      const newItem = item.map(({ quantity, ...obj }) => {
        if (obj.id === id) {
          return { quantity: count, ...obj };
        }
        return { quantity, ...obj };
      });

      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          totalAmount:
            newItem.reduce((acc, curr) => {
              return acc + curr.quantity * curr.productItem.price;
            }, 0) + (order.price || 0),
          items: newItem,
        },
      });
    } else {
      const newItem = item.filter((obj) => obj.id !== id);
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          items: newItem,
          totalAmount:
            newItem.reduce((acc, curr) => {
              return acc + curr.quantity * curr.productItem.price;
            }, 0) + (order.price || 0),
        },
      });
    }
  } catch (error) {
    console.log(error, 'Ошибка редактирования заказа');
  }
}

export async function settingOrderDelivery(
  orderId: number,
  delivery: TFormDelivery,
  deliveyType: { name: string; price?: number },
) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      throw new Error();
    }
    const item = Object.values(order.items as string) as unknown as CartItemType['items'][];
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        address: delivery.address,
        flat: Number(delivery.flat),
        floor: Number(delivery.floor),
        entrance: Number(delivery.entrance),
        type: deliveyType.name,
        price: deliveyType.price,
        totalAmount:
          item.reduce((acc, curr) => {
            return acc + curr.quantity * curr.productItem.price;
          }, 0) + (deliveyType.price || 0),
      },
    });
  } catch (error) {
    console.log(error);
  }
}
