import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { prisma } from '@/prisma/prisma-client';
import { Container } from '../container';

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = async ({ className }) => {
  const category = await prisma.category.findMany({
    include: {
      models: {
        orderBy: {
          id: 'asc',
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
  });

  return (
    <div className={cn('bg-zinc-950 py-5 max-sm:pt-1', className)}>
      <Container className="border-b mb-3 max-sm:px-4 gap-14 max-md:gap-2 pb-3 flex justify-between max-md:flex-col text-white/50 border-gray-400">
        <div className="grid grid-cols-4 flex-1 px-10 max-md:px-0 max-xl:grid-cols-2 max-md:grid-cols-3 max-sm:hidden">
          <h1 className="text-lg text-white">Каталог</h1>
          {category.map((obj) => (
            <Link
              key={obj.id}
              href="/catalog"
              className="hover:text-white transition-all max-md:text-sm text-nowrap">
              {obj.name}
            </Link>
          ))}
          <Link
            href="/information"
            className="hover:text-white transition-all max-md:text-sm text-nowrap">
            Политика конфиденциальности
          </Link>
          <Link
            href="/information?type=offer"
            className="hover:text-white transition-all max-md:text-sm text-nowrap">
            Договор публичной оферты
          </Link>
          <Link
            href="/information?type=payment"
            className="hover:text-white transition-all max-md:text-sm text-nowrap">
            Оплата и доставка
          </Link>
        </div>
        <div className="flex md:flex-col max-md:flex-row-reverse justify-between items-end">
          <Link href="tel:+79162834943" className="text-right">
            <div className="text-white max-md:text-sm">+7 (916) 283 49-43</div>
            <div className="text-sm max-md:text-xs">с 9:00 до 22:00, без выходных</div>
          </Link>
          <div className="flex flex-col text-right max-md:text-left max-md:mt-2">
            <h1 className="text-lg text-white lg:hidden max-md:text-base max-sm:hidden">
              О компании
            </h1>
            <Link href="/about-us" className="hover:text-white max-md:text-sm transition-all">
              Адрес магазина
            </Link>
            <Link href="/about-us" className="hover:text-white max-md:text-sm transition-all">
              Контакты
            </Link>
          </div>
        </div>
      </Container>
      <Container className="max-sm:text-center">
        <span className="text-white max-sm:text-sm">© 2024 Техно-Рост. Все права защищены</span>
      </Container>
    </div>
  );
};
