import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventSchedule = () => {
  const [activeDay, setActiveDay] = useState('day-1');
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/getallEvents')
      .then(response => {
        setScheduleData(response.data);
      })
      .catch(error => {
        console.error('Error fetching schedule:', error);
      });
  }, []);

  const handleTabClick = (day) => {
    setActiveDay(day);
  };

  const renderScheduleItems = (items) => {
    return items.map((item, index) => (
      <div key={index} className="row schedule-item" style={{ marginBottom: '16px' }}>
        <div className="col-md-2" style={{ textAlign: 'center', paddingRight: '8px' }}>
          <time style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </time>
        </div>
        <div className="col-md-10" style={{ display: 'flex', flexDirection: 'column' }}>
          {item.speaker && item.speaker.image && (
            <div className="speaker" style={{ marginBottom: '8px' }}>
              <img
                src={`http://localhost:5000/assets/${item.speaker.image}`}
                alt={item.speaker.name}
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                onError={(e) => {
                  e.target.onerror = null; // prevents looping
                  e.target.src = 'default-speaker.jpg'; // fallback image if original image fails to load
                }}
              />
            </div>
          )}
          <h4>{item.title} {item.speaker && <span>{item.speaker.name}</span>}</h4>
          <p>{item.description}</p>
        </div>
      </div>
    ));
  };

  const filterEventsByDay = (day) => {
    const date = new Date();
    date.setDate(date.getDate() + (parseInt(day.split('-')[1]) - 1));
    const dayString = date.toISOString().split('T')[0];
    return scheduleData.filter(event => event.date.startsWith(dayString));
  };

  const getFormattedDate = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().split('T')[0];
  };

  return (
    <section id="schedule" className="section-with-bg">
      <div>
        <div className="section-header">
          <h2>Event Schedule</h2>
          <p>Here is our event schedule</p>
        </div>

        <ul className="nav nav-tabs" role="tablist">
          {[0, 1, 2].map(offset => {
            const day = `day-${offset + 1}`;
            const formattedDate = getFormattedDate(offset);
            return (
              <li key={day} className="nav-item">
                <a className={`nav-link ${activeDay === day ? 'active' : ''}`} onClick={() => handleTabClick(day)}>
                  Day {offset + 1} ({formattedDate})
                </a>
              </li>
            );
          })}
        </ul>

        <h3 className="sub-heading">These are the latest event schedule details.</h3>

        <div className="tab-content row justify-content-center">
          {['day-1', 'day-2', 'day-3'].map(day => (
            <div key={day} role="tabpanel" className={`col-lg-9 tab-pane fade show ${activeDay === day ? 'active' : ''}`} id={day}>
              {scheduleData.length ? renderScheduleItems(filterEventsByDay(day)) : <p>Loading...</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSchedule;
