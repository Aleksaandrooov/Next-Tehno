import { prisma } from '@/prisma/prisma-client';
import { Category } from '@prisma/client';

export type nameType =
  | 'category'
  | 'model'
  | 'capacity'
  | 'diagonal'
  | 'memory'
  | 'power'
  | 'brand'
  | 'voltage'
  | 'color'
  | 'connector';

export type filterType = {
  filter: ({
    id: number;
    name: string;
    categoryId?: number;
  } & {
    category?: Category[];
  })[];
  name: nameType;
};

export const fetchFilter = async () => {
  const category = await prisma.category.findMany({
    orderBy: {
      id: 'asc',
    },
  });

  const model = await prisma.model.findMany({
    orderBy: {
      id: 'asc',
    },
  });
  const capacity = await prisma.capacity.findMany({
    include: {
      category: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
  const diagonal = await prisma.diagonal.findMany({
    include: {
      category: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
  const memory = await prisma.memory.findMany({
    include: {
      category: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
  const power = await prisma.power.findMany({
    include: {
      category: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
  const brand = await prisma.brand.findMany({
    include: {
      category: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
  const voltage = await prisma.voltage.findMany({
    include: {
      category: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
  const color = await prisma.color.findMany({
    include: {
      category: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
  const connector = await prisma.connector.findMany({
    include: {
      category: true,
    },
    orderBy: {
      id: 'asc',
    },
  });

  const filters: filterType[] = [
    {
      filter: category,
      name: 'category',
    },
    {
      filter: model,
      name: 'model',
    },
    {
      filter: capacity,
      name: 'capacity',
    },
    {
      filter: diagonal,
      name: 'diagonal',
    },
    {
      filter: memory,
      name: 'memory',
    },
    {
      filter: power,
      name: 'power',
    },
    {
      filter: brand,
      name: 'brand',
    },
    {
      filter: voltage,
      name: 'voltage',
    },
    {
      filter: color,
      name: 'color',
    },
    {
      filter: connector,
      name: 'connector',
    },
  ];

  return { filters };
};
