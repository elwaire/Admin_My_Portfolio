// components/admin/about/TimelineItem.tsx
import React from "react";
import { Space, Button, Popconfirm, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { TimelineItem } from "../../../../types/about";

interface TimelineItemProps {
    item: TimelineItem;
    onEdit: (item: TimelineItem) => void;
    onDelete: (id: string) => void;
}

const TimelineItemComponent: React.FC<TimelineItemProps> = ({ item, onEdit, onDelete }) => (
    <div className="flex justify-between items-start p-4 border rounded-lg hover:bg-gray-50">
        <div className="flex-1">
            <div className="font-medium text-lg">{item.role}</div>
            <div className="flex items-center gap-2 mt-1">
                <Tag color="blue">{item.company}</Tag>
                <span className="text-gray-500 text-sm">{item.period}</span>
            </div>
            <div className="text-gray-600 text-sm mt-2">{item.description}</div>
        </div>
        <Space>
            <Button size="small" icon={<EditOutlined />} onClick={() => onEdit(item)} />
            <Popconfirm title="Delete this timeline item?" onConfirm={() => onDelete(item.id)}>
                <Button size="small" danger icon={<DeleteOutlined />} />
            </Popconfirm>
        </Space>
    </div>
);

export default TimelineItemComponent;
