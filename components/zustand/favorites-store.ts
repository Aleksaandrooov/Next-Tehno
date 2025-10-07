import { Api } from '@/app/services/apiClient';
import { favoritesType } from '@/app/services/dto/favoritesType';
import { create } from 'zustand';

interface State {
  favoritesItem: favoritesType['items'][];
  loading: boolean;
}
interface Action {
  getFavorites: () => Promise<void>;
  postFavorites: (id: number) => Promise<void>;
}

export const favoritesStore = create<State & Action>((set) => ({
  favoritesItem: [],
  loading: true,

  getFavorites: async () => {
    set({ loading: true });
    try {
      const data = await Api.favorites.getFavorites();
      const items = Array.isArray(data.items) ? data.items : [];

      set({ favoritesItem: items, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  postFavorites: async (id) => {
    try {
      const data = await Api.favorites.postFavorites(id);
      const items = Array.isArray(data.items) ? data.items : [];

      set({ favoritesItem: items });
    } catch {}
  },
}));
