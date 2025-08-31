// hooks/useAbout.ts
import { useState, useEffect, useCallback, useMemo } from "react";
import { aboutService } from "../services/aboutService";
import type { AboutData } from "../types/about";

interface UseAboutReturn {
    aboutData: AboutData | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    updateAboutData: (data: Partial<AboutData>) => Promise<void>;
    isUpdating: boolean;
}

export const useAbout = (): UseAboutReturn => {
    const [aboutData, setAboutData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchAboutData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await aboutService.getAboutData();
            setAboutData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
            setAboutData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateAboutData = useCallback(
        async (data: Partial<AboutData>) => {
            try {
                setIsUpdating(true);
                setError(null);
                await aboutService.updateAboutData(data);
                await fetchAboutData();
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to update");
                throw err;
            } finally {
                setIsUpdating(false);
            }
        },
        [fetchAboutData],
    );

    const refetch = useCallback(async () => {
        await fetchAboutData();
    }, [fetchAboutData]);

    useEffect(() => {
        fetchAboutData();
    }, [fetchAboutData]);

    return useMemo(
        () => ({
            aboutData,
            loading,
            error,
            refetch,
            updateAboutData,
            isUpdating,
        }),
        [aboutData, loading, error, refetch, updateAboutData, isUpdating],
    );
};
