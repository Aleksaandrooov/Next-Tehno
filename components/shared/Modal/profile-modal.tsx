import React, { useEffect, useState } from 'react';
import { Modal, ModalContent } from '@nextui-org/modal';
import { UserRoundPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoginForm } from './auth-login';
import { VerificedForm } from './verificed-form';
import { signIn } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  text?: string;
  className?: string;
  url?: string;
}

export const ProfileModal: React.FC<Props> = ({ text, className, url }) => {
  const [open, isOpen] = useState(false);
  const [submit, isSubmit] = useState('');
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (url) {
      isOpen(true);
      router.push('/');
    }
  }, [url]);

  return (
    <div className="">
      <Button
        variant="ghost"
        onClick={() => isOpen((prev) => !prev)}
        className={cn(
          'px-3 flex gap-1 text-base',
          text ? 'text-green-800 max-sm:text-sm' : '',
          className,
        )}>
        <UserRoundPlus className="max-sm:size-4" size={22} strokeWidth={1.75} />
        {text}
      </Button>
      <Modal size="xs" placement="center" isOpen={open} backdrop="blur" onOpenChange={isOpen}>
        <ModalContent>
          {!submit ? (
            <div className="m-4">
              <header className="text-lg mt-1 mb-2 font-medium">Вход или регистрация</header>
              <div className="px-2">
                <LoginForm isSubmit={(text) => isSubmit(text)} />
                <Button
                  onClick={() =>
                    signIn('yandex', {
                      redirect: true,
                      callbackUrl: url || path,
                    })
                  }
                  className="bg-black h-9 w-full text-white">
                  <div className="bg-red-600 rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      fill="white"
                      width="18px"
                      height="18px">
                      <path d="M 20.800781 1 L 15.199219 17.199219 L 10.199219 4 L 7 4 L 14 22.599609 L 14 31 L 17 31 L 17 21.099609 L 24 1 L 20.800781 1 z" />
                    </svg>
                  </div>
                  Войти через Яндекс
                </Button>
              </div>
            </div>
          ) : (
            <VerificedForm
              router={router}
              url={url}
              mail={submit}
              onClose={() => isOpen(false)}
              onClear={() => isSubmit('')}
            />
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
