import { create } from 'zustand';

interface AppState {
  active: boolean;
  text: string;
  theme: 'default' | 'matrix' | 'blueprint';
  setActive: (active: boolean) => void;
  setText: (text: string) => void;
  setTheme: (theme: 'default' | 'matrix' | 'blueprint') => void;
}

export const useCursorStore = create<AppState>((set) => ({
  active: false,
  text: '',
  theme: 'default',
  setActive: (active) => set({ active }),
  setText: (text) => set({ text }),
  setTheme: (theme) => set({ theme }),
}));
