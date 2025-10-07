import { Api } from '@/app/services/apiClient';
import { ProductType } from '@/app/services/dto/searchItemsType';
import { create } from 'zustand';

interface State {
  focused: boolean;
  items: ProductType[];
}

interface Action {
  setFocused: (type: boolean) => void;
  fetchSearchItems: (str: string) => Promise<void>;
}

export const SearchStore = create<State & Action>((set) => ({
  focused: false,
  items: [],
  setFocused: (type) => set({ focused: type }),
  fetchSearchItems: async (str) => {
    try {
      Api.search.fetchSearchItems(str).then((products) => {
        set({ items: products });
      });
    } catch {}
  },
}));
