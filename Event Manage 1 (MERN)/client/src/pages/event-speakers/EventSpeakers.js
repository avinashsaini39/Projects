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

const EventSpeakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editedSpeaker, setEditedSpeaker] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getallspeakers"
        );
        setSpeakers(response.data);
      } catch (error) {
        console.error("Error fetching speakers:", error);
      }
    };

    fetchData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showEditModal = (speaker) => {
    setIsEditModalVisible(true);
    setEditedSpeaker(speaker);
    form.setFieldsValue(speaker);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setEditedSpeaker(null);
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
        "http://localhost:5000/api/createspeaker",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);

      const newSpeaker = response.data;
      setSpeakers([...speakers, newSpeaker]);
      message.success("Speaker added successfully!");
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error adding speaker:", error);
      setLoading(false);
      message.error("Failed to add speaker. Please try again later.");
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
        `http://localhost:5000/api/updatespeakerbyid/${editedSpeaker._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);

      const updatedSpeaker = response.data;
      message.success("Speaker updated successfully!");
      const updatedSpeakers = speakers.map((speaker) =>
        speaker._id === updatedSpeaker._id ? updatedSpeaker : speaker
      );
      setSpeakers(updatedSpeakers);
      setIsEditModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error editing speaker:", error);
      setLoading(false);
      message.error("Failed to edit speaker. Please try again later.");
    }
  };

  const deleteUser = async (speakerId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/deletespeakerbyid/${speakerId}`
      );
      console.log(response);
      setSpeakers((prevSpeakers) =>
        prevSpeakers.filter((speaker) => speaker._id !== speakerId)
      );
      message.success("Speaker deleted successfully!");
    } catch (error) {
      console.error("Error deleting speaker:", error);
      message.error("Failed to delete speaker. Please try again later.");
    }
  };

  const toggleActive4 = async (speakerId, active) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/toggleactive4/${speakerId}`,
        { active: !active }
      );
      console.log(response);
      const updatedSpeaker = response.data;
      const updatedSpeakers = speakers.map((speaker) =>
        speaker._id === updatedSpeaker._id ? updatedSpeaker : speaker
      );
      setSpeakers(updatedSpeakers);
      message.success(
        `Speaker ${
          updatedSpeaker.active ? "activated" : "deactivated"
        } successfully!`
      );
    } catch (error) {
      console.error("Error toggling speaker active state:", error);
      message.error(
        "Failed to toggle speaker active state. Please try again later."
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
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (text, record) => (
        <Button onClick={() => toggleActive4(record._id, record.active)}>
          {record.active ? "Deactivate" : "Activate"}
        </Button>
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
            title="Are you sure to delete this speaker?"
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
        Add Speaker
      </Button>
      <Table columns={columns} dataSource={speakers} rowKey="_id" />
      <Modal
        title="Add Speaker"
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
              { required: true, message: "Please input the speaker name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: false, message: "Please input the speaker description!" },
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
              { required: true, message: "Please input the sponsor name!" },
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

export default EventSpeakers;
