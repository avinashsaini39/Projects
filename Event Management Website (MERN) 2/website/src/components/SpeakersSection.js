import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'; // Ensure path is correct

const SpeakersSection = () => {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/getallspeakers')
      .then(response => {
        setSpeakers(response.data);
      })
      .catch(error => {
        console.error('Error fetching speakers:', error);
      });
  }, []);

  return (
    <section id="speakers">
      <div className="container">
        <div className="section-header">
          <h2>Event Speakers</h2>
          <p>Here are some of our speakers</p>
        </div>

        <div className="row">
          {speakers.map(speaker => (
            <div key={speaker._id} className="col-lg-4 col-md-6">
              <div className="speaker">
                <img src={`http://localhost:5000/assets/${speaker.image}`} alt={speaker.name} className="img-fluid" />
                <div className="details">
                  <h3>{speaker.name}</h3>
                  <p>{speaker.description}</p>
                  {/* You can add more details or links here as needed */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SpeakersSection;
