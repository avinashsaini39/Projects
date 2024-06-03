import logo from './logo.svg';
import './App.css';
// import Navbar from './components/Header';
import Header from './components/Header';
import IntroSection from './components/IntroSection';
import AboutSection from './components/AboutSection';
import SpeakersSection from './components/SpeakersSection';
import EventSchedule from './components/EventSchedule';
import Venue from './components/Venue';
import HotelsSection from './components/HotelsSection';
import GallerySection from './components/GallerySection';
import SponsorsSection from './components/SponsorsSection';
import FAQSection from './components/FAQSection';
import SubscribeSection from './components/SubscribeSection';
import BuyTicketsSection from './components/BuyTicketsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <Header/>
      <IntroSection/>
      <AboutSection/>
      <SpeakersSection/>
      <EventSchedule/>
      <Venue/>
      <HotelsSection/>
       <GallerySection/>
      <SponsorsSection/>
      <FAQSection/>
      <SubscribeSection/>
      <BuyTicketsSection/>
      <ContactSection/>
      <Footer/>

     
      
    </div>
  );
}

export default App;
