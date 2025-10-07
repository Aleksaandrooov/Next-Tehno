import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { NavigationProfile } from '@/lib/Arrays/navigation-profile';
import { UserPen, UserRound, UserRoundSearch, UserRoundX } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { onClickSignOut } from '@/lib/signOut';

export const HeaderProfile = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger autoFocus={true} className="">
        <Link href="/profile" legacyBehavior passHref>
          <NavigationMenuLink className="px-3 h-full flex items-center">
            <UserRound size={22} strokeWidth={1.75} />
          </NavigationMenuLink>
        </Link>
        <NavigationMenuContent>
          <div className="min-w-[160px]">
            <div className="flex flex-col py-2">
              {NavigationProfile.map((obj) => (
                <Link key={obj.id} href={obj.link} legacyBehavior passHref>
                  <NavigationMenuLink
                    onClick={() => obj.id == 3 && onClickSignOut()}
                    className="mx-[6px] rounded-md px-3 py-2 cursor-pointer items-center hover:bg-accent transition-all flex justify-between">
                    <div className="">{obj.name}</div>
                    {obj.id == 1 && <UserPen size={18} />}
                    {obj.id == 2 && <UserRoundSearch size={18} />}
                    {obj.id == 3 && <UserRoundX size={18} />}
                  </NavigationMenuLink>
                </Link>
              ))}
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuTrigger>
    </NavigationMenuItem>
  );
};
