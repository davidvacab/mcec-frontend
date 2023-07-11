import useTopics from "./useTopics";

const useTopic = (id?: number) => {
  const { data: topics } = useTopics();
  return topics?.results.find((t) => t.id === id);
};

export default useTopic;
