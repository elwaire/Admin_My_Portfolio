// utils/aboutDataSeeder.ts (update to match client constants)
import { aboutService } from "../services/aboutService";
import type { AboutData } from "../types/about";

export const createInitialAboutData = async (): Promise<void> => {
    const initialData: AboutData = {
        profile: {
            name: "John Doe",
            title: "Product Designer & Creative Developer",
            image: "https://i.pinimg.com/736x/52/93/5e/52935e8bc7560e59b983058b9baedc6c.jpg",
            bio: [
                "Hi, I'm a passionate product designer with over 5 years of experience creating digital experiences that users love. I specialize in user-centered design, design systems, and bridging the gap between design and development.",
                "When I'm not designing, you can find me exploring new design trends, contributing to open-source projects, or sharing knowledge with the design community.",
            ],
            skills: ["UI/UX Design", "Frontend Development", "Design Systems"],
        },
        achievements: [
            {
                id: "achievement_1",
                year: "2024",
                title: "Design System Excellence Award",
                description:
                    "Recognized for creating a comprehensive design system that improved team efficiency by 40%",
            },
            {
                id: "achievement_2",
                year: "2023",
                title: "Product Launch Success",
                description: "Led the design for 3 successful product launches with 95% user satisfaction rate",
            },
            {
                id: "achievement_3",
                year: "2022",
                title: "Team Leadership",
                description: "Built and managed a design team of 5 designers across multiple products",
            },
        ],
        timeline: [
            {
                id: "timeline_1",
                period: "2022 - Present",
                role: "Senior Product Designer",
                company: "Tech Startup Inc.",
                description:
                    "Leading design for multiple products, building design systems, and mentoring junior designers.",
            },
            {
                id: "timeline_2",
                period: "2020 - 2022",
                role: "Product Designer",
                company: "Digital Agency Co.",
                description: "Designed user experiences for B2B and B2C products across various industries.",
            },
            {
                id: "timeline_3",
                period: "2019 - 2020",
                role: "UI/UX Designer",
                company: "Creative Studio",
                description: "Focused on mobile app design and user research for early-stage startups.",
            },
            {
                id: "timeline_4",
                period: "2018 - 2019",
                role: "Junior Designer",
                company: "Design House",
                description: "Started my design career working on web design and basic user interface projects.",
            },
        ],
        currentActivities: [
            // Work activities
            {
                id: "activity_1",
                activity: "Leading design for a fintech startup's mobile app redesign",
                type: "work" as const,
                color: "green",
            },
            {
                id: "activity_2",
                activity: "Building a comprehensive design system for B2B products",
                type: "work" as const,
                color: "blue",
            },
            {
                id: "activity_3",
                activity: "Mentoring junior designers in the community",
                type: "work" as const,
                color: "purple",
            },
            // Learning activities
            {
                id: "activity_4",
                activity: "Exploring AI-powered design tools and workflows",
                type: "learning" as const,
                color: "orange",
            },
            {
                id: "activity_5",
                activity: "Learning advanced React and TypeScript",
                type: "learning" as const,
                color: "pink",
            },
            {
                id: "activity_6",
                activity: "Writing about design and development",
                type: "learning" as const,
                color: "teal",
            },
        ],
    };

    try {
        await aboutService.createAboutData(initialData);
        console.log("Initial about data created successfully");
    } catch (error) {
        console.error("Failed to create initial about data:", error);
        throw error;
    }
};
