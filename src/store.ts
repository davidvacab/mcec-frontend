import { create } from "zustand";
import Profile from "./entities/Profile";
import { persist, createJSONStorage } from "zustand/middleware";

interface PersistElements {
  profile?: Profile;
}

interface PersistStore {
  persistElements: PersistElements;
  setProfile: (profile: Profile | undefined) => void;
}

export const usePersistStore = create(
  persist<PersistStore>(
    (set) => ({
      persistElements: {},
      setProfile: (profile) =>
        set((store) => ({
          persistElements: { ...store.persistElements, profile: profile },
        })),
    }),
    {
      name: "profile-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

interface MainElements {
  isDrawerOpen: boolean;
  isAlertOpen: boolean;
  registrationEmail?: string;
  alertElements: {
    status: "error" | "success" | "warning" | "info" | "loading";
    title?: string;
    description?: string;
  };
  profile?: Profile;
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
  setProfile: (profile: Profile) => void;
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
  setRegistrationEmail: (email) =>
    set((store) => ({
      mainElements: { ...store.mainElements, registrationEmail: email },
    })),
  setProfile: (profile) =>
    set((store) => ({
      mainElements: { ...store.mainElements, profile: profile },
    })),
}));

export default useMainStore;
