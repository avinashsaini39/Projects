// import React from 'react';
// import { useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import axios from 'axios';

// function ForgotPassword() {
//   const [email, setEmail] = useState('');
//   const history = useHistory();

//   axios.defaults.withCredentials = true;
//   const handleSubmit = (e) => {         
//     e.preventDefault();
    
//     axios
//       .post('http://localhost:5000/forgot-password', { email })
//       .then((res) => {
//         if (res.data.Status === 'Success') {
//           history.push('/login');
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
//       <div className="bg-white p-3 rounded w-25">
//         <h4>Forgot Password</h4>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email">
//               <strong>Email</strong>
//             </label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               autoComplete="off"
//               name="email"
//               className="form-control rounded-0"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <button type="submit" className="btn btn-success w  -100 rounded-0">
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;

// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { Layout, Form, Input, Button, message } from 'antd';
// // import { MailOutlined } from '@ant-design/icons';

// // const { Content } = Layout;

// // const ForgotPassword = () => {
// //   const [loading, setLoading] = useState(false);

// //   const onFinish = async (values) => {
// //     setLoading(true);
// //     try {
// //       const response = await fetch('http://localhost:5000/api/forgot-password', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(values),
// //       });
// //       const data = await response.json();
// //       message.success(data.message);
// //     } catch (error) {
// //       console.error('Error:', error);
// //       message.error('Failed to reset password. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const onFinishFailed = (errorInfo) => {
// //     console.log('Failed:', errorInfo);
// //   };

// //   return (
// //     <Content className="forgot-password">
// //       <div className="forgot-password-content">
// //         <h1>Forgot Password</h1>
// //         <p>Please enter your email address to reset your password.</p>
// //         <Form
// //           name="forgot-password-form"
// //           onFinish={onFinish}
// //           onFinishFailed={onFinishFailed}
// //         >
// //           <Form.Item
// //             name="email"
// //             rules={[
// //               {
// //                 required: true,
// //                 message: 'Please enter your email address!',
// //                 type: 'email',
// //               },
// //             ]}
// //           >
// //             <Input prefix={<MailOutlined />} placeholder="Email" />
// //           </Form.Item>

// //           <Form.Item>
// //             <Button
// //               type="primary"
// //               htmlType="submit"
// //               loading={loading}
// //               className="forgot-password-form-button"
// //             >
// //               Reset Password
// //             </Button>
// //           </Form.Item>
// //         </Form>
// //         <p>
// //           Remembered your password? <Link to="/sign-in">Sign In</Link>
// //         </p>
// //       </div>
// //     </Content>
// //   );
// // };

// // export default ForgotPassword;


import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Typography, Layout, Row, Col, Modal } from "antd";
import "./forgotPassword.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const { Title } = Typography;
const { Content, Footer } = Layout;

const ForgotPassword = () => {
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(""); // Define email state variable
  const history = useHistory("");
  const onFinish = async (values) => {
    try {
      const { email } = values;
      const response = await axios.post(
        "http://localhost:5000/api/forgot-password",
        { email }
      );  
      console.log("Login Successfully", response.data);
      setEmail(email); // Set email state variable
      setIsOtpModalVisible(true);
    } catch (error) {
      console.error("Error in forgot password:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOtpModalOk = () => {
    setIsOtpModalVisible(false);
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post (
        "http://localhost:5000/api/reset-password",
        { email, otp } // Use email and otp state variables
      );
      if (response.status === 201) {
        toast.success("OTP Verified Successfully");
      }
      history.push("/change-password");
      // Handle success, maybe redirect user or show a success message
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.error);
        }
      } else {
        console.error("Otp is not correct: ", error.message);
        toast.error("Otp is not correct");
      }
    }
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
            <Title className="mb-1">Forgot Password</Title>
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
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>

              <p className="font-semibold text-muted text-center">
                Already have an account?{" "}
                <Link to="/sign-in" className="font-bold text-dark">
                  Sign In
                </Link>
              </p>
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

      <Modal
        title="Enter OTP"
        visible={isOtpModalVisible}
        onOk={handleOtpModalOk}
        onCancel={handleOtpModalOk}
        footer={[
          <Button key="submit" onClick={handleOtpSubmit}>
            Submit
          </Button>,
        ]}
      >
        <p>
          Please enter the OTP received on your email to reset your password.
        </p>
        <Form.Item
          label="OTP"
          name="otp"
          rules={[{ required: true, message: "Please input the OTP!" }]}
        >
          <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
        </Form.Item>
      </Modal>
    </Layout>
  );
};

export default ForgotPassword;
