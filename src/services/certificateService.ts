// services/certificateService.ts
import {
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";
import type { Certificate, CertificateFormData } from "../types/certificate";
import { db } from "../configs/firebase";

class CertificateService {
    private readonly collectionName = "certificates";
    private cache = new Map<string, Certificate[]>();

    /**
     * Lấy tất cả certificates
     */
    async getCertificates(): Promise<Certificate[]> {
        if (this.cache.has("all")) {
            return this.cache.get("all")!;
        }

        try {
            const certificatesRef = collection(db, this.collectionName);
            const q = query(certificatesRef, orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);

            const certificates: Certificate[] = querySnapshot.docs.map(
                (doc) =>
                    ({
                        id: doc.id,
                        ...doc.data(),
                    } as Certificate),
            );

            this.cache.set("all", certificates);
            return certificates;
        } catch (error) {
            console.error("Error fetching certificates:", error);
            throw new Error("Failed to fetch certificates");
        }
    }

    /**
     * Lấy certificate theo ID
     */
    async getCertificateById(id: string): Promise<Certificate | null> {
        try {
            const docRef = doc(db, this.collectionName, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return {
                    id: docSnap.id,
                    ...docSnap.data(),
                } as Certificate;
            }

            return null;
        } catch (error) {
            console.error("Error fetching certificate:", error);
            throw new Error("Failed to fetch certificate");
        }
    }

    /**
     * Tạo certificate mới
     */
    async createCertificate(data: CertificateFormData): Promise<string> {
        try {
            const docRef = await addDoc(collection(db, this.collectionName), {
                ...data,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            this.clearCache();
            return docRef.id;
        } catch (error) {
            console.error("Error creating certificate:", error);
            throw new Error("Failed to create certificate");
        }
    }

    /**
     * Cập nhật certificate
     */
    async updateCertificate(id: string, data: Partial<CertificateFormData>): Promise<void> {
        try {
            const docRef = doc(db, this.collectionName, id);
            await updateDoc(docRef, {
                ...data,
                updatedAt: serverTimestamp(),
            });

            this.clearCache();
        } catch (error) {
            console.error("Error updating certificate:", error);
            throw new Error("Failed to update certificate");
        }
    }

    /**
     * Xóa certificate
     */
    async deleteCertificate(id: string): Promise<void> {
        try {
            const docRef = doc(db, this.collectionName, id);
            await deleteDoc(docRef);

            this.clearCache();
        } catch (error) {
            console.error("Error deleting certificate:", error);
            throw new Error("Failed to delete certificate");
        }
    }

    /**
     * Clear cache
     */
    clearCache(): void {
        this.cache.clear();
    }
}

export const certificateService = new CertificateService();
