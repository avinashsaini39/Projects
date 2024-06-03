import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, message } from 'antd';

const { Meta } = Card;

const Venue = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/venu/getactivevenues');
        setVenues(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching venues:', error);
        message.error('Failed to fetch venues. Please try again later.');
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  return (
    <section id="venue" style={{ padding: '50px 0' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2>Event Venue</h2>
          <p>Event venue location info and gallery</p>
        </div>
        <Row justify="center" gutter={[16, 16]}>
          {venues.map((venue) => (
            <Col key={venue._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<img alt={venue.venueName} src={`http://localhost:5000/assets/${venue.image}`} />}
              >
                <Meta
                  title={venue.venueName}
                  description={
                    <div>
                      <p><b>Location:</b> {venue.location}</p>
                      <p><b>Description:</b> {venue.description}</p>
                      <p><b>Price:</b> ${venue.price}</p>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Venue;
