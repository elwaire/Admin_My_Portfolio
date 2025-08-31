// pages/admin/AboutManagePage.tsx
import React, { useState, useCallback } from "react";
import { Tabs, Card, message } from "antd";
import { useAbout } from "../../hooks/useAbout";
import type { Achievement, TimelineItem, CurrentActivity } from "../../types/about";
import ProfileTab from "./components/ProfileTab";
import ListTab from "./components/ListTab";
import AchievementItem from "./components/AchievementItem";
import TimelineItemComponent from "./components/TimelineItem";
import ActivityItem from "./components/TimelineItem/ActivityItem";
import AboutFormModal from "./components/AboutFormModal";

const AboutManagePage: React.FC = () => {
    const { aboutData, loading, updateAboutData, isUpdating } = useAbout();
    const [activeTab, setActiveTab] = useState("profile");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [editingType, setEditingType] = useState<string>("");

    const handleAdd = useCallback((type: string) => {
        setEditingType(type);
        setEditingItem(null);
        setIsModalOpen(true);
    }, []);

    const handleEdit = useCallback((item: any, type: string) => {
        setEditingType(type);
        setEditingItem(item);
        setIsModalOpen(true);
    }, []);

    const handleDelete = useCallback(
        async (id: string, type: string) => {
            if (!aboutData) return;

            try {
                const updatedData = { ...aboutData };

                switch (type) {
                    case "achievements":
                        updatedData.achievements = aboutData.achievements?.filter((item) => item.id !== id) || [];
                        break;
                    case "timeline":
                        updatedData.timeline = aboutData.timeline?.filter((item) => item.id !== id) || [];
                        break;
                    case "activities":
                        updatedData.currentActivities =
                            aboutData.currentActivities?.filter((item) => item.id !== id) || [];
                        break;
                }

                await updateAboutData(updatedData);
                message.success("Deleted successfully");
            } catch {
                message.error("Delete failed");
            }
        },
        [aboutData, updateAboutData],
    );

    const handleSubmit = useCallback(
        async (values: any) => {
            if (!aboutData) return;

            try {
                const updatedData = { ...aboutData };

                if (editingType === "profile") {
                    updatedData.profile = { ...updatedData.profile, ...values };
                } else {
                    const newItem = {
                        ...values,
                        id: editingItem?.id || `${editingType}_${Date.now()}`,
                    };

                    if (editingType === "achievements") {
                        if (editingItem) {
                            const index =
                                updatedData.achievements?.findIndex((item) => item.id === editingItem.id) ?? -1;
                            if (index >= 0 && updatedData.achievements) {
                                updatedData.achievements[index] = newItem;
                            }
                        } else {
                            updatedData.achievements = [...(updatedData.achievements || []), newItem];
                        }
                    } else if (editingType === "timeline") {
                        if (editingItem) {
                            const index = updatedData.timeline?.findIndex((item) => item.id === editingItem.id) ?? -1;
                            if (index >= 0 && updatedData.timeline) {
                                updatedData.timeline[index] = newItem;
                            }
                        } else {
                            updatedData.timeline = [...(updatedData.timeline || []), newItem];
                        }
                    } else if (editingType === "activities") {
                        if (editingItem) {
                            const index =
                                updatedData.currentActivities?.findIndex((item) => item.id === editingItem.id) ?? -1;
                            if (index >= 0 && updatedData.currentActivities) {
                                updatedData.currentActivities[index] = newItem;
                            }
                        } else {
                            updatedData.currentActivities = [...(updatedData.currentActivities || []), newItem];
                        }
                    }
                }

                await updateAboutData(updatedData);
                message.success(editingItem ? "Updated successfully" : "Created successfully");
                setIsModalOpen(false);
            } catch {
                message.error("Save failed");
            }
        },
        [aboutData, updateAboutData, editingItem, editingType],
    );

    if (loading) {
        return (
            <div className="p-6">
                <div className="h-8 bg-gray-200 rounded w-64 mb-6 animate-pulse" />
                <Card loading />
            </div>
        );
    }

    if (!aboutData) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">About Management</h1>
                <Card>
                    <div className="text-center py-8">
                        <p className="text-gray-500">No about data found</p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">About Management</h1>

            <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <Tabs.TabPane tab="Profile" key="profile">
                    <ProfileTab profile={aboutData.profile} onEdit={() => handleEdit(aboutData.profile, "profile")} />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Achievements" key="achievements">
                    <ListTab
                        title="Achievements"
                        data={aboutData.achievements || []}
                        onAdd={() => handleAdd("achievements")}
                        onEdit={(item) => handleEdit(item, "achievements")}
                        onDelete={(id) => handleDelete(id, "achievements")}
                        renderItem={(item: Achievement) => (
                            <AchievementItem
                                key={item.id}
                                achievement={item}
                                onEdit={(item) => handleEdit(item, "achievements")}
                                onDelete={(id) => handleDelete(id, "achievements")}
                            />
                        )}
                    />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Timeline" key="timeline">
                    <ListTab
                        title="Timeline"
                        data={aboutData.timeline || []}
                        onAdd={() => handleAdd("timeline")}
                        onEdit={(item) => handleEdit(item, "timeline")}
                        onDelete={(id) => handleDelete(id, "timeline")}
                        renderItem={(item: TimelineItem) => (
                            <TimelineItemComponent
                                key={item.id}
                                item={item}
                                onEdit={(item) => handleEdit(item, "timeline")}
                                onDelete={(id) => handleDelete(id, "timeline")}
                            />
                        )}
                    />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Activities" key="activities">
                    <ListTab
                        title="Activities"
                        data={aboutData.currentActivities || []}
                        onAdd={() => handleAdd("activities")}
                        onEdit={(item) => handleEdit(item, "activities")}
                        onDelete={(id) => handleDelete(id, "activities")}
                        renderItem={(item: CurrentActivity) => (
                            <ActivityItem
                                key={item.id}
                                activity={item}
                                onEdit={(item) => handleEdit(item, "activities")}
                                onDelete={(id) => handleDelete(id, "activities")}
                            />
                        )}
                    />
                </Tabs.TabPane>
            </Tabs>

            <AboutFormModal
                open={isModalOpen}
                title={`${editingItem ? "Edit" : "Add"} ${editingType}`}
                editingType={editingType}
                onCancel={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialValues={editingItem}
                loading={isUpdating}
            />
        </div>
    );
};

export default AboutManagePage;
