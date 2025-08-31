// components/admin/about/ProfileTab.tsx
import React from "react";
import { Card, Button, Descriptions } from "antd";
import { EditOutlined } from "@ant-design/icons";
import type { ProfileData } from "../../../../types/about";

interface ProfileTabProps {
    profile: ProfileData;
    onEdit: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ profile, onEdit }) => {
    return (
        <Card
            title="Profile Information"
            extra={
                <Button icon={<EditOutlined />} onClick={onEdit}>
                    Edit Profile
                </Button>
            }
        >
            <Descriptions column={{ xs: 1, sm: 2 }} bordered>
                <Descriptions.Item label="Name">{profile.name}</Descriptions.Item>
                <Descriptions.Item label="Title">{profile.title}</Descriptions.Item>
                <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
                <Descriptions.Item label="Location">{profile.location}</Descriptions.Item>
                <Descriptions.Item label="Avatar URL" span={2}>
                    <a href={profile.avatar} target="_blank" rel="noopener noreferrer">
                        {profile.avatar}
                    </a>
                </Descriptions.Item>
                <Descriptions.Item label="Description" span={2}>
                    {profile.description}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default ProfileTab;
