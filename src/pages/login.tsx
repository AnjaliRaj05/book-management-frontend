import React, { useState, useContext } from "react";
import { Form, Input, Button, message, Card, Typography } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext"; 
import api from "@/utils/api";

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext); 

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const res = await api.post("/users/login", values);
      const userData = res.data.user;
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      message.success("Login successful");
      router.push("/");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      message.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card
        className="login-card"
        bordered={false}
        style={{ maxWidth: 400, width: "100%", borderRadius: 12, padding: "30px 20px" }}
      >
        <div className="login-header" style={{ textAlign: "center", marginBottom: 20 }}>
          <Title level={2} style={{ color: "#8B5E3C" }}>Welcome Back</Title>
          <Text type="secondary">Login to your account</Text>
        </div>

        <Form<LoginFormValues>
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ email: "", password: "" }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Anjali@gmail.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Anjali@1234" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                backgroundColor: "#8B5E3C",
                borderColor: "#8B5E3C",
                borderRadius: 20,
                height: 45,
              }}
            >
              Login
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Text>
  Don&apos;t have an account?{" "}
  <Link href="/signup" style={{ color: "#8B5E3C" }}>Sign Up</Link>
</Text>
          </div>
        </Form>
      </Card>

      <style jsx>{`
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #fef6f0, #fff7f0);
        }

        .login-card {
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
