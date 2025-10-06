import { useState, useEffect, forwardRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import logoText from '../assets/logo -text.png';

const Navbar = forwardRef(({ scrollToSection, refs = {} }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Update active section based on scroll position
      const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About Us' },
    { id: 'services', name: 'Services' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'contact', name: 'Contact' },
  ];

  const handleNavClick = (sectionId) => {
    if (refs[`${sectionId}Ref`]?.current) {
      scrollToSection(refs[`${sectionId}Ref`]);
      setIsOpen(false);
    }
  };

  return (
    <nav 
      ref={ref}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black backdrop-blur-md py-2 border-b border-nexus-400/30' : 'bg-black py-3'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img src={logo} alt="NovaNex Logo" className="h-12 w-auto" />
            <img src={logoText} alt="NovaNex" className="h-8 w-auto" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-4 py-2 text-lg font-medium transition-colors duration-300 ${
                  activeSection === link.id 
                    ? 'text-nexus-300' 
                    : 'text-gray-300 hover:text-nexus-200'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.span 
                    layoutId="nav-underline"
                    className="absolute left-0 -bottom-1 w-full h-0.5 bg-nexus-400"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? (
                <FiX className="h-8 w-8" />
              ) : (
                <FiMenu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={{
            open: { opacity: 1, height: 'auto' },
            closed: { opacity: 0, height: 0, transition: { duration: 0.2 } }
          }}
          className="md:hidden overflow-hidden bg-black/90 backdrop-blur-md rounded-lg mt-2"
        >
          <div className="pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-6 py-3 text-lg font-medium ${
                  activeSection === link.id
                    ? 'text-nexus-300 bg-nexus-900/50 border-l-4 border-nexus-400'
                    : 'text-gray-300 hover:bg-nexus-900/30 hover:border-l-4 hover:border-nexus-400/50'
                } transition-all duration-200`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;