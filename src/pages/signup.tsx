import React, { useState, useContext } from "react";
import { Form, Input, Button, message, Card, Typography } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import api from "@/utils/api";

const { Title, Text } = Typography;

interface SignupFormValues {
  fullname: string;
  email: string;
  password: string;
}

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const onFinish = async (values: SignupFormValues) => {
    setLoading(true);
    try {
      const res = await api.post("/users/register", values);
      const userData = res.data.user;
      localStorage.setItem("token", res.data.token || "dummy");
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      message.success("Signup successful!");
      router.push("/");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      message.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <Card
        className="signup-card"
        bordered={false}
        style={{ maxWidth: 400, width: "100%", borderRadius: 12, padding: "30px 20px" }}
      >
        <div className="signup-header" style={{ textAlign: "center", marginBottom: 20 }}>
          <Title level={2} style={{ color: "#8B5E3C" }}>Create Account</Title>
          <Text type="secondary">Fill in your details to get started</Text>
        </div>

        <Form<SignupFormValues>
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ fullname: "", email: "", password: "" }}
        >
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter password" />
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
              Sign Up
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Text>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#8B5E3C" }}>Login</Link>
            </Text>
          </div>
        </Form>
      </Card>

      <style jsx>{`
        .signup-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #fef6f0, #fff7f0);
        }

        .signup-card {
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
