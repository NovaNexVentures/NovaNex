import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

// Placeholder components for each route
const Home = () => <div className="min-h-screen pt-20 bg-black text-white"><div className="container mx-auto px-4">Home Page</div></div>;
const About = () => <div className="min-h-screen pt-20 bg-black text-white"><div className="container mx-auto px-4">About Us</div></div>;
const Services = () => <div className="min-h-screen pt-20 bg-black text-white"><div className="container mx-auto px-4">Our Services</div></div>;
const Portfolio = () => <div className="min-h-screen pt-20 bg-black text-white"><div className="container mx-auto px-4">Portfolio</div></div>;
const Contact = () => <div className="min-h-screen pt-20 bg-black text-white"><div className="container mx-auto px-4">Contact Us</div></div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen w-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
