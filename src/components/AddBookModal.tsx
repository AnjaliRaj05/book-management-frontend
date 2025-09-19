import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import api from "@/utils/api";
interface AddBookModalProps {
  visible: boolean;
  onClose: () => void;
  onBookAdded: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ visible, onClose, onBookAdded }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        title: values.title,
        author: values.author,
        genre: values.genre,
        publishedYear: Number(values.publishedYear),
        status: values.status,
      };

      await api.post("/books", payload);
      message.success("Book added successfully!");
      form.resetFields();
      onBookAdded();
      onClose();
    } catch (error: any) {
      console.error(error);
      message.error(
        error?.response?.data?.message || "Failed to add book. Please check all fields."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add New Book"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ status: "Available" }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the book title" }]}
        >
          <Input placeholder="Enter book title" />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: "Please enter the author's name" }]}
        >
          <Input placeholder="Enter author name" />
        </Form.Item>

        <Form.Item
          label="Genre"
          name="genre"
          rules={[{ required: true, message: "Please enter the genre" }]}
        >
          <Input placeholder="Enter book genre" />
        </Form.Item>

        <Form.Item
          label="Published Year"
          name="publishedYear"
          rules={[
            { required: true, message: "Please enter published year" },
            {
              pattern: /^[0-9]{4}$/,
              message: "Please enter a valid year (e.g., 2023)",
            },
          ]}
        >
          <Input type="number" placeholder="Enter published year" />
        </Form.Item>


        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Input placeholder="Available / Issued" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Add Book
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBookModal;
