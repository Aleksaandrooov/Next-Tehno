'use client';

import { User } from '@prisma/client';
import React from 'react';
import { FormSetting } from './form-setting';
import { SettingName, SettingNumber, SettingSurname } from '../form/shemas';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { onClickSignOut } from '@/lib/signOut';
import { deleteProfile } from '@/app/actions';

export const ProfileSettings = ({ user }: { user: User }) => {
  return (
    <div className="rounded-lg border shadow-md p-5">
      <header className="">
        <h1 className="text-lg">
          {!user.Name ? user.email : user.Name}{' '}
          {user.Name && user.Surname ? user.Surname : undefined}
        </h1>
        <span className="text-gray-500 text-sm">
          Дата регистрации: {user.createdAt.getDate() < 10 ? 0 : ''}
          {user.createdAt.getDate()}.{user.createdAt.getMonth() + 1 < 10 ? 0 : ''}
          {user.createdAt.getMonth() + 1}.{user.createdAt.getFullYear()}
        </span>
      </header>
      <div className="grid grid-cols-2 gap-5 mt-5 max-sm:grid-cols-1">
        <FormSetting
          resolver={SettingName}
          mail={user.email}
          defaultValue={user.Name || ''}
          type="name"
          name="Имя"
        />
        <FormSetting
          resolver={SettingSurname}
          mail={user.email}
          defaultValue={user.Surname || ''}
          type="surname"
          name="Фамилия"
        />
        <FormSetting
          mail={user.email}
          resolver={SettingNumber}
          defaultValue={user.number || ''}
          type="number"
          name="Номер телефона"
        />
      </div>
      <div className="mt-5 justify-between flex">
        <Button
          onClick={() => {
            onClickSignOut();
          }}
          className="flex gap-1">
          <LogOut size={18} /> Выйти
        </Button>
        <Button
          onClick={() => {
            deleteProfile(user.email);
            onClickSignOut();
          }}
          variant="ghost"
          className="hover:text-red-600 text-red-600">
          Удалить профиль
        </Button>
      </div>
    </div>
  );
};
