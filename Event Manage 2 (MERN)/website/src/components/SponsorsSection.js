import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Button, Row, Col } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './SponsorSection.css';  // Import a custom CSS file for additional styles

const SponsorsSection = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getallsponsors');
        setSponsors(response.data);
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      }
    };

    fetchSponsors();
  }, []);

  const chunkSponsors = (array, size) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  };

  const renderCarouselSlides = () => {
    const groupedSponsors = chunkSponsors(sponsors, 3);
    return groupedSponsors.map((group, index) => (
      <div key={index}>
        <Row gutter={[16, 16]} justify="center" align="middle">
          {group.map((sponsor, idx) => (
            <Col xs={24} sm={12} md={8} key={idx}>
              <div className="sponsor-logo">
                <img
                  src={`http://localhost:5000/assets/${sponsor.image}`}
                  className="img-fluid"
                  alt={`Sponsor ${sponsor.name}`}
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    ));
  };

  const PrevArrow = ({ onClick }) => (
    <Button type="primary" shape="circle" icon={<LeftOutlined />} onClick={onClick} className="carousel-arrow left-arrow" />
  );

  const NextArrow = ({ onClick }) => (
    <Button type="primary" shape="circle" icon={<RightOutlined />} onClick={onClick} className="carousel-arrow right-arrow" />
  );

  return (
    <section id="sponsors" className="section-with-bg">
      <div className="container">
        <div className="section-header">
          <h2>Sponsors</h2>
        </div>
        <Carousel arrows prevArrow={<PrevArrow />} nextArrow={<NextArrow />} autoplay>
          {renderCarouselSlides()}
        </Carousel>
      </div>
    </section>
  );
};

export default SponsorsSection;
