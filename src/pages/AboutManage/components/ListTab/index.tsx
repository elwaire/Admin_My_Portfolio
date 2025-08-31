// components/admin/about/ListTab.tsx
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Empty } from "antd";
import React from "react";

interface ListTabProps<T> {
    title: string;
    data: T[];
    onAdd: () => void;
    onEdit: (item: T) => void;
    onDelete: (id: string) => void;
    renderItem: (item: T) => React.ReactNode;
}

function ListTab<T extends { id: string }>({ title, data, onAdd, renderItem }: ListTabProps<T>) {
    return (
        <Card
            title={`${title} (${data.length})`}
            extra={
                <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
                    Add {title.slice(0, -1)}
                </Button>
            }
        >
            {data.length === 0 ? (
                <Empty description={`No ${title.toLowerCase()} yet`} />
            ) : (
                <div className="space-y-4">{data.map(renderItem)}</div>
            )}
        </Card>
    );
}

export default ListTab;
