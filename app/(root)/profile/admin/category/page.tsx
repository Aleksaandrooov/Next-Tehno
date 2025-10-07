import { CategoryAdd } from '@/components/shared/admin/category-add';
import { CategoryGroup } from '@/components/shared/admin/category-group';
import { CategorySetting } from '@/components/shared/admin/category-setting';
import { fetchFilter } from '@/components/shared/admin/fetch-filter';
import { Container } from '@/components/shared/container';
import { NavigationBar } from '@/components/shared/Profile/navigation-bar';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AdminCategoryPage() {
  const session = await getUserSession();

  if (session!.role !== 'ADMIN') {
    redirect('/');
  }

  const { filters } = await fetchFilter();
  const categorys = await prisma.category.findMany({
    orderBy: {
      id: 'asc',
    },
  });

  return (
    <Container className="mt-10 max-sm:px-2">
      <header className="text-3xl mb-5 max-md:text-2xl max-sm:text-xl">Админ | Категории</header>
      <div className="flex gap-5">
        <NavigationBar id={9} role={session!.role} />
        <div className="flex-1 flex flex-col gap-4">
          <CategoryAdd />
          {categorys.map((obj) => (
            <div key={obj.id} className="">
              <div className="flex gap-2 mb-1">
                <h1>{obj.name}</h1>
                <CategorySetting {...obj} />
              </div>
              <div className="flex gap-1 flex-wrap">
                {filters
                  .filter((obj) => obj.name !== 'category')
                  .map((object, i) => (
                    <CategoryGroup key={i} filter={object} name={obj.name} categoryId={obj.id} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
