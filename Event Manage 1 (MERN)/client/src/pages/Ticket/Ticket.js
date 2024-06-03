import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Space, Typography, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getalltickets');
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteticket/${id}`);
      fetchTickets();
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/updateticket/${editId}`, values);
      } else {
        await axios.post('http://localhost:5000/api/createticket', values);
      }
      setIsEditing(false);
      setEditId(null);
      form.resetFields();
      setIsModalVisible(false);
      fetchTickets();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (ticket) => {
    form.setFieldsValue({
      title: ticket.title,
      price: ticket.price,
      validity: ticket.validity,
      features: ticket.features.join(', '), // Ensure features are displayed as a comma-separated string
    });
    setIsEditing(true);
    setEditId(ticket._id);
    setIsModalVisible(true);
  };

 

  const handleCancel = () => {
    setIsEditing(false);
    setEditId(null);
    form.resetFields();
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Validity',
      dataIndex: 'validity',
      key: 'validity',
    },
    {
      title: 'Features',
      dataIndex: 'features',
      key: 'features',
      render: (features) => features.join(', '), // Render features as a comma-separated string
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="admin-panel">
      <Title level={2}>Admin Panel</Title>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>Add Ticket</Button>
      <Modal
        title={isEditing ? 'Edit Ticket' : 'Add Ticket'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the title' }]}>
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the price' }]}>
            <Input type="number" placeholder="Price" />
          </Form.Item>
          <Form.Item name="validity" label="Validity" rules={[{ required: true, message: 'Please enter the validity' }]}>
            <Input placeholder="Validity" />
          </Form.Item>
          <Form.Item name="features" label="Features" rules={[{ required: true, message: 'Please enter the features' }]}>
            <Input placeholder="Features (comma separated)" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">{isEditing ? 'Update' : 'Add'} Ticket</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Title level={3}>Tickets</Title>
      <Table dataSource={tickets} columns={columns} rowKey="id" />
    </div>
  );
};

export default TicketList;
















// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, message, Popconfirm, Select, Space } from 'antd';
// import axios from 'axios';
// import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// const { Option } = Select;

// const TicketList = () => {
//   const [tickets, setTickets] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   const [editedSubscription, setEditedSubscription] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/getallsubscription');
//         setTickets(response.data);
//       } catch (error) {
//         console.error('Error fetching tickets:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const showEditModal = (ticket) => {
//     setIsEditModalVisible(true);
//     setEditedSubscription(ticket);
//     form.setFieldsValue(ticket);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setIsEditModalVisible(false);
//     setEditedSubscription(null);
//     form.resetFields();
//   };

//   const handleAdd = async (values) => {
//     const expirationDate = new Date();
//     expirationDate.setDate(expirationDate.getDate() + values.validity);

//     try {
//       const response = await axios.post('http://localhost:5000/api/createsubscription', { ...values, dateExpires: expirationDate });
//       const newTicket = response.data;
//       message.success('Subscription added successfully!');
//       form.resetFields();
//       setIsModalVisible(false);
//       setTickets([...tickets, newTicket]);
//     } catch (error) {
//       console.error('Error adding subscription:', error);
//       message.error('Failed to add subscription. Please try again later.');
//     }
//   };

//   const handleEdit = async (values) => {
//     const expirationDate = new Date();
//     expirationDate.setDate(expirationDate.getDate() + values.validity);

//     try {
//       const response = await axios.put(`http://localhost:5000/api/updatesubscription/${editedSubscription._id}`, { ...values, dateExpires: expirationDate });
//       const updatedTicket = response.data;
//       message.success('Subscription updated successfully!');
//       const updatedTickets = tickets.map((ticket) => (ticket._id === updatedTicket._id ? updatedTicket : ticket));
//       setTickets(updatedTickets);
//       setIsEditModalVisible(false);
//       form.resetFields();
//     } catch (error) {
//       console.error('Error editing ticket:', error);
//       message.error('Failed to edit ticket. Please try again later.');
//     }
//   };

//   const handleDelete = async (ticketId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/deletesubscription/${ticketId}`);
//       setTickets((prevTickets) => prevTickets.filter((ticket) => ticket._id !== ticketId));
//       message.success('Subscription deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting subscription:', error);
//       message.error('Failed to delete subscription. Please try again later.');
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

//   const handlePackageSelect = (packageType) => {
//     let price, validity;
//     switch (packageType) {
//       case 'standard':
//         price = 10;
//         validity = 30;
//         break;
//       case 'pro':
//         price = 50;
//         validity = 180;
//         break;
//       case 'premium':
//         price = 90;
//         validity = 365;
//         break;
//       default:
//         break;
//     }
//     form.setFieldsValue({ price, validity });
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
//       title: 'Price',
//       dataIndex: 'price',
//       key: 'price',
//     },
//     {
//       title: 'Validity (Days)',
//       dataIndex: 'validity',
//       key: 'validity',
//     },
//     {
//       title: 'Expires In',
//       dataIndex: 'dateExpires',
//       key: 'dateExpires',
//       render: (text) => {
//         const date = new Date(text);
//         const daysLeft = Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24));
//         return `${daysLeft} days`;
//       },
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (text, record) => (
//         <Space>
//           <Button type="link" onClick={() => showEditModal(record)} icon={<EditOutlined />} />
//           <Popconfirm
//             title="Are you sure to delete this subscription?"
//             onConfirm={() => handleDelete(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button type="link" danger icon={<DeleteOutlined />} />
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Space style={{ marginBottom: '16px' }}>
//         <Input.Search
//           placeholder="Search by Name"
//           style={{ width: 200, marginRight: 16 }}
//           enterButton
//         />
//         <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
//           Add
//         </Button>
//       </Space>
//       <Table
//         dataSource={tickets}
//         columns={columns}
//         pagination={{ pageSize: 10 }}
//         rowKey={(record) => record._id}
//       />

//       <Modal title="Add Ticket" visible={isModalVisible} onCancel={handleCancel} footer={null}>
//         <Form
//           form={form}
//           name="addTicketForm"
//           onFinish={handleAdd}
//           onFinishFailed={onFinishFailed}
//         >
//           <Form.Item
//             label="Name"
//             name="name"
//             rules={[{ required: true, message: 'Please input the name!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[{ required: true, message: 'Please input the email!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Package"
//             name="packageType"
//             rules={[{ required: true, message: 'Please select a package!' }]}
//           >
//             <Select onChange={handlePackageSelect}>
//               <Option value="standard">Standard - 1 Month - $10</Option>
//               <Option value="pro">Pro - 6 Months - $50</Option>
//               <Option value="premium">Premium - 12 Months - $90</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item label="Price" name="price" hidden>
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item label="Validity (Days)" name="validity" hidden>
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item
//             label="Description"
//             name="description"
//             rules={[{ required: true, message: 'Please input the description!' }]}
//           >
//             <Input.TextArea />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Add Ticket
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       <Modal title="Edit Subscription" visible={isEditModalVisible} onCancel={handleCancel} footer={null}>
//         <Form
//           form={form}
//           name="editSubscriptionForm"
//           onFinish={handleEdit}
//           onFinishFailed={onFinishFailed}
//         >
//           <Form.Item
//             label="Name"
//             name="name"
//             rules={[{ required: true, message: 'Please input the name!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[{ required: true, message: 'Please input the email!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Package"
//             name="packageType"
//             rules={[{ required: true, message: 'Please select a package!' }]}
//           >
//             <Select onChange={handlePackageSelect}>
//               <Option value="standard">Standard - 1 Month - $10</Option>
//               <Option value="pro">Pro - 6 Months - $50</Option>
//               <Option value="premium">Premium - 12 Months - $90</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item label="Price" name="price" hidden>
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item label="Validity (Days)" name="validity" hidden>
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item
//             label="Description"
//             name="description"
//             rules={[{ required: true, message: 'Please input the description!' }]}
//           >
//             <Input.TextArea />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Update Ticket
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default TicketList;

