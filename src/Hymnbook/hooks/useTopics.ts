import { TopicList } from "../entities/Topics";

const useTopics = (codes: string[]) => {
  return codes.map((code) => TopicList.find((topic) => topic.code === code));
};

export default useTopics;
