import React, { useEffect, useState, useCallback } from "react";
import Layout from "@/components/Layout";
import {
  Table,
  Layout as AntLayout,
  Spin,
  Button,
  Popconfirm,
  message,
  Select,
  Input,
  Row,
  Col,
} from "antd";
import { AxiosError } from "axios";
import api from "@/utils/api";
import EditBookModal from "@/components/EditBookModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Content } = AntLayout;
const { Title } = Typography;

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  status: "Available" | "Issued";
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();

  const openEditModal = (book: Book) => {
    setEditingBook(book);
    setEditModalVisible(true);
  };

  const handleUpdateBook = async (updatedBook: Book) => {
    try {
      await api.put(`/books/${updatedBook._id}`, updatedBook);
      messageApi.success("Book has been updated successfully!");
      fetchBooks(currentPage, pageSize);
      setEditModalVisible(false);
      setEditingBook(null);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error("Update error:", err.response?.data || err.message);
      messageApi.error(err.response?.data?.message || "❌ Failed to update book");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    try {
      await api.delete(`/books/${id}`);
      messageApi.success(`Book "${title}" deleted successfully`);
      fetchBooks(currentPage, pageSize);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error(err);
      messageApi.error(err.response?.data?.message || "❌ Failed to delete book");
    }
  };
const fetchBooks = useCallback(
  async (page = 1, limit = 10, search = searchQuery) => {
    setLoading(true);
    try {
      const query: Record<string, string | number> = { page, limit };
      if (genreFilter) query.genre = genreFilter;
      if (statusFilter) query.status = statusFilter;
      if (search) query.search = search;  // use param, not stale state

      const queryString = new URLSearchParams(
        Object.fromEntries(Object.entries(query).map(([k, v]) => [k, String(v)]))
      ).toString();

      const res = await api.get<{ books: Book[]; total: number }>(`/books?${queryString}`);
      setBooks(res.data.books);
      setTotal(res.data.total);
      console.log("response", res.data);
      if (res.data.books.length === 0) {
        messageApi.info("No books found with current filters or search.");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error(err);
      messageApi.error(err.response?.data?.message || "❌ Failed to fetch books");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  },
  [genreFilter, statusFilter, searchQuery, messageApi]
);

   
  useEffect(() => {
  fetchBooks(currentPage, pageSize);
}, [fetchBooks, currentPage, pageSize, searchQuery, genreFilter, statusFilter]);


  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Author", dataIndex: "author", key: "author" },
    { title: "Genre", dataIndex: "genre", key: "genre" },
    { title: "Published Year", dataIndex: "publishedYear", key: "publishedYear" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Book) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button type="primary" icon={<EditOutlined />} onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title={`Are you sure you want to delete "${record.title}"?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record._id, record.title)}
          >
            <Button type="default" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      {contextHolder}
      <Content style={{ padding: "1px 20px 20px 20px" }}>
        <Title
          level={2}
          style={{
            color: "#8B5E3C",
            textAlign: "center",
            fontWeight: 800,
            fontFamily: "'Playfair Display', serif",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            borderBottom: "3px solid #D9A066",
            display: "inline-block",
            paddingBottom: "6px",
            marginBottom: "20px",
          }}
        >
          Book Listing
        </Title>

        <Row gutter={[16, 16]} style={{ marginBottom: "15px" }}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input.Search
              placeholder="Search by Title or Author"
              allowClear
              style={{ width: "100%" }}
              onSearch={(value) => {
  setCurrentPage(1);
  setSearchQuery(value);
}}

            />
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              placeholder="Filter by Genre"
              style={{ width: "100%" }}
              allowClear
              value={genreFilter || undefined}
              onChange={(value) => {
                setCurrentPage(1);
                setGenreFilter(value || null);
              }}
            >
              {Array.from(new Set(books.map((b) => b.genre))).map((genre) => (
                <Select.Option key={genre} value={genre}>
                  {genre}
                </Select.Option>
              ))}
            </Select>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              placeholder="Filter by Status"
              style={{ width: "100%" }}
              allowClear
              value={statusFilter || undefined}
              onChange={(value) => {
                setCurrentPage(1);
                setStatusFilter(value || null);
              }}
            >
              <Select.Option value="Available">Available</Select.Option>
              <Select.Option value="Issued">Issued</Select.Option>
            </Select>
          </Col>
        </Row>

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "60vh",
            }}
          >
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
          <Table
            bordered
            dataSource={books.map((book) => ({ ...book, key: book._id }))}
            columns={columns}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20"],
              showQuickJumper: true,
              onChange: (page, size) => {
                setCurrentPage(page);
                setPageSize(size || 10);
                fetchBooks(page, size || 10);
              },
              position: ["bottomCenter"],
            }}
            scroll={{ x: true }}
            locale={{ emptyText: "No books found" }}
          />
        )}
      </Content>

      <EditBookModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSubmit={handleUpdateBook}
        book={editingBook}
      />
    </Layout>
  );
}
