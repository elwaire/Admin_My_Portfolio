// components/admin/about/AboutFormModal.tsx
import React from "react";
import { Modal, Form, Input, Select, Button } from "antd";

const { TextArea } = Input;
const { Option } = Select;

interface AboutFormModalProps {
    open: boolean;
    title: string;
    editingType: string;
    onCancel: () => void;
    onSubmit: (values: any) => void;
    initialValues?: any;
    loading?: boolean;
}

const AboutFormModal: React.FC<AboutFormModalProps> = ({
    open,
    title,
    editingType,
    onCancel,
    onSubmit,
    initialValues,
    loading = false,
}) => {
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        onSubmit(values);
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    // Set initial values when modal opens
    React.useEffect(() => {
        if (open && initialValues) {
            form.setFieldsValue(initialValues);
        } else if (open) {
            form.resetFields();
        }
    }, [open, initialValues, form]);

    const renderFormFields = () => {
        switch (editingType) {
            case "profile":
                return (
                    <>
                        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                            <Input placeholder="Your full name" />
                        </Form.Item>
                        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                            <Input placeholder="Your job title" />
                        </Form.Item>
                        <Form.Item name="image" label="Image URL" rules={[{ type: "url" }]}>
                            <Input placeholder="https://..." />
                        </Form.Item>
                        <Form.Item name="skills" label="Skills">
                            <Select mode="tags" placeholder="Add skills">
                                <Option value="UI/UX Design">UI/UX Design</Option>
                                <Option value="Frontend Development">Frontend Development</Option>
                                <Option value="Design Systems">Design Systems</Option>
                                <Option value="React">React</Option>
                                <Option value="TypeScript">TypeScript</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="bio" label="Bio">
                            <Form.List name="bio">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <div key={key} className="flex gap-2 mb-2">
                                                <Form.Item {...restField} name={name} className="flex-1">
                                                    <TextArea rows={3} placeholder="Bio paragraph" />
                                                </Form.Item>
                                                <Button onClick={() => remove(name)} danger>
                                                    Delete
                                                </Button>
                                            </div>
                                        ))}
                                        <Button onClick={() => add()} block>
                                            Add Bio Paragraph
                                        </Button>
                                    </>
                                )}
                            </Form.List>
                        </Form.Item>
                    </>
                );
            case "achievements":
                return (
                    <>
                        <Form.Item name="year" label="Year" rules={[{ required: true }]}>
                            <Input placeholder="2023" />
                        </Form.Item>
                        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                            <Input placeholder="Achievement title" />
                        </Form.Item>
                        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                            <TextArea rows={3} placeholder="Describe your achievement" />
                        </Form.Item>
                    </>
                );
            case "timeline":
                return (
                    <>
                        <Form.Item name="period" label="Period" rules={[{ required: true }]}>
                            <Input placeholder="2023 - Present" />
                        </Form.Item>
                        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                            <Input placeholder="Software Engineer" />
                        </Form.Item>
                        <Form.Item name="company" label="Company" rules={[{ required: true }]}>
                            <Input placeholder="Company name" />
                        </Form.Item>
                        <Form.Item name="description" label="Description">
                            <TextArea rows={3} placeholder="Job responsibilities and achievements" />
                        </Form.Item>
                    </>
                );
            case "activities":
                return (
                    <>
                        <Form.Item name="activity" label="Activity" rules={[{ required: true }]}>
                            <Input placeholder="What are you working on?" />
                        </Form.Item>
                        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                            <Select placeholder="Select type">
                                <Option value="work">Work</Option>
                                <Option value="learning">Learning</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="color" label="Color" rules={[{ required: true }]}>
                            <Select placeholder="Select color">
                                <Option value="green">Green</Option>
                                <Option value="blue">Blue</Option>
                                <Option value="purple">Purple</Option>
                                <Option value="orange">Orange</Option>
                                <Option value="pink">Pink</Option>
                                <Option value="teal">Teal</Option>
                            </Select>
                        </Form.Item>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Modal title={title} open={open} onCancel={handleCancel} footer={null} destroyOnClose width={600}>
            <Form form={form} layout="vertical" onFinish={handleFinish} disabled={loading}>
                {renderFormFields()}
                <Form.Item className="mb-0 pt-4">
                    <div className="flex justify-end gap-2">
                        <Button onClick={handleCancel} disabled={loading}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {initialValues ? "Update" : "Create"}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AboutFormModal;
