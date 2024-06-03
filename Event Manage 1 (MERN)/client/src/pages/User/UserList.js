// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, message, Popconfirm ,Space} from 'antd';
// import axios from 'axios';
// import { EditOutlined, DeleteOutlined  ,PlusOutlined } from '@ant-design/icons'; // Import Ant Design icons
// // import { Switch } from 'antd'; // Import Switch component from Ant Design


// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [filter, setFilter] = useState('all'); // 'all', 'active', 'inactive'

//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false); // Define isEditModalVisible state
  
//   const [form] = Form.useForm();
//   const [editedUser, setEditedUser] = useState(null); // To store the currently edited user

//   useEffect(() => {
//     fetchData(); // Fetch all users initially
//   }, [filter]);


//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await axios.get('http://localhost:5000/api/getall');
//   //       setUsers(response.data);
//   //     } catch (error) {
//   //       console.error('Error fetching users:', error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []); // Empty dependency array to run once when the component mounts

//   const fetchData = async (status) => {
//     try {
//       const url = status ? `http://localhost:5000/api/getall?status=${status}` : 'http://localhost:5000/api/getall';
//       const response = await axios.get(url);
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };
//   const toggleStatus = async (userId, currentStatus) => {
//     const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
//     try {
//       await axios.put(`http://localhost:5000/api/update/${userId}`, { status: newStatus });
//       message.success(`User status changed to ${newStatus}`, { position: 'top-right' });
//       fetchData(filter); // Refresh user list after status change
//     } catch (error) {
//       console.error('Error toggling status:', error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/getall');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const validateEmail = (_, value) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
//     if (!emailRegex.test(value)) {
//       return Promise.reject(new Error('Please enter a valid email address'));
//     }
//     return Promise.resolve();
//   };
//   const showEditModal = (user) => {
//     setIsEditModalVisible(true); // Set isEditModalVisible to true
//     setEditedUser(user);
//     form.setFieldsValue(user); // Populate the form fields with user data
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setIsEditModalVisible(false);
//     setEditedUser(null);
//     form.resetFields();
//   };

//   const handleAdd = async (values) => {
//     try {
//       const response = await axios.post ('http://localhost:5000/api/create', values);
//       const newUser = response.data;
//       message.success('User added successfully!');
//       users.unshift(newUser);

//       form.resetFields();
//       setIsModalVisible(false);

//       fetchUsers(); // Fetch updated users after adding a new user
//     } catch (error) {
//       console.error('Error adding user:', error);
//       message.error('Failed to add user. Please try again later.');
//     }
//   };

//   const handleEdit = async (values) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/update/${editedUser._id}`, values);
//       const updatedUser = response.data;
//       message.success('User updated successfully!');
//       setIsEditModalVisible(false);
//       form.resetFields();
//       fetchUsers(); // Fetch updated users after editing a user
//     } catch (error) {
//       console.error('Error editing user:', error);
//       message.error('Failed to edit user. Please try again later.');
//     }
//   };

//   const deleteUser = async (userId) => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/api/delete/${userId}`);
//       console.log(response);
//       // Update state to remove deleted user
//       setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
//       message.success('User deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       message.error('Failed to delete user. Please try again later.');
//     }
//   };
//   const handleStatusChange = async (userId, checked) => {
//     const newStatus = checked ? 'active' : 'inactive';
//     try {
//       const response = await axios.put(`http://localhost:5000/api/users/${userId}/${newStatus}`);
//       message.success(`User ${newStatus} successfully!`);
//       fetchUsers(); // Fetch updated users after changing status
//     } catch (error) {
//       console.error(`Error changing user status:`, error);
//       message.error(`Failed to change user status. Please try again later.`);
//     }
//   };
  
//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//     },
//     {
//       title: 'Phone No.',
//       dataIndex: 'phone',
//       key: 'phone',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (text, record) => (
//         <Button
//           type={record.status === 'active' ? 'primary' : 'default'}
//           onClick={() => toggleStatus(record._id, record.status)}
//         >
//           {record.status === 'active' ? 'Active' : 'Inactive'}
//         </Button>
//       ),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (text, record) => (
//         <span>
//           <Button type="link" onClick={() => showEditModal(record)} icon={<EditOutlined />}>Edit</Button>
//           <Popconfirm
//             title="Are you sure to delete this user?"
//             onConfirm={() => deleteUser(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button type="link" danger icon={<DeleteOutlined />}>Delete</Button>
//           </Popconfirm>
//         </span>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Space style={{ marginBottom: '16px' }}>
//       <div style={{  }}>
//   <Input.Search
//     placeholder="Search Users"
//     style={{ width: 200, marginRight: 16 , width:"23rem" }}
//     enterButton
//   />
//   {/* <Button type="primary" icon={<SearchOutlined />} /> */}
// </div>

//         <Button type="primary" onClick={showModal} icon={<PlusOutlined />} style={{ marginLeft: '45rem' }}>
//           Add
//         </Button>
        
//       </Space>
//       <Table
//         dataSource={users}
//         columns={columns}
//         pagination={{ pageSize: 10 }}
//         rowKey={(record) => record._id} // Use record._id as the row key
//       />

//       <Modal title="Add User" visible={isModalVisible} onCancel={handleCancel} footer={null}>
//         <Form
//           form={form}
//           name="addUserForm"
//           onFinish={handleAdd}
//           onFinishFailed={onFinishFailed}
//         >
//           <Form.Item
//             label="Name"
//             name="name"
//             // placeholder="Please enter your name"
//             rules={[{ required: true, message: 'Please input the name!' }]}
//           >
//             <Input placeholder='Please Enter Your Name'/>
//           </Form.Item>

//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[{ required: true, message: 'Please input the email!' },
//             { validator: validateEmail }]}
//           >
//             <Input placeholder='Please Enter Your Email'/>
//           </Form.Item>

//           <Form.Item
//             label="Phone No."
//             name="phone"
//             rules={[{ required: true, message: 'Please input the phone number!' },
//             { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number' } // Add pattern validation
//           ]}
//           >                                         
//             <Input placeholder='Please Enter Your Phoneno.'/>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Add User
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       <Modal title="Edit User" visible={isEditModalVisible} onCancel={handleCancel} footer={null}>
//         <Form
//           form={form}
//           name="editUserForm"
//           onFinish={handleEdit}
//           onFinishFailed={onFinishFailed}
//         >
//           <Form.Item
//             label="Name"
//             name="name"
//             rules={[{ required: true, message: 'Please input the name!' }]}
//           >
//             <Input placeholder='Please Enter Your Name'/>
//           </Form.Item>

//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[{ required: true, message: 'Please input the email!' }]}
//           >
//             <Input placeholder='Please Enter Your Email'/>
//           </Form.Item>

//           <Form.Item
//             label="Phone No."
//             name="phone"
//             rules={[{ required: true, message: 'Please input the phone number!' }]}
//           >                                         
//             <Input placeholder='Please Enter Your Phoneno.'/>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Update User
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default UserList;


import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space, Select } from 'antd';
import axios from 'axios';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const url = filter === 'all' ? 'http://localhost:5000/api/getall' : `http://localhost:5000/api/getall?status=${filter}`;
      const response = await axios.get(url);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await axios.put(`http://localhost:5000/api/update/${userId}`, { status: newStatus });
      message.success(`User status changed to ${newStatus}`, { position: 'top-right' });
      fetchData();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return Promise.reject(new Error('Please enter a valid email address'));
    }
    return Promise.resolve();
  };

  const showEditModal = (user) => {
    setIsEditModalVisible(true);
    setEditedUser(user);
    form.setFieldsValue(user);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setEditedUser(null);
    form.resetFields();
  };

  const handleAdd = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/create', values);
      const newUser = response.data;
      message.success('User added successfully!');
      form.resetFields();
      setIsModalVisible(false);
      fetchData();
    } catch (error) {
      console.error('Error adding user:', error);
      message.error('Failed to add user. Please try again later.');
    }
  };

  const handleEdit = async (values) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/update/${editedUser._id}`, values);
      const updatedUser = response.data;
      message.success('User updated successfully!');
      setIsEditModalVisible(false);
      form.resetFields();
      fetchData();
    } catch (error) {
      console.error('Error editing user:', error);
      message.error('Failed to edit user. Please try again later.');
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/delete/${userId}`);
      console.log(response);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      message.success('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('Failed to delete user. Please try again later.');
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
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
          onClick={() => toggleStatus(record._id, record.status)}
        >
          {record.status === 'active' ? 'Active' : 'Inactive'}
        </Button>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => showEditModal(record)} icon={<EditOutlined />}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => deleteUser(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: '16px' }}>
        <div style={{  }}>
          <Input.Search
            placeholder="Search Users"
            style={{ width: 200, marginRight: 16 , width:"23rem" }}
            enterButton
          />
        </div>
        <Select defaultValue="all" style={{ width: 120 }} onChange={handleFilterChange}>
          <Option value="all">All</Option>
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />} style={{ marginLeft: '1rem' }}>
          Add
        </Button>
      </Space>
      <Table
        dataSource={users}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey={(record) => record._id}
      />
      <Modal title="Add User" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="addUserForm"
          onFinish={handleAdd}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input placeholder='Please Enter Your Name'/>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the email!' }, { validator: validateEmail }]}
          >
            <Input placeholder='Please Enter Your Email'/>
          </Form.Item>
          <Form.Item
            label="Phone No."
            name="phone"
            rules={[{ required: true, message: 'Please input the phone number!' }, { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number' }]}
          >                                         
            <Input placeholder='Please Enter Your Phoneno.'/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Edit User" visible={isEditModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="editUserForm"
          onFinish={handleEdit}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input placeholder='Please Enter Your Name'/>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input placeholder='Please Enter Your Email'/>
          </Form.Item>
          <Form.Item
            label="Phone No."
            name="phone"
            rules={[{ required: true, message: 'Please input the phone number!' }]}
          >                                         
            <Input placeholder='Please Enter Your Phoneno.'/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
