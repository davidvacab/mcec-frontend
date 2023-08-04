import { create } from "zustand";

interface HymnQuery {
  topicCode?: string;
  sortOrder?: string;
  searchText?: string;
}

interface HymnQueryStore {
  hymnQuery: HymnQuery;
  setSearchText: (searchText: string) => void;
  setTopicCode: (topicCode: string) => void;
  setSortOrder: (sortOrder: string) => void;
}

const useHymnQueryStore = create<HymnQueryStore>((set) => ({
  hymnQuery: {},
  setSearchText: (searchText: string) =>
    set(() => ({ hymnQuery: { searchText } })),
  setTopicCode: (topicCode: string) =>
    set((store) => ({ hymnQuery: { ...store.hymnQuery, topicCode: topicCode } })),
  setSortOrder: (sortOrder: string) =>
    set((store) => ({ hymnQuery: { ...store.hymnQuery, sortOrder } })),
}));

export default useHymnQueryStore;
