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

const SponsorList = () => {
  const [sponsors, setSponsors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editedSponsor, setEditedSponsor] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getallsponsors"
        );
        setSponsors(response.data);
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      }
    };

    fetchData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showEditModal = (sponsor) => {
    setIsEditModalVisible(true);
    setEditedSponsor(sponsor);
    form.setFieldsValue(sponsor);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setEditedSponsor(null);
    form.resetFields();
  };

  const handleAdd = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", image);

      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/createsponsor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);

      const newSponsor = response.data;
      setSponsors([...sponsors, newSponsor]);
      message.success("Sponsor added successfully!");
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error adding sponsor:", error);
      setLoading(false);
      message.error("Failed to add sponsor. Please try again later.");
    }
  };

  const handleEdit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      if (image) {
        formData.append("image", image);
      }

      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/updatesponsorbyid/${editedSponsor._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);

      const updatedSponsor = response.data;
      message.success("Sponsor updated successfully!");
      const updatedSponsors = sponsors.map((sponsor) =>
        sponsor._id === updatedSponsor._id ? updatedSponsor : sponsor
      );
      setSponsors(updatedSponsors);
      setIsEditModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error editing sponsor:", error);
      setLoading(false);
      message.error("Failed to edit sponsor. Please try again later.");
    }
  };

  const deleteUser = async (sponsorId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/deletesponsorbyid/${sponsorId}`
      );
      console.log(response);
      setSponsors((prevSponsors) =>
        prevSponsors.filter((sponsor) => sponsor._id !== sponsorId)
      );
      message.success("Sponsor deleted successfully!");
    } catch (error) {
      console.error("Error deleting sponsor:", error);
      message.error("Failed to delete sponsor. Please try again later.");
    }
  };

  const toggleActive1 = async (sponsorId, active) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/toggleactive1/${sponsorId}`,
        { active: !active }
      );
      console.log(response);
      const updatedSponsor = response.data;
      const updatedSponsors = sponsors.map((sponsor) =>
        sponsor._id === updatedSponsor._id ? updatedSponsor : sponsor
      );
      setSponsors(updatedSponsors);
      message.success(
        `Sponsor ${
          updatedSponsor.active ? "activated" : "deactivated"
        } successfully!`
      );
    } catch (error) {
      console.error("Error toggling sponsor active state:", error);
      message.error(
        "Failed to toggle sponsor active state. Please try again later."
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
        <Button onClick={() => toggleActive1(record._id, record.active)}>
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
            title="Are you sure to delete this sponsor?"
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
        Add Sponsor
      </Button>
      <Table columns={columns} dataSource={sponsors} rowKey="_id" />
      <Modal
        title="Add Sponsor"
        visible={isModalVisible}
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
              { required: true, message: "Please input the sponsor name!" },
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
        title="Edit Sponsor"
        visible={isEditModalVisible}
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

export default SponsorList;
