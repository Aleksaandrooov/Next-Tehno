'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Container } from '../container';
import { ProfileNull } from '../Profile/profile-null';
import { SwiperViewed } from '@/lib/components/swiper-viewed';
import { ProfileModal } from '../Modal/profile-modal';

export const CartAmountNUll: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="text-center flex flex-col w-full max-xl:h-full">
      <ProfileNull
        className="mt-4 max-lg:mt-0"
        title="Ваша корзина пуста"
        text="Самое время добавить в нее что-нибудь!"
      />
      {!session && (
        <div className="mt-5 max-w-[500px] max-md:text-sm justify-center items-center mx-auto text-gray-500 flex flex-wrap gap-1">
          Наполняли корзину при прошлом визите? <ProfileModal text="Авторизуйтесь" /> и добавленные
          товары появятся на странице
        </div>
      )}
      <Container className="px-0 mt-auto pt-5">
        <SwiperViewed />
      </Container>
    </div>
  );
};
