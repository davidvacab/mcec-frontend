import { create } from "zustand";

interface HymnQuery {
  topicId?: number;
  sortOrder?: string;
  searchText?: string;
}

interface HymnQueryStore {
  hymnQuery: HymnQuery;
  setSearchText: (searchTExt: string) => void;
  setTopicId: (topicId: number) => void;
  setSortOrder: (sortOrder: string) => void;
}

const useHymnQueryStore = create<HymnQueryStore>((set) => ({
  hymnQuery: {},
  setSearchText: (searchText: string) =>
    set(() => ({ hymnQuery: { searchText } })),
  setTopicId: (topicId: number) =>
    set((store) => ({ hymnQuery: { ...store.hymnQuery, topicId } })),
  setSortOrder: (sortOrder: string) =>
    set((store) => ({ hymnQuery: { ...store.hymnQuery, sortOrder } })),
}));

export default useHymnQueryStore;
