import { create } from 'zustand';

interface State {
  open: boolean;
}

interface Action {
  isOpen: () => void;
}

export const filterStore = create<State & Action>((set) => ({
  open: false,
  isOpen: () => set((state) => ({ open: !state.open })),
}));
