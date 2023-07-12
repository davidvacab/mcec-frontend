import { create } from "zustand";

interface MainElements {
  title?: string;
  openNav?: boolean;
}

interface MainStore {
  mainElements: MainElements;
  setTitle: (title: string) => void;
  setOpenNav: (openNav: boolean) => void;
}

const useMainStore = create<MainStore>((set) => ({
  mainElements: {},
  setTitle: (title: string) =>
    set((store) => ({ mainElements: { ...store.mainElements, title: title } })),
  setOpenNav: (openNav: boolean) =>
    set((store) => ({
      mainElements: { ...store.mainElements, openNav: openNav },
    })),
}));

export default useMainStore;
