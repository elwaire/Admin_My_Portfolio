import React, { memo, useCallback } from "react";
import { Button, Form, Input, Select, Card, Space, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../configs/firebase";
import log from "../../../utils/log";

const { TextArea } = Input;

const cardStyle = { marginBottom: 16 };
const sectionCardStyle = { marginBottom: 12, border: "1px solid #f0f0f0" };

const INITIAL_VALUES = {
    introduction: { service: [] },
    sections: [],
};

const CATEGORIES = ["uiux", "graphic", "art"];

const AddProjectPage: React.FC = () => {
    const [form] = Form.useForm();

    const handleFinish = useCallback(
        async (values: any) => {
            try {
                log(values);

                const docRef = await addDoc(collection(db, "projects"), {
                    ...values,
                    createdAt: serverTimestamp(),
                });
                message.success("✅ Project saved successfully!");
                console.log("Document written with ID: ", docRef.id);

                form.resetFields();
            } catch (error) {
                console.error("Error adding project: ", error);
                message.error("❌ Failed to save project!");
            }
        },
        [form],
    );

    return (
        <div className="flex justify-center p-6">
            <Card title="Add New Project" style={{ width: "100%", maxWidth: 900 }}>
                <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={INITIAL_VALUES}>
                    {/* HEAD */}
                    <Card title="Head" size="small" style={cardStyle}>
                        <Form.Item
                            name={["head", "title"]}
                            label="Title"
                            rules={[{ required: true, message: "Please input title!" }]}
                        >
                            <Input placeholder="Project title" />
                        </Form.Item>
                        <Form.Item name={["head", "description"]} label="Description">
                            <TextArea rows={3} placeholder="Short description" />
                        </Form.Item>
                        <Form.Item name={["head", "thumbnail"]} label="Thumbnail URL">
                            <Input placeholder="https://..." />
                        </Form.Item>

                        {/* 🔹 NEW: Category */}
                        <Form.Item
                            name={["head", "category"]}
                            label="Category"
                            rules={[{ required: true, message: "Please select category!" }]}
                        >
                            <Select placeholder="Select category">
                                {CATEGORIES.map((cat) => (
                                    <Select.Option key={cat} value={cat}>
                                        {cat}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Card>

                    {/* INTRODUCTION */}
                    <Card title="Introduction" size="small" style={cardStyle}>
                        <Form.Item name={["introduction", "client"]} label="Client">
                            <Input />
                        </Form.Item>
                        <Form.Item name={["introduction", "industry"]} label="Industry">
                            <Input />
                        </Form.Item>
                        <Form.Item name={["introduction", "service"]} label="Service">
                            <Select mode="tags" placeholder="Add services" />
                        </Form.Item>
                        <Form.Item name={["introduction", "platform"]} label="Platform">
                            <Input />
                        </Form.Item>
                        <Form.Item name={["introduction", "myRole"]} label="My Role">
                            <Input />
                        </Form.Item>
                        <Form.Item name={["introduction", "timeline"]} label="Timeline">
                            <Input placeholder="March - June 2023" />
                        </Form.Item>
                    </Card>

                    {/* SECTIONS */}
                    <Card title="Sections" size="small" style={cardStyle}>
                        <Form.List name="sections">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Card
                                            key={key}
                                            size="small"
                                            style={sectionCardStyle}
                                            title={`Section ${key + 1}`}
                                            extra={
                                                <MinusCircleOutlined
                                                    onClick={() => remove(name)}
                                                    style={{ color: "red" }}
                                                />
                                            }
                                        >
                                            <Form.Item
                                                {...restField}
                                                name={[name, "id"]}
                                                label="Section ID"
                                                rules={[{ required: true, message: "Section ID required!" }]}
                                            >
                                                <Input placeholder="intro / challenge / solution..." />
                                            </Form.Item>
                                            <Form.Item {...restField} name={[name, "title"]} label="Title">
                                                <Input placeholder="Section title" />
                                            </Form.Item>
                                            <Form.Item {...restField} name={[name, "text"]} label="Text">
                                                <TextArea rows={3} placeholder="Optional text" />
                                            </Form.Item>

                                            {/* IMAGES */}
                                            <Form.List name={[name, "images"]}>
                                                {(imgFields, { add: addImg, remove: removeImg }) => (
                                                    <>
                                                        {imgFields.map(({ key: imgKey, name: imgName, ...imgRest }) => (
                                                            <Space key={imgKey} align="baseline">
                                                                <Form.Item
                                                                    {...imgRest}
                                                                    name={imgName}
                                                                    label={`Image ${imgKey + 1}`}
                                                                    style={{ flex: 1 }}
                                                                >
                                                                    <Input placeholder="https://..." />
                                                                </Form.Item>
                                                                <MinusCircleOutlined
                                                                    onClick={() => removeImg(imgName)}
                                                                    style={{ color: "red" }}
                                                                />
                                                            </Space>
                                                        ))}
                                                        <Form.Item>
                                                            <Button
                                                                type="dashed"
                                                                onClick={() => addImg()}
                                                                icon={<PlusOutlined />}
                                                            >
                                                                Add Image
                                                            </Button>
                                                        </Form.Item>
                                                    </>
                                                )}
                                            </Form.List>
                                        </Card>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Section
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Card>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Save Project
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default memo(AddProjectPage);
