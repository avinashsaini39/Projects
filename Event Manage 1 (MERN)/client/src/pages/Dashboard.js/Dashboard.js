import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import axios from "axios";
import "./Dashboard.css"
const { Meta } = Card;

function Dashboard() {
  const [totalSponsors, setTotalSponsors] = useState(0);
  const [totalVenues, setTotalVenues] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalBlogs , setTotalBlogs] = useState(0);

  useEffect(() => {
    fetchTotalSponsors();
    fetchTotalVenues();
    fetchTotalEvents();
    fetchTotalBlogs();
  }, []);

//   const fetchTotalSponsors = () => {
//     axios
//       .get("http://localhost:5000/api/getallsponsors")
//       .then((res) => {
//         console.log("Total sponsors from API:", res.data.totalSponsors); // Log the value before setting it

//         setTotalSponsors(res.data.totalSponsors);
//       })
//       .catch((err) => {
//         console.error("Error fetching total sponsors:", err);
//       });
//       console.log(fetchTotalEvents);
//   };

const fetchTotalSponsors = () => {
    axios
      .get("http://localhost:5000/api/getallsponsors")
      .then((res) => {
        console.log("Total sponsors from API:", res.data.totalSponsors); // Log the value before setting it
  
        setTotalSponsors(res.data.totalSponsors);
      })
      .catch((err) => {
        console.error("Error fetching total sponsors:", err);
      });
  };
  

  const fetchTotalVenues = () => {
    axios
      .get("http://localhost:5000/api/getallvenues")
      .then((res) => {
        console.log("Total venues from API:", res.data.totalVenues); // Log the value before setting it

        setTotalVenues(res.data.totalVenues);
      })
      .catch((err) => {
        console.error("Error fetching total venues:", err);
      });
  };


  const fetchTotalBlogs = () => {
    axios
      .get("http://localhost:5000/api/getallblogs")
      .then((res) => {
        console.log("Total venues from API:", res.data.totalBlogs); // Log the value before setting it

        setTotalVenues(res.data.totalBlogs);
      })
      .catch((err) => {
        console.error("Error fetching total venues:", err);
      });
  };


  const fetchTotalEvents = () => {
    axios
      .get("http://localhost:5000/api/getAllEvents")
      .then((res) => {
        setTotalEvents(res.data.total);
      })
      .catch((err) => {
        console.error("Error fetching total events:", err);
      });
  };

  return (
    <div className="container">
    <h1>Dashboard</h1>
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card className="centered-text" title="Total Sponsors" bordered={false} size="small">
          <p className="centered-text">{totalSponsors}</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card className="centered-text" title="Total Venues" bordered={false} size="small">
          <p className="centered-text">{totalVenues}</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card className="centered-text" title="Total Events" bordered={false} size="small">
          <p className="centered-text">{totalEvents}</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card className="centered-text" title="Total Blogs" bordered={false} size="small">
          <p className="centered-text">{totalEvents}</p>
        </Card>
      </Col>
    </Row>
  </div>
);
}

export default Dashboard;
