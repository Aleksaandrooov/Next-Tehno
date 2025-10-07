import { Container } from '@/components/shared/container';
import { FavoritesItems } from '@/components/shared/Profile/favorites/favorites';
import { NavigationBar } from '@/components/shared/Profile/navigation-bar';
import { getUserSession } from '@/lib/get-user-session';

export default async function FavoritesPage() {
  const session = await getUserSession();

  return (
    <Container className="mt-10 max-md:px-2">
      <header className="text-3xl mb-5 max-md:text-2xl max-sm:text-xl">Профиль | Избранное</header>
      <div className="flex gap-5">
        <NavigationBar role={session!.role} id={3} />
        <FavoritesItems className="flex-1" />
      </div>
    </Container>
  );
}
