import { TopicList } from "../entities/Topics";

const useTopic = (code: string | undefined) => {
  return TopicList.find((t) => t.code === code);
};

export default useTopic;
