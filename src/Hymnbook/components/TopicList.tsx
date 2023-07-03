import useTopics from "../hooks/useTopics";

const TopicList = () => {
const {data, error, isLoading} = useTopics();

  return (
    <ul>
        {data.map(topic => <li key={topic.id}>{topic.title}</li>)}
    </ul>
  )
}

export default TopicList