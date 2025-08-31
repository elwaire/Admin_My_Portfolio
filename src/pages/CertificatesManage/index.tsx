// pages/admin/CertificatesManage.tsx
import React, { useState, useCallback } from "react";
import { Table, Button, Modal, Form, Input, Space, Image, Popconfirm, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useCertificates } from "../../hooks/useCertificates";
import type { Certificate, CertificateFormData } from "../../types/certificate";

const CertificatesManage: React.FC = () => {
    const { certificates, loading, createCertificate, updateCertificate, deleteCertificate } = useCertificates();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
    const [form] = Form.useForm();

    const handleCreate = useCallback(() => {
        setEditingCertificate(null);
        form.resetFields();
        setIsModalOpen(true);
    }, [form]);

    const handleEdit = useCallback(
        (certificate: Certificate) => {
            setEditingCertificate(certificate);
            form.setFieldsValue(certificate);
            setIsModalOpen(true);
        },
        [form],
    );

    const handleDelete = useCallback(
        async (id: string) => {
            try {
                await deleteCertificate(id);
                message.success("Deleted successfully");
            } catch {
                message.error("Delete failed");
            }
        },
        [deleteCertificate],
    );

    const handleSubmit = useCallback(
        async (values: CertificateFormData) => {
            try {
                if (editingCertificate) {
                    await updateCertificate(editingCertificate.id, values);
                    message.success("Updated successfully");
                } else {
                    await createCertificate(values);
                    message.success("Created successfully");
                }
                setIsModalOpen(false);
            } catch {
                message.error("Save failed");
            }
        },
        [editingCertificate, updateCertificate, createCertificate],
    );

    const columns: ColumnsType<Certificate> = [
        {
            title: "Image",
            dataIndex: "image",
            width: 80,
            render: (image: string, record: Certificate) => (
                <Image src={image} alt={record.title} width={50} height={50} style={{ objectFit: "cover" }} />
            ),
        },
        {
            title: "Title",
            dataIndex: "title",
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: "Issuer",
            dataIndex: "issuer",
            sorter: (a, b) => a.issuer.localeCompare(b.issuer),
        },
        {
            title: "Date",
            dataIndex: "date",
            sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        },
        {
            title: "Actions",
            width: 120,
            render: (_, record: Certificate) => (
                <Space>
                    {record.link && (
                        <Button
                            size="small"
                            icon={<EyeOutlined />}
                            onClick={() => window.open(record.link, "_blank")}
                        />
                    )}
                    <Button size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Popconfirm title="Delete?" onConfirm={() => handleDelete(record.id)}>
                        <Button size="small" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Certificates ({certificates.length})</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                    Add Certificate
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={certificates}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10, showQuickJumper: true }}
            />

            <Modal
                title={editingCertificate ? "Edit Certificate" : "Add Certificate"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input placeholder="Certificate title" />
                    </Form.Item>
                    <Form.Item name="issuer" label="Issuer" rules={[{ required: true }]}>
                        <Input placeholder="Issuing organization" />
                    </Form.Item>
                    <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                        <Input placeholder="Jun 2023" />
                    </Form.Item>
                    <Form.Item name="image" label="Image URL" rules={[{ required: true, type: "url" }]}>
                        <Input placeholder="https://..." />
                    </Form.Item>
                    <Form.Item name="link" label="Link">
                        <Input placeholder="https://..." />
                    </Form.Item>
                    <div className="flex justify-end gap-2">
                        <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            {editingCertificate ? "Update" : "Create"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default CertificatesManage;
