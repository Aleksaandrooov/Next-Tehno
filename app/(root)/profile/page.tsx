import { Container } from '@/components/shared/container';
import { NavigationBar } from '@/components/shared/Profile/navigation-bar';
import { ProfileDelivery } from '@/components/shared/Profile/profile-delivery';
import { ProfileSettings } from '@/components/shared/Profile/profile-settings';
import { getUserSession } from '@/lib/get-user-session';

export default async function ProfilePage() {
  const session = await getUserSession();

  return (
    <Container className="mt-10 max-sm:px-2">
      <header className="text-3xl mb-5 max-md:text-2xl max-sm:text-xl">
        Профиль | Настройки профиля
      </header>
      {session && (
        <div className="flex gap-5">
          <NavigationBar id={1} role={session.role} />
          <div className="flex-1">
            <ProfileSettings user={session} />
            <ProfileDelivery user={session} />
          </div>
        </div>
      )}
    </Container>
  );
}
