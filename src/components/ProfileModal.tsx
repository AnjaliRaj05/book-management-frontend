import React, { useContext } from "react";
import { Modal, Avatar, Typography, Button, Space, message } from "antd";
import { CloseOutlined, EditOutlined, LogoutOutlined } from "@ant-design/icons";
import { AuthContext } from "@/context/AuthContext";

const { Title, Text } = Typography;

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
  fullname: string;
  email: string;
  onEdit?: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  visible,
  onClose,
  fullname,
  email,
  onEdit,
}) => {
  const { setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    message.success("Logged out successfully!");
    onClose(); 
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      closeIcon={<CloseOutlined style={{ fontSize: "16px", color: "#555" }} />}
      bodyStyle={{
        textAlign: "center",
        padding: "30px 20px",
        background: "linear-gradient(135deg, #f5f7fa, #e4ecf7)",
        borderRadius: "12px",
      }}
    >
      {/* Avatar */}
      <div style={{ marginBottom: "20px" }}>
        <Avatar
          size={100}
          src="/avtar.jpg"
          style={{
            border: "3px solid #1890ff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        />
      </div>

      <Title level={4} style={{ marginBottom: 5 }}>
        {fullname}
      </Title>
      <Text type="secondary">{email}</Text>

      
      <div style={{ marginTop: "30px" }}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            block
            style={{ borderRadius: 8 }}
            onClick={onEdit}
          >
            Edit Profile
          </Button>
          <Button
            danger
            icon={<LogoutOutlined />}
            block
            style={{ borderRadius: 8 }}
            onClick={handleLogout} 
          >
            Logout
          </Button>
          <Button
            style={{ borderRadius: 8 }}
            block
            onClick={onClose}
          >
            Close
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default ProfileModal;
