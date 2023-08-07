import { create } from "zustand";

interface MainElements {
  isDrawerOpen: boolean;
  isAlertOpen: boolean;
  registrationEmail?: string;
  alertElements: {
    status: "error" | "success" | "warning" | "info" | "loading";
    title?: string;
    description?: string;
  };
  locale: string;
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
  setRegistrationEmail: (email: string | undefined) => void;
  setLocale: (locale: string) => void;
}

const useMainStore = create<MainStore>((set) => ({
  mainElements: {
    isDrawerOpen: false,
    isAlertOpen: false,
    alertElements: { status: "info" },
    locale: "es",
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
  setRegistrationEmail: (email) =>
    set((store) => ({
      mainElements: { ...store.mainElements, registrationEmail: email },
    })),
  setLocale: (locale) =>
    set((store) => ({
      mainElements: { ...store.mainElements, locale: locale },
    })),
}));

export default useMainStore;
