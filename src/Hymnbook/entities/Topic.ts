import TopicCodes from "./Topics";

export default interface Topic {
  code: typeof TopicCodes;
  title: string;
}
