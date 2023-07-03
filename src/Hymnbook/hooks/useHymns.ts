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
    selectedTopic: Topic | null) => useData<Hymn>("/hymnbook/hymns", 
    {params: {topic: selectedTopic?.id}}, 
    [selectedTopic?.id]);

export default useHymns;