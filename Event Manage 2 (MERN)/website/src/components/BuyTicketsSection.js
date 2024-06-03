import React, { useState, useEffect } from 'react';
import { Carousel, Card, Button, Modal, Form, Input, Select } from 'antd';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const { Option } = Select;

const BuyTicketsSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState('');
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/getalltickets')
      .then(response => response.json())
      .then(data => setTickets(data))
      .catch(error => console.error('Error fetching tickets:', error));
  }, []);

  const handleBuyButtonClick = (ticketType) => {
    setSelectedTicketType(ticketType);
    setShowModal(true);
  };

  const handleSubmit = async (values) => {
    try {
      const formData = {
        name: values['your-name'],
        email: values['your-email'],
        ticketId: selectedTicketType,
      };
  
      console.log('Form submitted with data:', formData);
  
      await axios.post('http://localhost:5000/api/createsubscription', formData);
  
      setShowModal(false);
      toast.success('Subscription successful');
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Failed to subscribe. Please try again later.');
    }
  };
  

  return (
    <section id="buy-tickets" className="section-with-bg">
      <div className="container">
        <div className="section-header">
          <h2>Buy Subscription</h2>
          <p>Velit consequatur consequatur inventore iste fugit unde omnis eum aut.</p>
        </div>
        <Carousel arrows slidesToShow={3} slidesToScroll={3} dotPosition="top">
          {tickets.map(ticket => (
            <Card
              key={ticket.id}
              title={ticket.title}
              bordered={false}
              style={{ margin: '0 10px' }}
              actions={[
                <Button type="primary" onClick={() => handleBuyButtonClick(ticket.id)}>Buy Now</Button>
              ]}
            >
              <h6 className="card-price text-center">₹{ticket.price}</h6>
              <hr />
              <ul className="fa-ul">
                {ticket.features.map((feature, index) => (
                  <li key={index}><span className="fa-li"><i className="fa fa-check"></i></span>{feature}</li>
                ))}
              </ul>
            </Card>
          ))}
        </Carousel>
      </div>
      <Modal
        title="Buy Tickets"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
  <Form.Item name="your-name" rules={[{ required: true, message: 'Please enter your name' }]}>
    <Input placeholder="Your Name" />
  </Form.Item>
  <Form.Item name="your-email" rules={[{ required: true, message: 'Please enter your email' }]}>
    <Input placeholder="Your Email" />
  </Form.Item>
  <Form.Item name="ticket-type" rules={[{ required: false, message: 'Please select a ticket type' }]}>
    <Select
      placeholder="-- Select Your Ticket Type --"
      value={selectedTicketType}
      onChange={setSelectedTicketType}
    >
      {tickets.map(ticket => (
        <Option key={ticket.id} value={ticket.id}>{ticket.title} ({ticket.validity})</Option>
      ))}
    </Select>
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit" block>Buy Now</Button>
  </Form.Item>
</Form>

        <Toaster position="top-right" />
      </Modal>
    </section>
  );
};

export default BuyTicketsSection;











