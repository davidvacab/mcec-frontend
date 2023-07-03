import useTopics from "../hooks/useTopics";

const TopicList = () => {
const {topics, error, isLoading} = useTopics();

  return (
    <ul>
        {topics.map(topic => <li key={topic.id}>{topic.title}</li>)}
    </ul>
  )
}

export default TopicList