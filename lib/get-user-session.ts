import { getServerSession } from 'next-auth';
import { authOptions } from './auth-options';
import { prisma } from '@/prisma/prisma-client';

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user!.email!,
    },
  });

  return user ?? null;
};
