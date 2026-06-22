import { useState, useEffect } from "react";
import { mockData } from '../mocks/mockData';
import { getStoredToken } from './authService';

const USE_MOCK_DATA = false;

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const urlPath = url.split('?')[0];
        const mapping = {
            "/api/user-info": mockData.userInfo,
            "/api/user-activity": mockData.userActivity,
        };

        if (USE_MOCK_DATA) {
            setData(mapping[urlPath] ?? null);
            setLoading(false);
            return;
        }

        let cancelled = false;

        async function fetchData() {
            try {
                const token = getStoredToken();
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const response = await fetch(`http://localhost:8000${url}`, { headers });
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }
                const json = await response.json();
                if (!cancelled) setData(json);
            } catch (err) {
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchData();
        return () => { cancelled = true; };
    }, [url]);

    return { data, loading, error };
}