import React, { useState, useContext } from 'react';
import Layout from "@/components/Layout";
import { Row, Col, Typography, Button, message } from "antd";
import { BookOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from 'next/router';
import BannerPic from "../../public/b28272aac0787f3c078e90df7c00a71e98f472dc69e1884d00692dd06636d1af.png";
import AddBookModal from "@/components/AddBookModal";
import ProfileModal from "@/components/ProfileModal";
import { AuthContext } from "@/context/AuthContext";
const { Title, Paragraph } = Typography;

export default function Index() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [addBookModalVisible, setAddBookModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [exploreLoading, setExploreLoading] = useState(false);
  // Books
  const handleExploreBooks = async () => {
    setExploreLoading(true); 
    try {
      await router.push("/books");
    } finally {
      setExploreLoading(false); 
    }
  };

  const handleOpenBookModal = () => {
    if (user) {
      setAddBookModalVisible(true);
    } else {
      message.warning("Please login or signup first!");
      router.push("/login");
    }
  };

  const handleCloseBookModal = () => setAddBookModalVisible(false);
  const handleBookAdded = () => setAddBookModalVisible(false);

  const handleOpenProfileModal = () => {
    if (user) {
      setProfileModalVisible(true);
    } else {
      message.warning("Please login first!");
      router.push("/login");
    }
  };

  const handleCloseProfileModal = () => setProfileModalVisible(false);

  return (
    <Layout>
      <div style={{ overflowX: "hidden" }}>
        {/* First Row */}
        <Row gutter={[32, 32]} align="middle" style={{ backgroundColor: "#F6F0EC", padding: "40px" }}>
          <Col
            xs={24}
            md={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '16px',
              alignItems: 'flex-start'
            }}
          >
            <Title
              level={2}
              style={{
                color: '#8B5E3C',
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                fontSize: '2.5rem',
                lineHeight: 1.2
              }}
            >
              Welcome to Our Book App
            </Title>

            <Paragraph
              style={{
                color: '#4B4B4B',
                fontSize: '1.1rem',
                lineHeight: 1.6,
                maxWidth: '480px'
              }}
            >
              Discover our curated collection of books. Dive in and explore your next favorite read!
            </Paragraph>

            <Button
              type="primary"
              onClick={handleExploreBooks}
              icon={<BookOutlined />} 
              loading={exploreLoading}
              style={{
                backgroundColor: '#8B5E3C',
                borderColor: '#8B5E3C',
                color: '#fff',
                fontWeight: 600,
                padding: '20px 20px 20px 20px',
                fontSize: '1.2rem',
                borderRadius: '8px'
              }}
            >
              Explore Books
            </Button>
          </Col>


          <Col xs={24} md={12} style={{ textAlign: "right" }}>
            <Image
              src={BannerPic}
              alt="Banner"
              layout="responsive"
             
              style={{ borderRadius: "8px" }}
            />
          </Col>
        </Row>

        {/* Second Row */}
        <Row gutter={[32, 32]} align="middle" style={{ marginTop: "40px" }}>
          {/* Add Book */}
          <Col xs={24} md={12} style={{ textAlign: "center", marginBottom: "40px" }}>
            <BookOutlined style={{ fontSize: "40px", color: "#8B5E3C", marginBottom: "10px" }} />
            <h2 className="font-semibold text-lg mb-1">Add New Book</h2>
            <Paragraph>Quickly add a new book to your collection</Paragraph>
            <Button
              type="primary"
              onClick={handleOpenBookModal}
              style={{ backgroundColor: "#8B5E3C", borderColor: "#8B5E3C" }}
            >
              Add Book
            </Button>

            <AddBookModal
              visible={addBookModalVisible}
              onClose={handleCloseBookModal}
              onBookAdded={handleBookAdded}
            />
          </Col>

          <Col xs={24} md={12} style={{ textAlign: "center", marginBottom: "40px" }}>
            <UserOutlined style={{ fontSize: "40px", color: "#8B5E3C", marginBottom: "10px" }} />
            <h2 className="font-semibold text-lg mb-1">View Profile</h2>
            <Paragraph>Manage your personal information and settings.</Paragraph>
            <Button
              type="primary"
              onClick={handleOpenProfileModal}
              style={{ backgroundColor: "#8B5E3C", borderColor: "#8B5E3C" }}
            >
              Profile
            </Button>

            <ProfileModal
              visible={profileModalVisible}
              onClose={handleCloseProfileModal}
              fullname={user?.fullname || ""}
              email={user?.email || ""}
            />
          </Col>
        </Row>
      </div>
    </Layout>
  );
}
