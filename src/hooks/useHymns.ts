import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Hymn {
    id: number;
    title: string;
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