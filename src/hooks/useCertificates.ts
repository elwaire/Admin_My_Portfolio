// hooks/useCertificates.ts
import { useState, useEffect, useCallback, useMemo } from "react";
import { certificateService } from "../services/certificateService";
import type { Certificate, CertificateFormData } from "../types/certificate";

interface UseCertificatesReturn {
    certificates: Certificate[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    createCertificate: (data: CertificateFormData) => Promise<void>;
    updateCertificate: (id: string, data: Partial<CertificateFormData>) => Promise<void>;
    deleteCertificate: (id: string) => Promise<void>;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
}

export const useCertificates = (): UseCertificatesReturn => {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchCertificates = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await certificateService.getCertificates();
            setCertificates(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
            setCertificates([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const createCertificate = useCallback(
        async (data: CertificateFormData) => {
            try {
                setIsCreating(true);
                setError(null);
                await certificateService.createCertificate(data);
                await fetchCertificates(); // Refresh data
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to create certificate");
                throw err;
            } finally {
                setIsCreating(false);
            }
        },
        [fetchCertificates],
    );

    const updateCertificate = useCallback(
        async (id: string, data: Partial<CertificateFormData>) => {
            try {
                setIsUpdating(true);
                setError(null);
                await certificateService.updateCertificate(id, data);
                await fetchCertificates(); // Refresh data
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to update certificate");
                throw err;
            } finally {
                setIsUpdating(false);
            }
        },
        [fetchCertificates],
    );

    const deleteCertificate = useCallback(
        async (id: string) => {
            try {
                setIsDeleting(true);
                setError(null);
                await certificateService.deleteCertificate(id);
                await fetchCertificates(); // Refresh data
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to delete certificate");
                throw err;
            } finally {
                setIsDeleting(false);
            }
        },
        [fetchCertificates],
    );

    const refetch = useCallback(async () => {
        await fetchCertificates();
    }, [fetchCertificates]);

    useEffect(() => {
        fetchCertificates();
    }, [fetchCertificates]);

    return useMemo(
        () => ({
            certificates,
            loading,
            error,
            refetch,
            createCertificate,
            updateCertificate,
            deleteCertificate,
            isCreating,
            isUpdating,
            isDeleting,
        }),
        [
            certificates,
            loading,
            error,
            refetch,
            createCertificate,
            updateCertificate,
            deleteCertificate,
            isCreating,
            isUpdating,
            isDeleting,
        ],
    );
};
