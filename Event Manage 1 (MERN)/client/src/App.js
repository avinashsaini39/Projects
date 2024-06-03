
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import EventsList from "./pages/Events/EventsList";
import EventSpeakers from "./pages/event-speakers/EventSpeakers";
import BlogList from "./pages/Blogs/BlogList";
import VendorList from "./pages/Vendor/VendorList";
import VenueList from "./pages/Venue/VenueList";
import UserList from "./pages/User/UserList";
import SubscriptionList from "./pages/Subscription/Subscription";
import Transaction from "./pages/Transactions/Transactions"
import SponsorComponent from "./pages/sponsors/SponserComponent";
import Hotel from "./pages/Hotels/Hotel";
import ForgotPassword from "./components/layout/ForgotPassword";
import ChangePassword from "./pages/change-password/ChangePassword";
import ResetPassword from "./components/layout/ResetPassword";
import Dashboard from "./pages/Dashboard.js/Dashboard";
import TicketList from "./pages/Ticket/Ticket";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/home" component={Home} />
          <Route exact path="/profile" component={Profile} />
          
          <Route exact path="/eventschedule" component={EventsList} />
          <Route exact path="/eventspeaker" component={EventSpeakers} />
          <Route exact path="/blog" component={BlogList} />
          <Route exact path="/vendors" component={VendorList} />
          <Route exact path="/venue" component={VenueList} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/sponsors" component={SponsorComponent} />
          <Route exact path="/subscription" component={SubscriptionList} />
          <Route exact path="/hotel" component={Hotel} />
          <Route exact path="/ticket" component={TicketList} />
          <Route exact path="/transactions" component={Transaction} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password/:id/:token" component={ResetPassword} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/change-password" component={ChangePassword}/>
        </Main>
      </Switch>
    </div>
  );
}

export default App;
