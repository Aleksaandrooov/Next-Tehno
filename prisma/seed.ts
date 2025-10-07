import { prisma } from './prisma-client';
import { Brand, Capacity, Color, Connector, Img, Model, Power, Products, Voltage } from './schema';

export const Category = [
  {
    name: 'Смартфоны',
    img: 'https://cdn-icons-png.flaticon.com/512/2179/2179432.png',
    price: 'от:',
  },
  {
    name: 'Рации',
    img: 'https://cdn-icons-png.flaticon.com/512/2369/2369568.png',
    price: 'от:',
  },
  {
    name: 'Блоки питания',
    img: 'https://cdn-icons-png.flaticon.com/512/14600/14600799.png',
    price: 'от:',
    brands: {
      connect: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
      ],
    },
    voltages: {
      connect: [
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 9 },
        { id: 13 },
        { id: 14 },
        { id: 15 },
        { id: 16 },
        { id: 17 },
        { id: 18 },
      ],
    },
    connectors: {
      connect: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
        { id: 12 },
      ],
    },
  },
  {
    name: 'Аккумуляторы',
    img: 'https://cdn-icons-png.flaticon.com/512/6380/6380086.png',
    price: 'от:',
    brands: {
      connect: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 9 },
        { id: 11 },
        { id: 12 },
        { id: 13 },
        { id: 14 },
      ],
    },
    voltages: {
      connect: [
        { id: 1 },
        { id: 2 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 8 },
        { id: 10 },
        { id: 11 },
      ],
    },
    capacitys: {
      connect: [
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 10 },
        { id: 12 },
        { id: 13 },
        { id: 14 },
        { id: 17 },
        { id: 19 },
        { id: 20 },
        { id: 21 },
        { id: 22 },
      ],
    },
  },
  {
    name: 'Клавиатуры',
    img: 'https://cdn-icons-png.flaticon.com/512/7560/7560099.png',
    price: 'от:',
  },
  {
    name: 'Матрицы',
    img: 'https://cdn-icons-png.flaticon.com/512/11905/11905946.png',
    price: 'от:',
  },
  {
    name: 'Жесткие диски',
    img: 'https://cdn-icons-png.flaticon.com/512/8900/8900356.png',
    price: 'от:',
  },
  {
    name: 'Катриджи для принтеров',
    img: 'https://cdn-icons-png.flaticon.com/512/7425/7425909.png',
    price: 'от:',
  },
];

async function up() {
  // await prisma.brand.createMany({
  //   data: Brand,
  // });
  // await prisma.voltage.createMany({
  //   data: Voltage,
  // });
  // await prisma.connector.createMany({
  //   data: Connector,
  // });
  // await prisma.power.createMany({
  //   data: Power,
  // });
  // await prisma.color.createMany({
  //   data: Color,
  // });
  // await prisma.img.createMany({
  //   data: Img,
  // });
  // await prisma.capacity.createMany({
  //   data: Capacity,
  // });
  // await prisma.category.createMany({
  //   data: Category,
  // });
  // await prisma.model.createMany({
  //   data: Model,
  // });
  // await prisma.product.createMany({
  //   data: Products,
  // });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  // await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Favorites" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "FavoritesItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "VerificationCode" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ReviewsItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE`;

  // await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  // await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    // await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
