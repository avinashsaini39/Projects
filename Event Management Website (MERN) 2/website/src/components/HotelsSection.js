import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HotelsSection = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/getallhotels')
      .then(response => {
        setHotels(response.data);
      })
      .catch(error => {
        console.error('Error fetching hotels:', error);
      });
  }, []);

  return (
    <section id="hotels" className="section-with-bg">
      <div className="container">
        <div className="section-header">
          <h2>Hotels</h2>
          <p>Here are some nearby hotels</p>
        </div>

        <div className="row">
          {hotels.map(hotel => (
            <div key={hotel._id} className="col-lg-4 col-md-6">
              <div className="hotel">
                <div className="hotel-img">
                  <img src={`http://localhost:5000/assets/${hotel.image}`} alt={hotel.name} className="img-fluid" />
                </div>
                <h3><a href="#">{hotel.name}</a></h3>
                <div className="stars">
                  {[...Array(5).keys()].map(i => (
                    <i key={i} className={`fa fa-star${i < hotel.stars ? '' : '-o'}`}></i>
                  ))}
                </div>
                <p>{hotel.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HotelsSection;
