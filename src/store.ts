import { create } from "zustand";

interface MainElements {
  isDrawerOpen: boolean;
}

interface MainStore {
  mainElements: MainElements;
  openSideDrawer: () => void;
  closeSideDrawer: () => void;
}

const useMainStore = create<MainStore>((set) => ({
  mainElements: {isDrawerOpen: false},
  openSideDrawer: () =>
    set((store) => ({
      mainElements: { ...store.mainElements, isDrawerOpen: true },
    })),
  closeSideDrawer: () =>
    set((store) => ({
      mainElements: { ...store.mainElements, isDrawerOpen: false },
    })),
}));

export default useMainStore;
