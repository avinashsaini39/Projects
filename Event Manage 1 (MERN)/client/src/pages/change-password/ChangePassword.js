import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Typography, Layout, Row, Col } from "antd";
// import "./forgotPassword.css";
import axios from "axios";
import toast from "react-hot-toast";
const { Title } = Typography;
const { Content, Footer } = Layout;

const ChangePassword = () => {
  const history = useHistory();
  const onFinish = async (values) => {
    try {
      const { email, password } = values; // Destructure email and password from values
      const response = await axios.post(
        "http://localhost:5000/api/change-password",
        { email, password } // Include email and password in the request body
      );
      if (response.status === 200) {
        toast.success("Password Changed Successfully");
      }
      history.push("/sign-in");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.error);
        }
      } else {
        console.error("Error changing password:", error.message);
        toast.error("Error changing password");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout className="layout-default layout-signin">
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around">
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 6, offset: 2 }}
            md={{ span: 12 }}
          >
            <Title className="mb-1">Change Password</Title>
            <Title className="font-regular text-muted" level={5}>
              Enter your email address below to reset your password.
            </Title>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                name="email"
                label="Email" // Add email field
                rules={[
                  { required: true, message: "Please input your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="New Password"
                rules={[
                  { required: true, message: "Please input your new password" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters long",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit">Change Password</Button>
              </Form.Item>
            </Form>
          </Col>
          <Col
            className="sign-img"
            style={{ padding: 12 }}
            xs={{ span: 24 }}
            lg={{ span: 12 }}
            md={{ span: 12 }}
          >
            <img
              src={
                "https://i.pinimg.com/originals/f3/7e/f0/f37ef0a4c5bc6b8784edb15a058793df.png"
              }
              alt=""
            />
          </Col>
        </Row>
      </Content>
      <Footer>
        <p className="copyright"> Copyright © 2024 Event Management. </p>
      </Footer>
    </Layout>
  );
};

export default ChangePassword;
