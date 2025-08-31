// types/about.ts (extend existing)
export interface Achievement {
    id: string;
    year: string;
    title: string;
    description: string;
}

export interface TimelineItem {
    id: string;
    period: string;
    role: string;
    company: string;
    description: string;
}

export interface AboutSection {
    id: string;
    title: string;
}

export interface CurrentActivity {
    id: string;
    color: string;
    activity: string;
    type: "work" | "learning";
}

export interface ProfileData {
    name: string;
    title: string;
    description: string;
    avatar: string;
    email: string;
    location: string;
}

export interface AboutData {
    profile: ProfileData;
    achievements: Achievement[];
    timeline: TimelineItem[];
    currentActivities: CurrentActivity[];
}
