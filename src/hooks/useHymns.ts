import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Topic {
    id: number;
    title: string;
}

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

export interface Hymn {
    id: number;
    title: string;
    topic: Topic;
    author: Author;
    arranger: Arranger;
    release_date: string;
  }
  
  interface FetchHymnResponse {
    count: number;
    results: Hymn[];
  }

const useHymns = () => {
    const [hymns, setHymns] = useState<Hymn[]>([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
        const controller = new AbortController();

      apiClient
        .get<FetchHymnResponse>("/hymnbook/hymns", {signal: controller.signal})
        .then((res) => setHymns(res.data.results))
        .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message)
        });

        return () => controller.abort();
    }, []);

    return {hymns, error}
}

export default useHymns;