import React, { useEffect } from "react";
import { Modal, Input, Form, Button } from "antd";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  status: "Available" | "Issued";
}

interface EditBookModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (updatedBook: Book) => void;
  book: Book | null;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ visible, onClose, onSubmit, book }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (book) {
      form.setFieldsValue(book);
    }
  }, [book, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (book) {
        const updatedBook: Book = { ...book, ...values };
        onSubmit(updatedBook);
        onClose();
      }
    });
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      title="Edit Book"
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleOk}>
          Save Changes
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Author" name="author" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Genre" name="genre" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Published Year"
          name="publishedYear"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditBookModal;
