import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Select , Space } from 'antd';
import axios from 'axios';
import { EditOutlined, DeleteOutlined,PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editedTransaction, setEditedTransaction] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getAllTransactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchData(); 
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showEditModal = (transaction) => {
    setIsEditModalVisible(true);
    setEditedTransaction(transaction);
    form.setFieldsValue(transaction);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setEditedTransaction(null);
    form.resetFields();
  };

  const handleAdd = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/createTransaction', values);
      const newTransaction = response.data;
      message.success('Transaction added successfully!');
      form.resetFields();
      setIsModalVisible(false);
      setTransactions([...transactions, newTransaction]);
    } catch (error) {
      console.error('Error adding transaction:', error);
      message.error('Failed to add transaction. Please try again later.');
    }
  };

  const handleEdit = async (values) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/updateTransaction/${editedTransaction._id}`, values);
      const updatedTransaction = response.data;
      message.success('Transaction updated successfully!');
      const updatedTransactions = transactions.map((transaction) => (transaction._id === updatedTransaction._id ? updatedTransaction : transaction));
      setTransactions(updatedTransactions);
      setIsEditModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error editing transaction:', error);
      message.error('Failed to edit transaction. Please try again later.');
    }
  };

  const handleDelete = async (transactionId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/deleteTransaction/${transactionId}`);
      console.log(response);
      setTransactions((prevTransactions) => prevTransactions.filter((transaction) => transaction._id !== transactionId));
      message.success('Transaction deleted successfully!');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      message.error('Failed to delete transaction. Please try again later.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'transactionID',
      key: 'transactionID',
    },
    {
      title: 'Date/Time',
      dataIndex: 'transactionDateTime',
      key: 'transactionDateTime',
    },
    {
      title: 'Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => showEditModal(record)} icon={<EditOutlined />}></Button>
          <Popconfirm
            title="Are you sure to delete this transaction?"
            onConfirm={() => handleDelete(record.transactionID)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}></Button>
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
    placeholder="Search Vendors"
    style={{ width: 200, marginRight: 16 , width:"23rem" }}
    enterButton
  />
  {/* <Button type="primary" icon={<SearchOutlined />} /> */}
</div>

        <Button type="primary" onClick={showModal} icon={<PlusOutlined />} >
          Add
        </Button>
        
      </Space>      <Table
        dataSource={transactions}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey={(record) => record.transactionID}
      />

      <Modal title="Add Transaction" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="addTransactionForm"
          onFinish={handleAdd}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Transaction ID"
            name="transactionID"
            rules={[{ required: true, message: 'Please input the transaction ID!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date/Time"
            name="transactionDateTime"
            rules={[{ required: true, message: 'Please input the date/time!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Type"
            name="transactionType"
            rules={[{ required: true, message: 'Please input the type!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please input the amount!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Payment Method"
            name="paymentMethod"
            rules={[{ required: true, message: 'Please input the payment method!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please input the status!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Add Transaction</Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Edit Transaction" visible={isEditModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="editTransactionForm"
          onFinish={handleEdit}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Transaction ID"
            name="transactionID"
            rules={[{ required: true, message: 'Please input the transaction ID!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date/Time"
            name="transactionDateTime"
            rules={[{ required: true, message: 'Please input the date/time!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Type"
            name="transactionType"
            rules={[{ required: true, message: 'Please input the type!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please input the amount!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Payment Method"
            name="paymentMethod"
            rules={[{ required: true, message: 'Please input the payment method!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please input the status!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Update Transaction</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TransactionList;
