import React from 'react';
import { Container } from '../container';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { prisma } from '@/prisma/prisma-client';
import { HeaderProduct } from './header-product';

interface Props {
  className?: string;
}

export const HeaderCategories: React.FC<Props> = async ({ className }) => {
  const category = await prisma.category.findMany({
    include: {
      models: {
        orderBy: {
          id: 'asc',
        },
      },
      products: {
        include: {
          Img: true,
        },
        take: 6,
        orderBy: {
          rating: 'desc',
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
  });

  return (
    <div className={className}>
      <Container>
        <NavigationMenu className="mx-auto">
          <NavigationMenuList>
            {category.map((obj) => (
              <NavigationMenuItem key={obj.id}>
                <NavigationMenuTrigger autoFocus={true}>
                  <Link href={'/catalog?category=' + obj.id} className="" legacyBehavior passHref>
                    <NavigationMenuLink className="px-4 h-full flex items-center">
                      {obj.name}
                    </NavigationMenuLink>
                  </Link>
                  <NavigationMenuContent>
                    <div className="w-screen -mx-2">
                      <Container className="flex my-4 gap-5">
                        {obj.models.length > 0 && (
                          <div className="">
                            <h1 className="text-lg font-medium mb-2">{obj.name}</h1>
                            <div className="flex flex-col">
                              {obj.models.map((obj) => (
                                <Link
                                  href={'/catalog?category=' + obj.categoryId + '&model=' + obj.id}
                                  key={obj.id}
                                  legacyBehavior
                                  passHref>
                                  <NavigationMenuLink className="py-[6px] cursor-pointer min-w-[200px] gap-2 hover:bg-accent rounded-md px-3 items-center flex justify-between">
                                    <h1 className="text-nowrap">{obj.name}</h1>
                                    <ChevronRight color="gray" size={18} />
                                  </NavigationMenuLink>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                        <div>
                          <h1 className="mt-1 text-lg font-medium">Популярные товары</h1>
                          <div className="flex">
                            {obj.products.map((obj) => (
                              <HeaderProduct key={obj.id} product={obj} />
                            ))}
                          </div>
                        </div>
                      </Container>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </Container>
    </div>
  );
};
