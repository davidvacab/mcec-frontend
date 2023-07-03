import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import { CanceledError } from "axios";

export interface Topic {
    id: number;
    title: string;
}

interface FetchTopicsResponse {
    count: number;
    results: Topic[];
  }

const useTopics = () => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        apiClient
            .get<FetchTopicsResponse>("/hymnbook/topics", {signal: controller.signal})
            .then((res) => setTopics(res.data.results))
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message)
            }).finally(() => setLoading(false));

        return () => controller.abort();
    }, []);

    return {topics, error, isLoading}
}

export default useTopics;