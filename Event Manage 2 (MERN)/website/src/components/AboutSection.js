import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const AboutSection = () => {

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
          description: nextEvent.description,
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
    <section id="about">
      <div className="container">
        <div className="row">
          {eventData ? (
            <div>
                <div className="col-lg-6">
                <h2>About The Event</h2>
                <p>{eventData.description}</p>
              </div>
              <div className="col-lg-3">
                <h3>Where</h3>
                <p>{eventData.venue}</p>
              </div>
              <div className="col-lg-3">
                <h3>When</h3>
                <p>{eventData.date}</p>
              </div>

            </div>
          ) : (
            <div className="col-lg-12">
              <p>No upcoming events</p>
            </div>
          )}
          
        </div>
      </div>
    </section>
  );
}

export default AboutSection;












// import React from 'react';

// const AboutSection = () => {
//   return (
//     <section id="about">
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-6">
//             <h2>About The Event</h2>
//             <p>Sed nam ut dolor qui repellendus iusto odit. Possimus inventore eveniet accusamus error amet eius aut
//               accusantium et. Non odit consequatur repudiandae sequi ea odio molestiae. Enim possimus sunt inventore in
//               est ut optio sequi unde.</p>
//           </div>
//           <div className="col-lg-3">
//             <h3>Where</h3>
//             <p>Downtown Conference Center, New York</p>
//           </div>
//           <div className="col-lg-3">
//             <h3>When</h3>
//             <p>Monday to Wednesday<br />10-12 December</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default AboutSection;
