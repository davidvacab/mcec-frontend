import { create } from "zustand";

interface MainElements {
  isDrawerOpen: boolean;
  isAlertOpen: boolean;
  alertElements: {
    status: "error" | "success" | "warning" | "info" | "loading";
    title?: string;
    description?: string;
  };
}

interface MainStore {
  mainElements: MainElements;
  openSideDrawer: () => void;
  closeSideDrawer: () => void;
  openAlert: () => void;
  closeAlert: () => void;
  setAlertElements: (
    status: "error" | "success" | "warning" | "info" | "loading",
    title: string,
    description: string
  ) => void;
}

const useMainStore = create<MainStore>((set) => ({
  mainElements: {
    isDrawerOpen: false,
    isAlertOpen: false,
    alertElements: { status: "info" },
  },
  openSideDrawer: () =>
    set((store) => ({
      mainElements: { ...store.mainElements, isDrawerOpen: true },
    })),
  closeSideDrawer: () =>
    set((store) => ({
      mainElements: { ...store.mainElements, isDrawerOpen: false },
    })),
  openAlert: () =>
    set((store) => ({
      mainElements: { ...store.mainElements, isAlertOpen: true },
    })),
  closeAlert: () =>
    set((store) => ({
      mainElements: { ...store.mainElements, isAlertOpen: false },
    })),
  setAlertElements: (status, title, description) =>
    set((store) => ({
      mainElements: {
        ...store.mainElements,
        alertElements: {
          status: status,
          title: title,
          description: description,
        },
      },
    })),
}));

export default useMainStore;
