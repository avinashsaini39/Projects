

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space ,Switch} from 'antd';
import axios from 'axios';
import { EditOutlined, DeleteOutlined, PlusOutlined , SearchOutlined } from '@ant-design/icons'; // Import Ant Design icons

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // Define isEditModalVisible state
  
  const [form] = Form.useForm();
  const [editedVendor, setEditedVendor] = useState(null); // To store the currently edited vendor
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'inactive'


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (status) => {
    try {
      const url = status ? `http://localhost:5000/api/getallvendors?status=${status}` : 'http://localhost:5000/api/getallvendors';
      const response = await axios.get(url);
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);    
    }
  };
  
  const toggleVendorStatus = async (vendorId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    console.log('Current status:', currentStatus);
    console.log('New status:', newStatus);
    try {
      // Update the status of the vendor
      await axios.put(`http://localhost:5000/api/updatevendorbyid/${vendorId}`, { status: newStatus });
      message.success(`Vendor status changed to ${newStatus}`, { position: 'top-right' });
      
      // Update the local state to reflect the status change
      setVendors(prevVendors =>
        prevVendors.map(vendor =>
          vendor._id === vendorId ? { ...vendor, status: newStatus } : vendor
        )
      );
    } catch (error) {
      console.error('Error toggling vendor status:', error);
      message.error('Failed to toggle vendor status. Please try again later.');
    }
  };
    

  const fetchVendors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getallvendors');
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


 
  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
    if (!emailRegex.test(value)) {
      return Promise.reject(new Error('Please enter a valid email address'));
    }
    return Promise.resolve();
  };
  
  const showEditModal = (vendor) => {
    setIsEditModalVisible(true); // Set isEditModalVisible to true
    setEditedVendor(vendor);
    form.setFieldsValue(vendor); // Populate the form fields with vendor data
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setEditedVendor(null);
    form.resetFields();
  };

  const handleAdd = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/createvendor', values);
      const newVendor = response.data;
      message.success('Vendor added successfully!');
      form.resetFields();
      setIsModalVisible(false);
      // setVendors([...vendors, newVendor]); // Update state with new vendor entry
      fetchVendors(); // Fetch updated users after adding a new user

    } catch (error) {
      console.error('Error adding vendor:', error);
      message.error('Failed to add vendor. Please try again later.');
    }
  };

  const handleEdit = async (values) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/updatevendorbyid/${editedVendor._id}`, values);
      const updatedVendor = response.data;
      message.success('Vendor updated successfully!');
      // const updatedVendors = vendors.map((vendor) => (vendor._id === updatedVendor._id ? updatedVendor : vendor));
      // setVendors(updatedVendors);
      setIsEditModalVisible(false);
      form.resetFields();
      fetchVendors(); // Fetch updated users after adding a new user

    } catch (error) {
      console.error('Error editing vendor:', error);
      message.error('Failed to edit vendor. Please try again later.');
    }
  };

  const deleteUser = async (vendorId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/deletevendorbyid/${vendorId}`);
      console.log(response);
      // Update state to remove deleted vendor
      setVendors((prevVendors) => prevVendors.filter((vendor) => vendor._id !== vendorId));
      message.success('Vendor deleted successfully!');
    } catch (error) {
      console.error('Error deleting vendor:', error);
      message.error('Failed to delete vendor. Please try again later.');
    }
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone No.',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Button
          type={record.status === 'active' ? 'primary' : 'default'}
          onClick={() => toggleVendorStatus(record._id, record.status)}
        >
          {record.status === 'active' ? 'Active' : 'Inactive'}
        </Button>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button type="link" onClick={() => showEditModal(record)} icon={<EditOutlined />}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this vendor?"
            onConfirm={() => deleteUser(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: '16px' }}>
      <div style={{  }}>
  <Input.Search
    placeholder="Search vendors"
    style={{ width: 200, marginRight: 16 , width:"23rem" }}
    enterButton
  />
  {/* <Button type="primary" icon={<SearchOutlined />} /> */}
</div>

        {/* <Button type="primary" onClick={showModal} icon={<PlusOutlined />} >
          Add
        </Button> */}
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />} >Add</Button>
        
      </Space>
      <Table
        dataSource={vendors}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey={(record) => record._id} // Use record._id as the row key
      />

      <Modal title="Add Vendor" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="addVendorForm"
          onFinish={handleAdd}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input placeholder='Enter Your Name'/>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the email!' },
            { validator: validateEmail }

          ]}
          >
            <Input placeholder='Enter Your Email'/>
          </Form.Item>

          <Form.Item
            label="Phone No."
            name="phone"
            rules={[{ required: true, message: 'Please input the phone number!' },
            { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number' } // Add pattern validation

          ]}
          >                                         
            <Input placeholder='Enter Your Phone No.'/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Vendor
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Edit Vendor" visible={isEditModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="editVendorForm"
          onFinish={handleEdit}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input placeholder='Enter Your Name'/>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input placeholder='Enter Your Email'/>
          </Form.Item>

          <Form.Item
            label="Phone No."
            name="phone"
            rules={[{ required: true, message: 'Please input the phone number!' }]}
          >                                         
            <Input placeholder='Enter Your Phone No.'/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Vendor
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VendorList;

