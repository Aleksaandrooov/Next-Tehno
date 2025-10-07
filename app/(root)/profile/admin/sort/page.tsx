import { fetchFilter } from '@/components/shared/admin/fetch-filter';
import { FilterGroup } from '@/components/shared/admin/filter-group';
import { Container } from '@/components/shared/container';
import { NavigationBar } from '@/components/shared/Profile/navigation-bar';
import { getUserSession } from '@/lib/get-user-session';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function SortPage() {
  const session = await getUserSession();

  if (session!.role !== 'ADMIN') {
    redirect('/');
  }

  const { filters } = await fetchFilter();

  return (
    <Container className="mt-10 max-sm:px-2">
      <header className="text-3xl mb-5 max-md:text-2xl max-sm:text-xl">Админ | Фильтры</header>
      <div className="flex gap-5">
        <NavigationBar id={8} role={session!.role} />
        <div className="flex-1 flex flex-col gap-2">
          {filters.map((obj, i) => (
            <FilterGroup key={i} obj={obj} />
          ))}
        </div>
      </div>
    </Container>
  );
}
