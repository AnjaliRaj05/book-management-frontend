import React, { useState, useContext } from "react";
import Link from "next/link";
import { Layout as AntLayout, Button, Drawer, message } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import AddBookModal from "@/components/AddBookModal";
import { AuthContext } from "@/context/AuthContext";
import { PlusOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
  onBookAdded?: () => void | Promise<void>;
}
const Layout = ({ children, onBookAdded }: LayoutProps) => {
  const [open, setOpen] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  const { user, logout } = useContext(AuthContext);

  const handleAddBookClick = () => {
    if (user) {
      setShowAddBookModal(true);
    } else {
      message.warning("Please login or signup first!");
      window.location.href = "/login";
    }
  };

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      {/* Navbar */}
      <Header
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e5e5",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          height: "64px",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "#8B5E3C" }}>
          <Link href="/">📚 BookApp</Link>
        </div>

        <div className="desktop-menu" style={{ display: "flex", gap: "30px", fontWeight: 500 }}>
          <Link href="/" style={{ color: "#8B5E3C" }}>Home</Link>
          <Link href="/books" style={{ color: "#8B5E3C" }}>Books</Link>
        </div>

        <div className="desktop-menu" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Button type="default" onClick={handleAddBookClick}  icon={<PlusOutlined />}  style={{ backgroundColor: "#8B5E3C", color:"#fff" }}>
            Add Book
          </Button>

          {user ? (
            <>
              <span style={{ color: "#8B5E3C", fontWeight: 500 }}>Hello, {user.fullname}</span>
              <Button type="default" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ color: "#8B5E3C", fontWeight: 500 }}>Log in</Link>
              <Link href="/signup">
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#8B5E3C",
                    border: "none",
                    borderRadius: "20px",
                    padding: "0 20px",
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="mobile-menu">
          <MenuOutlined
            style={{ fontSize: "22px", color: "#8B5E3C" }}
            onClick={() => setOpen(true)}
          />
        </div>
      </Header>

      {/* Drawer */}
      <Drawer title="📚 BookApp" placement="right" onClose={() => setOpen(false)} open={open}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/books" onClick={() => setOpen(false)}>Books</Link>
          <Button type="default" onClick={handleAddBookClick}>Add Book</Button>
          {user ? (
            <>
              <span>Hello, {user.fullname}</span>
              <Button type="default" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)}>Log in</Link>
              <Link href="/signup" onClick={() => setOpen(false)}>
                <Button type="primary">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </Drawer>

      {/* Add Book Modal */}
      {showAddBookModal && (
        <AddBookModal
          visible={showAddBookModal}
          onClose={() => setShowAddBookModal(false)}
          onBookAdded={() => {
            setShowAddBookModal(false);
            message.success("Book added successfully!");
            if (onBookAdded) onBookAdded(); 
          }}
        />
      )}

      {/* Main Content */}
      <Content>
        <div style={{ minHeight: "80vh", background: "#fff" }}>{children}</div>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center", background: "#8B5E3C", color: "#fff"  }}>
        Book Management App ©{new Date().getFullYear()} Created by Anjali
      </Footer>

      <style jsx>{`
        .mobile-menu { display: none; }
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu { display: block; }
        }
      `}</style>
    </AntLayout>
  );
};

export default Layout;
