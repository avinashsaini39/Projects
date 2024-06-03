import React, {useState, useEffect} from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const IntroSection = () => {
  const [eventData, setEventData] = useState({ description: '', location: '', date: ''});

  useEffect(() => {
    axios.get('http://localhost:5000/api/getallEvents')
    .then(response => {
      const data = response.data;
      //Filter for upcoming events
      const currentDate = dayjs();
      const upcomingEvents = data.filter(event => dayjs(event.date).isAfter(currentDate));

      if (upcomingEvents.length > 0) {
        const nextEvent = upcomingEvents[0]; //getting the first upcoming event
        setEventData({
          title: nextEvent.title,
          subtitle: nextEvent.subtitle,
          venue: nextEvent.venue.venueName,
          date: dayjs(nextEvent.date).format('dddd, MMMM D, YYYY h:mm A')
          
        });
      }
    })
    .catch(error => {
      console.log('Error fetching event data:', error);
    });
  }, []);
  return (
    <>
    <section id="intro">
      <div className="intro-container">
        <h1 className="mb-4 pb-0">{eventData.title}<br /><span>{eventData.subtitle}</span></h1>
        <p className="mb-4 pb-0">{eventData.date}, {eventData.venue}</p>
        <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="venobox play-btn mb-4" data-vbtype="video" data-autoplay="true"></a>
        <a href="#about" className="about-btn scrollto">About The Event</a>
      </div>
      
    </section>
    
    

    </>
    
  );
}

export default IntroSection;
