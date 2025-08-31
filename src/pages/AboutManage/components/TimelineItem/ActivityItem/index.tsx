// components/admin/about/ActivityItem.tsx
import React from "react";
import { Space, Button, Popconfirm, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { CurrentActivity } from "../../../../../types/about";

interface ActivityItemProps {
    activity: CurrentActivity;
    onEdit: (item: CurrentActivity) => void;
    onDelete: (id: string) => void;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, onEdit, onDelete }) => (
    <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
        <div className="flex items-center gap-3 flex-1">
            <div className={`w-3 h-3 bg-${activity.color}-500 rounded-full`}></div>
            <span className="font-medium">{activity.activity}</span>
            <Tag color={activity.type === "work" ? "green" : "purple"}>{activity.type}</Tag>
        </div>
        <Space>
            <Button size="small" icon={<EditOutlined />} onClick={() => onEdit(activity)} />
            <Popconfirm title="Delete this activity?" onConfirm={() => onDelete(activity.id)}>
                <Button size="small" danger icon={<DeleteOutlined />} />
            </Popconfirm>
        </Space>
    </div>
);

export default ActivityItem;
