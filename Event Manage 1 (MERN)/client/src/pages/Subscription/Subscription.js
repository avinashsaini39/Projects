import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Select, Space } from 'antd';
import axios from 'axios';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editedSubscription, setEditedSubscription] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getallsubscription');
        setSubscriptions(response.data);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showEditModal = (subscription) => {
    setIsEditModalVisible(true);
    setEditedSubscription(subscription);
    form.setFieldsValue(subscription);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setEditedSubscription(null);
    form.resetFields();
  };

  const handleAdd = async (values) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + values.validity);

    try {
      const response = await axios.post('http://localhost:5000/api/createsubscription', { ...values, dateExpires: expirationDate });
      const newSubscription = response.data;
      message.success('Subscription added successfully!');
      form.resetFields();
      setIsModalVisible(false);
      setSubscriptions([...subscriptions, newSubscription]);
    } catch (error) {
      console.error('Error adding subscription:', error);
      message.error('Failed to add subscription. Please try again later.');
    }
  };

  const handleEdit = async (values) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + values.validity);

    try {
      const response = await axios.put(`http://localhost:5000/api/updatesubscription/${editedSubscription._id}`, { ...values, dateExpires: expirationDate });
      const updatedSubscription = response.data;
      message.success('Subscription updated successfully!');
      const updatedSubscriptions = subscriptions.map((subscription) => (subscription._id === updatedSubscription._id ? updatedSubscription : subscription));
      setSubscriptions(updatedSubscriptions);
      setIsEditModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error editing subscription:', error);
      message.error('Failed to edit subscription. Please try again later.');
    }
  };

  const handleDelete = async (subscriptionId) => {
    try {
      await axios.delete(`http://localhost:5000/api/deletesubscription/${subscriptionId}`);
      setSubscriptions((prevSubscriptions) => prevSubscriptions.filter((subscription) => subscription._id !== subscriptionId));
      message.success('Subscription deleted successfully!');
    } catch (error) {
      console.error('Error deleting subscription:', error);
      message.error('Failed to delete subscription. Please try again later.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handlePackageSelect = (packageType) => {
    let price, validity;
    switch (packageType) {
      case 'standard':
        price = 10;
        validity = 30;
        break;
      case 'pro':
        price = 50;
        validity = 180;
        break;
      case 'premium':
        price = 90;
        validity = 365;
        break;
      default:
        break;
    }
    form.setFieldsValue({ price, validity });
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Validity (Days)',
      dataIndex: 'validity',
      key: 'validity',
    },
    // {
    //   title: 'Expires In',
    //   dataIndex: 'dateExpires',
    //   key: 'dateExpires',
    //   render: (text) => {
    //     const date = new Date(text);
    //     const daysLeft = Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24));
    //     return `${daysLeft} days`;
    //   },
    // },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button type="link" onClick={() => showEditModal(record)} icon={<EditOutlined />} />
          <Popconfirm
            title="Are you sure to delete this subscription?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: '16px' }}>
        <Input.Search
          placeholder="Search by Name"
          style={{ width: 200, marginRight: 16 }}
          enterButton
        />
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
          Add
        </Button>
      </Space>
      <Table
        dataSource={subscriptions}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey={(record) => record._id}
      />

      <Modal title="Add Subscription" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="addSubscriptionForm"
          onFinish={handleAdd}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Package"
            name="packageType"
            rules={[{ required: true, message: 'Please select a package!' }]}
          >
            <Select onChange={handlePackageSelect}>
              <Option value="standard">Standard - 1 Month - $10</Option>
              <Option value="pro">Pro - 6 Months - $50</Option>
              <Option value="premium">Premium - 12 Months - $90</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Price" name="price" hidden>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Validity (Days)" name="validity" hidden>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Subscription
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Edit Subscription" visible={isEditModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="editSubscriptionForm"
          onFinish={handleEdit}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Package"
            name="packageType"
            rules={[{ required: true, message: 'Please select a package!' }]}
          >
            <Select onChange={handlePackageSelect}>
              <Option value="standard">Standard - 1 Month - $10</Option>
              <Option value="pro">Pro - 6 Months - $50</Option>
              <Option value="premium">Premium - 12 Months - $90</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Price" name="price" hidden>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Validity (Days)" name="validity" hidden>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Subscription
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubscriptionList;
























// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, message, Popconfirm, Select, Space } from 'antd';
// import axios from 'axios';
// import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// const { Option } = Select;

// const SubscriptionList = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   const [editedSubscription, setEditedSubscription] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/getallsubscription');
//         setSubscriptions(response.data);
//       } catch (error) {
//         console.error('Error fetching subscriptions:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const showEditModal = (subscription) => {
//     setIsEditModalVisible(true);
//     setEditedSubscription(subscription);
//     form.setFieldsValue(subscription);
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
//       const newSubscription = response.data;
//       message.success('Subscription added successfully!');
//       form.resetFields();
//       setIsModalVisible(false);
//       setSubscriptions([...subscriptions, newSubscription]);
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
//       const updatedSubscription = response.data;
//       message.success('Subscription updated successfully!');
//       const updatedSubscriptions = subscriptions.map((subscription) => (subscription._id === updatedSubscription._id ? updatedSubscription : subscription));
//       setSubscriptions(updatedSubscriptions);
//       setIsEditModalVisible(false);
//       form.resetFields();
//     } catch (error) {
//       console.error('Error editing subscription:', error);
//       message.error('Failed to edit subscription. Please try again later.');
//     }
//   };

//   const handleDelete = async (subscriptionId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/deletesubscription/${subscriptionId}`);
//       setSubscriptions((prevSubscriptions) => prevSubscriptions.filter((subscription) => subscription._id !== subscriptionId));
//       message.success('Subscription deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting subscription:', error);
//       message.error('Failed to delete subscription. Please try again later.');
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
//         <span>
//           <Button type="link" onClick={() => showEditModal(record)} icon={<EditOutlined />} />
//           <Popconfirm
//             title="Are you sure to delete this subscription?"
//             onConfirm={() => handleDelete(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button type="link" danger icon={<DeleteOutlined />} />
//           </Popconfirm>
//         </span>
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
//         dataSource={subscriptions}
//         columns={columns}
//         pagination={{ pageSize: 10 }}
//         rowKey={(record) => record._id}
//       />

//       <Modal title="Add Subscription" visible={isModalVisible} onCancel={handleCancel} footer={null}>
//         <Form
//           form={form}
//           name="addSubscriptionForm"
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
//             label="Price"
//             name="price"
//             rules={[{ required: true, message: 'Please input the price!' }]}
//           >
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item
//             label="Validity (Days)"
//             name="validity"
//             rules={[{ required: true, message: 'Please select the validity!' }]}
//           >
//             <Select>
//               <Option value={30}>30</Option>
//               <Option value={60}>60</Option>
//               <Option value={90}>90</Option>
//             </Select>
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
//               Add Subscription
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
//             label="Price"
//             name="price"
//             rules={[{ required: true, message: 'Please input the price!' }]}
//           >
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item
//             label="Validity (Days)"
//             name="validity"
//             rules={[{ required: true, message: 'Please select the validity!' }]}
//           >
//             <Select>
//               <Option value={30}>30</Option>
//               <Option value={60}>60</Option>
//               <Option value={90}>90</Option>
//             </Select>
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
//               Update Subscription
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default SubscriptionList;



























