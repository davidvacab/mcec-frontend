import useData from "../../hooks/useData";

export interface Topic {
    id: number;
    title: string;
}

const useTopics = () => useData<Topic>("/hymnbook/topics");

export default useTopics;