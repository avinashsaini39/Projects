import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, Toaster } from 'react-hot-toast';

const SubscribeSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/subscribe', { // Update this URL in production
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Subscription successful! Check your email for a welcome message.');
        setEmail(''); // Clear the email input after successful submission
      } else {
        toast.error(data.message || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <section id="subscribe">
      <div className="container">
        <div className="section-header">
          <h2>Newsletter</h2>
          <p>Rerum numquam illum recusandae quia mollitia consequatur.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row justify-content-center">
            <div className="col-md-6 d-flex">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your Email"
                value={email}
                onChange={handleChange}
                required
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn btn-primary ml-2">Subscribe</button>
            </div>
          </div>
        </form>
        <Toaster position="top-right" />
      </div>
    </section>
  );
};

export default SubscribeSection;
