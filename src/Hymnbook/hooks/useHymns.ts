import { HymnQuery } from "../../App";
import useData from "../../hooks/useData";
import { Topic } from "./useTopics";

interface Author {
    id: number;
    first_name: string;
    last_name: string;
}

interface Arranger {
    id: number;
    first_name: string;
    last_name: string;
}

interface Audio {
    id: number;
    voice: string;
    audio: string;
}

export interface Hymn {
    id: number;
    title: string;
    topic: Topic;
    author: Author;
    arranger: Arranger;
    release_date: string;
    pdf_file: string;
    audio_set: Audio[];
  }

const useHymns = (
    hymnQuery: HymnQuery) => useData<Hymn>("/hymnbook/hymns", 
    {
        params: {
            topic: hymnQuery.topic?.id,
            ordering: hymnQuery.sortOrder
        }
    }, 
    [hymnQuery]);

export default useHymns;