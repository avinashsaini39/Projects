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

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editedVenue, setEditedVenue] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/venu/getallvenues"
        );
        setVenues(response.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showEditModal = (venue) => {
    setIsEditModalVisible(true);
    setEditedVenue(venue);
    form.setFieldsValue(venue);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setEditedVenue(null);
    form.resetFields();
  };

  const handleAdd = async (values) => {
    try {
      const formData = new FormData();
      formData.append("venueName", values.venueName);
      formData.append("location", values.location);
      formData.append("capacity", values.capacity);
      formData.append("image", image);
      formData.append("price", values.price);
      formData.append("description", values.description);

      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/venu/createvenue",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);

      const newVenue = response.data;
      setVenues([...venues, newVenue]);
      message.success("Venue added successfully!");
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error adding venue:", error);
      setLoading(false);
      message.error("Failed to add venue. Please try again later.");
    }
  };

  const handleEdit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("venueName", values.venueName);
      formData.append("location", values.location);
      formData.append("capacity", values.capacity);
      if (image) {
        formData.append("image", image);
      }
      formData.append("price", values.price);
      formData.append("description", values.description);

      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/venu/updatevenuesbyid/${editedVenue._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);

      const updatedVenue = response.data;
      message.success("Venue updated successfully!");
      const updatedVenues = venues.map((venue) =>
        venue._id === updatedVenue._id ? updatedVenue : venue
      );
      setVenues(updatedVenues);
      setIsEditModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error editing Venue:", error);
      setLoading(false);
      message.error("Failed to edit venue. Please try again later.");
    }
  };

  const deleteVenue = async (venueId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/venu/deletevenuesbyid/${venueId}`
      );
      console.log(response);
      setVenues((prevVenues) =>
        prevVenues.filter((venue) => venue._id !== venueId)
      );
      message.success("Venue deleted successfully!");
    } catch (error) {
      console.error("Error deleting venue:", error);
      message.error("Failed to delete venue. Please try again later.");
    }
  };

  const toggleActive1 = async (venueId, active) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/venu/toggleactive2/${venueId}`,
        { active: !active }
      );
      console.log(response);
      const updatedVenue = response.data;
      const updatedVenues = venues.map((venue) =>
        venue._id === updatedVenue._id ? updatedVenue : venue
      );
      setVenues(updatedVenues);
      message.success(
        `Venue ${
          updatedVenue.active ? "activated" : "deactivated"
        } successfully!`
      );
    } catch (error) {
      console.error("Error toggling venue active state:", error);
      message.error(
        "Failed to toggle venue active state. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const columns = [
    {
      title: "Venue Name",
      dataIndex: "venueName",
      key: "venueName",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
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
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (text, record) => (
        <Button onClick={() => toggleActive1(record._id, record.active)}>
          {record.active ? "Deactivate" : "Activate"}
        </Button>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
            title="Are you sure to delete this Venue?"
            onConfirm={() => deleteVenue(record._id)}
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
        Add Venue
      </Button>
      <Table columns={columns} dataSource={venues} rowKey="_id" />
      <Modal
        title="Add Venue"
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
            label="Venue Name"
            name="venueName"
            rules={[
              { required: true, message: "Please input the venue name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[
              { required: true, message: "Please input the location!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[
              { required: true, message: "Please input the capacity!" },
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
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please input the price!" },
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

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Venue"
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
            label="Venue Name"
            name="venueName"
            rules={[
              { required: true, message: "Please input the venue name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[
              { required: true, message: "Please input the location!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[
              { required: true, message: "Please input the capacity!" },
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
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please input the price!" },
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

export default VenueList;
