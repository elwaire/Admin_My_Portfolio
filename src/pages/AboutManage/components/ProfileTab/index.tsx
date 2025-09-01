// components/admin/about/ProfileTab.tsx
import React from "react";
import { Card, Button, Descriptions, Tag, Space } from "antd";
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
                <Descriptions.Item label="Image URL" span={2}>
                    {profile.image ? (
                        <a href={profile.image} target="_blank" rel="noopener noreferrer">
                            View Image
                        </a>
                    ) : (
                        "Not set"
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Skills" span={2}>
                    <Space wrap>
                        {profile.skills?.map((skill) => (
                            <Tag key={skill} color="blue">
                                {skill}
                            </Tag>
                        )) || "No skills added"}
                    </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Bio" span={2}>
                    {profile.bio?.length > 0 ? (
                        <div className="space-y-2">
                            {profile.bio.map((paragraph, index) => (
                                <p key={index} className="mb-2">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    ) : (
                        "No bio added"
                    )}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default ProfileTab;
