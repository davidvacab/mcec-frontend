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
  
  interface FetchHymnResponse {
    count: number;
    results: Hymn[];
  }

const useHymns = () => {
    const [hymns, setHymns] = useState<Hymn[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        apiClient
            .get<FetchHymnResponse>("/hymnbook/hymns", {signal: controller.signal})
            .then((res) => setHymns(res.data.results))
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message)
            }).finally(() => setLoading(false));

        return () => controller.abort();
    }, []);

    return {hymns, error, isLoading}
}

export default useHymns;