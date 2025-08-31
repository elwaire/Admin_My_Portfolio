// services/aboutService.ts
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import type { AboutData } from "../types/about";
import { db } from "../configs/firebase";

class AboutService {
    private readonly docId = "about-data"; // Single document for all about data
    private cache: AboutData | null = null;

    async getAboutData(): Promise<AboutData | null> {
        if (this.cache) return this.cache;

        try {
            const docRef = doc(db, "about", this.docId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data() as AboutData;
                this.cache = data;
                return data;
            }

            return null;
        } catch (error) {
            console.error("Error fetching about data:", error);
            throw new Error("Failed to fetch about data");
        }
    }

    async updateAboutData(data: Partial<AboutData>): Promise<void> {
        try {
            const docRef = doc(db, "about", this.docId);
            await updateDoc(docRef, {
                ...data,
                updatedAt: serverTimestamp(),
            });

            this.clearCache();
        } catch (error) {
            console.error("Error updating about data:", error);
            throw new Error("Failed to update about data");
        }
    }

    async createAboutData(data: AboutData): Promise<void> {
        try {
            const docRef = doc(db, "about", this.docId);
            await setDoc(docRef, {
                ...data,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            this.clearCache();
        } catch (error) {
            console.error("Error creating about data:", error);
            throw new Error("Failed to create about data");
        }
    }

    clearCache(): void {
        this.cache = null;
    }
}

export const aboutService = new AboutService();
