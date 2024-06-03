
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import pngegg2 from "../../assets/images/pngegg2.png";
import {
  CalendarOutlined,
  HomeOutlined,
  ShopOutlined,
  FileTextOutlined,
  UserOutlined,
  TransactionOutlined,
  DollarCircleOutlined 
} from "@ant-design/icons";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const home = [
    <HomeOutlined style={{ fontSize: 20, color }} />, // Use HomeOutlined icon
  ];

  const events = [<CalendarOutlined style={{ fontSize: 20, color }} />];
  const venue = [<ShopOutlined style={{ fontSize: 20, color }} />];
  const hotel = [<ShopOutlined style={{ fontSize: 20, color }} />];

  const blog = [<FileTextOutlined style={{ fontSize: 20, color }} />];
  const sponsors = [<UserOutlined style={{ fontSize: 20, color }} />];
  const user = [<UserOutlined style={{ fontSize: 20, color }} />];

  const vendor = [<ShopOutlined style={{ fontSize: 20, color }} />];

  const transaction = [<TransactionOutlined style={{ fontSize: 20, color }} />];
  const subscription = [
    <DollarCircleOutlined style={{ fontSize: 20, color }} />, // Use SubscriptionOutlined icon
  ];
  const ticket = [
    <DollarCircleOutlined style={{ fontSize: 20, color }} />,
  ];

  return (
    <>
      <div className="brand">
        <img src ={pngegg2} alt="" style={{ filter: 'invert(1)' }}/>
        {/* <span>Event Management</span> */}
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/dashboard">
            <span
              className="icon"
              style={{
                background: page === "home" ? color : "",
              }}
            >
              {home} {/* Display the Home icon */}
            </span>
            <span className="label">Dashboard</span> {/* Display the Home label */}
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/users">
            <span
              className="icon"
              style={{
                background: page === "user" ? color : "",
              }}
            >   
              {user}
            </span>
            <span className="label">User Manager</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7">
          <NavLink to="/vendors">
            <span
              className="icon"
              style={{
                background: page === "vendor" ? color : "",
              }}
            >
              {vendor}
            </span>
            <span className="label">Vendor</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/venue">
            <span
              className="icon"
              style={{
                background: page === "venue" ? color : "",
              }}
            >
              {venue}
              {/* Display the venue icon */}
            </span>
            <span className="label">Venue</span> {/* Display the Venue label */}
          </NavLink>
        </Menu.Item>
        <Menu.Item key="10">
          <NavLink to="/sponsors">
            <span
              className="icon"
              style={{
                background: page === "sponsors" ? color : "",
              }}
            >
              {sponsors}
            </span>
            <span className="label">Sponsors</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/eventschedule">
            <span
              className="icon"
              style={{
                background: page === "events" ? color : "",
              }}
            >
              {events} {/* Display the event icon */}
            </span>
            <span className="label">Event Schedule</span>{" "}
            {/* Display the Events label */}
          </NavLink>
        </Menu.Item>
        <Menu.Item key="12">
          <NavLink to="/eventspeaker">
            <span
              className="icon"
              style={{
                background: page === "eventspeakers" ? color : "",
              }}
            >
              {sponsors} {/* Display the event icon */}
            </span>
            <span className="label">Event Speakers</span>{" "}
            {/* Display the Events label */}
          </NavLink>
        </Menu.Item>
        <Menu.Item key="13">
          <NavLink to="/hotel">
            <span
              className="icon"
              style={{
                background: page === "eventspeakers" ? color : "",
              }}
            >
              {hotel} {/* Display the event icon */}
            </span>
            <span className="label">Hotels</span>{" "}
            {/* Display the Events label */}
          </NavLink>
        </Menu.Item>
        <Menu.Item key="5">
            <NavLink to="/blog">
              <span
                className="icon"
                style={{
                  background: page === "blog" ? color : "",
                }}
              >
                {blog}
                {/* Display the blog icon */}
              </span>
              <span className="label">Blog</span> {/* Display the Blog label */}
            </NavLink>
          </Menu.Item>
          <Menu.Item key="9">
          <NavLink to="/transactions">
            <span
              className="icon"
              style={{
                background: page === "transaction" ? color : "",
              }}
            >
              {transaction}
            </span>
            <span className="label">Transaction</span>
          </NavLink>
        </Menu.Item>
        
        <Menu.Item key="8">
          <NavLink to="/subscription">
            <span
              className="icon"
              style={{
                background: page === "subscription" ? color : "",
              }}
            >
              {subscription}
            </span>
            <span className="label">Subscription</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="11">
          <NavLink to="/ticket">
            <span
              className="icon"
              style={{
                background: page === "ticket" ? color : "",
              }}
            >
              {ticket}
            </span>
            <span className="label">Tickets</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/website-home">
            <span
              className="icon"
              style={{
                background: page === "website-home" ? color : "",
              }}
            >
              {home} {/* Display the Home icon */}
            </span>
            <span className="label">Website Home</span>{" "}
            {/* Display the Home label */}
          </NavLink>
        </Menu.Item>
       
        

        

      
       
       
      
      </Menu>
      <div className="aside-footer">
   
      </div>
    </>
  );
}

export default Sidenav;
