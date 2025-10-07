import { UsersTable } from '@/components/shared/admin/usersTable';
import { Container } from '@/components/shared/container';
import { NavigationBar } from '@/components/shared/Profile/navigation-bar';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function UsersPage() {
  const session = await getUserSession();

  if (session!.role !== 'ADMIN') {
    redirect('/');
  }

  const users = await prisma.user.findMany();

  return (
    <Container className="mt-10 max-sm:px-2">
      <header className="text-3xl mb-5 max-md:text-2xl max-sm:text-xl">Админ | Пользователи</header>
      <div className="flex gap-5">
        <NavigationBar id={5} role={session!.role} />
        <div className="flex-1">
          <UsersTable data={users} />
        </div>
      </div>
    </Container>
  );
}
