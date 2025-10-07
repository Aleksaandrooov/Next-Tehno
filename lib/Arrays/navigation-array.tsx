import { Cog, Folders, Heart, Logs, Plus, Sparkles, Star, User } from 'lucide-react';

export const NavigationArray = [
  {
    jsx: <Cog strokeWidth={1.5} />,
    name: 'Настройки профиля',
    url: '/profile',
    role: 'USER',
    id: 1,
  },
  {
    jsx: <Folders strokeWidth={1.5} />,
    name: 'Заказы',
    url: '/profile/orders',
    role: 'USER',
    id: 2,
  },
  {
    jsx: <Heart strokeWidth={1.5} />,
    name: 'Избранное',
    url: '/profile/favorites',
    role: 'USER',
    id: 3,
  },
  {
    jsx: <Star strokeWidth={1.5} />,
    name: 'Мои отзывы',
    url: '/profile/reviews',
    role: 'USER',
    id: 4,
  },
  {
    jsx: <User strokeWidth={1.5} />,
    name: 'Пользователи',
    url: '/profile/admin/users',
    role: 'ADMIN',
    id: 5,
  },
  {
    jsx: <Logs strokeWidth={1.5} />,
    name: 'Все заказы',
    url: '/profile/admin/orders',
    role: 'ADMIN',
    id: 6,
  },
  {
    jsx: <Sparkles strokeWidth={1.5} />,
    name: 'Все отзывы',
    url: '/profile/admin/reviews',
    role: 'ADMIN',
    id: 7,
  },
  {
    jsx: <Plus strokeWidth={1.5} />,
    name: 'Фильтры',
    url: '/profile/admin/sort',
    role: 'ADMIN',
    id: 8,
  },
  {
    jsx: <Plus strokeWidth={1.5} />,
    name: 'Категории',
    url: '/profile/admin/category',
    role: 'ADMIN',
    id: 9,
  },
  {
    jsx: <Plus strokeWidth={1.5} />,
    name: 'Товары',
    url: '/profile/admin/product',
    role: 'ADMIN',
    id: 10,
  },
];
