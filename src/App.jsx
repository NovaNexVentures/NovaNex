import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';

// Placeholder components for sections
const Portfolio = () => (
  <section id="portfolio" className="min-h-screen pt-20 bg-gray-900 text-white">
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">Portfolio</h2>
      {/* Portfolio content will go here */}
    </div>
  </section>
);



function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Refs for each section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full overflow-x-hidden bg-black">
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-nexus-400 z-50" 
        style={{ scaleX, transformOrigin: '0%' }} 
      />
      
      <Navbar 
        scrollToSection={scrollToSection} 
        refs={{ homeRef, aboutRef, servicesRef, portfolioRef, contactRef }}
      />
      
      {/* Main content */}
      <main>
        <section ref={homeRef} id="home">
          <Hero />
        </section>
        
        <section ref={aboutRef} id="about">
          <About />
        </section>
        
        <section ref={servicesRef} id="services">
          <Services />
        </section>
        
        <section ref={portfolioRef} id="portfolio">
          <Portfolio />
        </section>
        
        <section ref={contactRef} id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;
