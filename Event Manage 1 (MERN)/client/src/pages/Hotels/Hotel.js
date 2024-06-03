import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Upload,
  Space,
} from "antd";
import axios from "axios";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editedHotel, setEditedHotel] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getallhotels"
        );
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showEditModal = (hotel) => {
    setIsEditModalVisible(true);
    setEditedHotel(hotel);
    form.setFieldsValue(hotel);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setEditedHotel(null);
    form.resetFields();
  };

  const handleAdd = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("image", image);

      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/createhotel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);

      const newHotel = response.data;
      setHotels([...hotels, newHotel]);
      message.success("Hotel added successfully!");
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error adding hotel:", error);
      setLoading(false);
      message.error("Failed to add hotel. Please try again later.");
    }
  };

  const handleEdit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      if (image) {
        formData.append("image", image);
      }

      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/updatehotelbyid/${editedHotel._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);

      const updatedHotel = response.data;
      message.success("Hotel updated successfully!");
      const updatedHotels = hotels.map((hotel) =>
        hotel._id === updatedHotel._id ? updatedHotel : hotel
      );
      setHotels(updatedHotels);
      setIsEditModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error editing hotel:", error);
      setLoading(false);
      message.error("Failed to edit hotel. Please try again later.");
    }
  };

  const deleteUser = async (hotelId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/deletehotelbyid/${hotelId}`
      );
      console.log(response);
      setHotels((prevHotels) =>
        prevHotels.filter((hotel) => hotel._id !== hotelId)
      );
      message.success("Hotel deleted successfully!");
    } catch (error) {
      console.error("Error deleting hotel:", error);
      message.error("Failed to delete hotel. Please try again later.");
    }
  };

  

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Media",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={`http://localhost:5000/assets/${image}`} alt="Media" style={{ maxWidth: "100px" }} />
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          ></Button>
          <Popconfirm
            title="Are you sure to delete this hotel?"
            onConfirm={() => deleteUser(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        style={{ marginBottom: 16 }}
        icon={<PlusOutlined />}
      >
        Add Hotel
      </Button>
      <Table columns={columns} dataSource={hotels} rowKey="_id" />
      <Modal
        title="Add Hotel"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleAdd}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input the hotel name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: false, message: "Please input the hotel description!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            getValueFromEvent={(e) => {
              if (e.fileList && e.fileList.length > 0) {
                setImage(e.fileList[0].originFileObj); // Update the image state
              }
              return e && e.fileList;
            }}
          >
            <Upload maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Speaker"
        open={isEditModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleEdit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input the hotel name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            getValueFromEvent={(e) => {
              if (e.fileList && e.fileList.length > 0) {
                setImage(e.fileList[0].originFileObj); // Update the image state
              }
              return e && e.fileList;
            }}
          >
            <Upload maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload New Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Hotel;
