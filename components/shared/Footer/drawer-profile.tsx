import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { NavigationArray } from '@/lib/Arrays/navigation-array';
import { LogOut, User, X } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

interface Props {
  role?: 'USER' | 'ADMIN';
}

export const DrawerProfile: React.FC<Props> = ({ role }) => {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <div className="text-center cursor-pointer">
          <User className="mx-auto size-5 max-sm:size-4" />
          <h1 className="max-sm:text-xs text-sm">Профиль</h1>
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-white flex-col max-sm:w-[260px] w-[400px] max-md:rounded-none">
        <DrawerHeader>
          <DrawerTitle className="ml-auto">
            <DrawerClose>
              <X />
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>
        <div className="h-full overflow-auto px-4">
          <div className="text-2xl ml-4 mb-5 max-sm:ml-0 max-sm:text-xl">Профиль</div>
          <div className="flex flex-col">
            {NavigationArray.filter((obj) => obj.role === role || obj.role === 'USER').map(
              (obj) => (
                <Link className="border-b hover:underline" key={obj.id} href={obj.url}>
                  <DrawerClose className="py-4 w-full text-start max-sm:text-sm flex justify-between items-center group">
                    {obj.name}{' '}
                    <span className="text-gray-500 group-hover:text-primary transition-all">
                      {obj.jsx}
                    </span>
                  </DrawerClose>
                </Link>
              ),
            )}
            <DrawerClose
              onClick={() => signOut()}
              className="py-4 w-full hover:underline max-sm:text-sm text-start flex justify-between items-center border-b">
              Выйти <LogOut size={18} />
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
