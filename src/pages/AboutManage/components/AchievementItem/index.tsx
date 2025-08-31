import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space } from "antd";
import type { Achievement } from "../../../../types/about";

interface AchievementItemProps {
    achievement: Achievement;
    onEdit: (item: Achievement) => void;
    onDelete: (id: string) => void;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ achievement, onEdit, onDelete }) => (
    <div className="flex justify-between items-start p-4 border rounded-lg hover:bg-gray-50">
        <div className="flex-1">
            <div className="font-medium text-lg">{achievement.title}</div>
            <div className="text-blue-600 font-medium">{achievement.year}</div>
            <div className="text-gray-600 text-sm mt-1">{achievement.description}</div>
        </div>
        <Space>
            <Button size="small" icon={<EditOutlined />} onClick={() => onEdit(achievement)} />
            <Popconfirm title="Delete this achievement?" onConfirm={() => onDelete(achievement.id)}>
                <Button size="small" danger icon={<DeleteOutlined />} />
            </Popconfirm>
        </Space>
    </div>
);

export default AchievementItem;
