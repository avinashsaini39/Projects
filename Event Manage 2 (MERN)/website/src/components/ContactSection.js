import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    user_email: '',
    
    message: ''
  });
  const [messageSent, setMessageSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const serviceID = 'ENTER_YOUR_SERVICEID';
    const templateID = 'ENTER_YOUR_TEMPLATEID';
    const publicKey = 'ENTER_YOUR_PUBLICKEY';

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setMessageSent(true);
        setFormData({
          from_name: '',
          user_email: '',
          
          message: ''
        });
      }, (error) => {
        console.log('FAILED...', error);
      });
  };

  return (
    <section id="contact" className="section-bg ">
      <div className="container">
        <div className="section-header">
          <h2>Contact Us</h2>
          <p>Nihil officia ut sint molestiae tenetur.</p>
        </div>

        <div className="row contact-info">
          <div className="col-md-4">
            <div className="contact-address">
              <i className="ion-ios-location-outline"></i>
              <h3>Address</h3>
              <address>A108 Adam Street, NY 535022, USA</address>
            </div>
          </div>

          <div className="col-md-4">
            <div className="contact-phone">
              <i className="ion-ios-telephone-outline"></i>
              <h3>Phone Number</h3>
              <p><a href="tel:+155895548855">+1 5589 55488 55</a></p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="contact-email">
              <i className="ion-ios-email-outline"></i>
              <h3>Email</h3>
              <p><a href="mailto:info@example.com">info@example.com</a></p>
            </div>
          </div>
        </div>

        <div className="form">
          <form onSubmit={handleSubmit} role="form" className="contactForm">
            <div className="form-row">
              <div className="form-group col-md-6">
                <input type="text" name="from_name" className="form-control" id="from_name" placeholder="Your Name" value={formData.from_name} onChange={handleChange} minLength="4" required />
              </div>
              <div className="form-group col-md-6">
                <input type="email" className="form-control" name="user_email" id="user_email" placeholder="Your Email" value={formData.user_email} onChange={handleChange} required />
              </div>
            </div>
            
            
            <div className="form-group">
              <textarea className="form-control" name="message" rows="5" value={formData.message} onChange={handleChange} required placeholder="Message"></textarea>
            </div>
            <div className="text-center"><button type="submit">Send Message</button></div>
          </form>
        </div>

        {messageSent && <div id="sendmessage">Your message has been sent. Thank you!</div>}
      </div>
    </section>
  );
}

export default ContactSection;
