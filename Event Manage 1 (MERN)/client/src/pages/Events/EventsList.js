import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, DatePicker, Select, Space, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './EventList.css'; // Import a custom CSS file for additional styling

const { RangePicker } = DatePicker;
const { Option } = Select;

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [speakers, setSpeakers] = useState([]);
  const [venues, setVenues] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editedEvent, setEditedEvent] = useState(null);

  useEffect(() => {
    fetchData(); // Fetch all data initially
  }, []);

  const fetchData = async () => {
    try {
      const [eventsResponse, speakersResponse, venuesResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/getallEvents'),
        axios.get('http://localhost:5000/api/getallspeakers'),
        axios.get('http://localhost:5000/api/venu/getAllVenues')
      ]);
      setEvents(eventsResponse.data);
      setSpeakers(speakersResponse.data);
      setVenues(venuesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showEditModal = (event) => {
    setIsEditModalVisible(true);
    setEditedEvent(event);

    // Set initial form values
    form.setFieldsValue({
      ...event,
      date: moment(event.date),
      time: moment(event.time),
      speaker: event.speaker ? event.speaker._id : null,
      venue: event.venue ? event.venue._id : null,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setEditedEvent(null);
    form.resetFields();
  };

  const handleAdd = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/createEvent', values);
      const newEvent = response.data;
      message.success('Event added successfully!');
      setIsModalVisible(false);
      form.resetFields();
      fetchData(); // Re-fetch the events to see the changes
    } catch (error) {
      console.error('Error adding event:', error);
      message.error('Failed to add event. Please try again later.');
    }
  };

  const handleEdit = async (values) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/updateEvent/${editedEvent._id}`, values);
      const updatedEvent = response.data;
      message.success('Event updated successfully!');
      setEvents(events.map(event => (event._id === updatedEvent._id ? updatedEvent : event)));
      setIsEditModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error editing event:', error);
      message.error('Failed to edit event. Please try again later.');
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteEvent/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
      message.success('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      message.error('Failed to delete event. Please try again later.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Subtitle',
      dataIndex: 'subtitle',
      key: 'subtitle',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: date => moment(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: time => moment(time).format('HH:mm'),
    },
    {
      title: 'Speaker',
      dataIndex: 'speaker',
      key: 'speaker',
      render: speaker => speaker ? speaker.name : 'No Speaker',
    },
    {
      title: 'Venue',
      dataIndex: 'venue',
      key: 'venue',
      render: venue => venue ? venue.venueName : 'No Venue',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => showEditModal(record)} icon={<EditOutlined />}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this event?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row justify="space-between" style={{ marginBottom: '16px' }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Input.Search
            placeholder="Search Events"
            style={{ width: '100%', marginBottom: '16px' }}
            enterButton
          />
        </Col>
        <Col>
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add Event Schedule
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={events}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey={(record) => record._id}
        scroll={{ x: 'max-content' }}
      />

      <Modal title="Add Event Schedule" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="addEventForm"
          onFinish={handleAdd}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Subtitle"
            name="subtitle"
            rules={[{ required: true, message: 'Please input the subtitle!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select the date!' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: 'Please select the time!' }]}
          >
            <DatePicker picker="time" />
          </Form.Item>

          <Form.Item
            label="Speaker"
            name="speaker"
            rules={[{ required: true, message: 'Please select the speaker!' }]}
          >
            <Select placeholder="Select a speaker">
              {speakers.map(speaker => (
                <Option key={speaker._id} value={speaker._id}>{speaker.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Venue"
            name="venue"
            rules={[{ required: true, message: 'Please select the venue!' }]}
          >
            <Select placeholder="Select a venue">
              {venues.map(venue => (
                <Option key={venue._id} value={venue._id}>{venue.venueName}</Option>
              ))}
            </Select>
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
              Add Event Schedule
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Edit Event" open={isEditModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="editEventForm"
          onFinish={handleEdit}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Subtitle"
            name="subtitle"
            rules={[{ required: true, message: 'Please input the subtitle!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select the date!' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: 'Please select the time!' }]}
          >
            <DatePicker picker="time" />
          </Form.Item>

          <Form.Item
            label="Speaker"
            name="speaker"
            rules={[{ required: true, message: 'Please select the speaker!' }]}
          >
            <Select placeholder="Select a speaker">
              {speakers.map(speaker => (
                <Option key={speaker._id} value={speaker._id}>{speaker.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Venue"
            name="venue"
            rules={[{ required: true, message: 'Please select the venue!' }]}
          >
            <Select placeholder="Select a venue">
              {venues.map(venue => (
                <Option key={venue._id} value={venue._id}>{venue.venueName}</Option>
              ))}
            </Select>
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
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventList;
