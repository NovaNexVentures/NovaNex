import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, ArrowUpRight } from 'lucide-react';

// Import images
import classroomSystemImage from '../assets/portfolio/classroomsystem.png';
import pofLibraryImage from '../assets/portfolio/lib-virtualtour.png';
import launchpaidlogo from '../assets/portfolio/launchpaidlogo.jpg';
import GDP from '../assets/portfolio/gdp.jpg';

// Custom hook for 3D tilt effect
const useTilt = (active) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const rotateX = useTransform(y, [0, 1], [10, -10], { clamp: true });
  const rotateY = useTransform(x, [0, 1], [-10, 10], { clamp: true });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };
  
  const resetTilt = () => {
    x.set(0.5);
    y.set(0.5);
  };
  
  return {
    style: {
      transform: active ? 'perspective(1000px)' : 'none',
      rotateX: active ? rotateX : 0,
      rotateY: active ? rotateY : 0,
      transition: 'transform 0.2s ease-out'
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: resetTilt
  };
};

const projects = [
  {
    title: 'POF Library Virtual Tour',
    description: 'An immersive 360° virtual tour of the POF Library, allowing users to explore the library space remotely.',
    image: pofLibraryImage,
    url: 'https://app.lapentor.com/sphere/pof-library',
    tags: ['Virtual Reality', 'WebGL', 'Interactive']
  },
  {
    title: 'LaunchPaid.ai',
    description: 'Launchpaid AI builds smart SaaS solutions for influencer marketing and automation connecting brands creators and agencies seamlessly',
    image: launchpaidlogo,
    url: 'https://launchpaid.ai',
    tags: ['SAAS', 'CRM', 'Web App']
  },
  {
    title: 'Global GDP Analysis Dashboard',
    description: 'interactive Streamlit dashboard that visualizes and analyzes key economic metrics, including GDP, GDP Growth Rate, GDP per Capita (PPP), and Unemployment Rates, across various countries from 1990 to 2023.',
    image: GDP,
    url: 'https://gdp-dynamics-a-comparative-analysis.streamlit.app/',
    tags: ['Data Dashboard', 'Visualization', 'Data Analysis']
  },
  {
    title: 'Classroom Scheduling System',
    description: 'A comprehensive system for managing and scheduling classroom reservations in educational institutions.',
    image: classroomSystemImage,
    url: 'https://github.com/muhibk22/ClassRoomReservationSystem',
    tags: ['Web Application', 'Database', 'ASP.NET']
  }
];

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const projectVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  const tagVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        type: 'spring',
        stiffness: 100
      }
    })
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-nexus-500/10"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(4px)'
            }}
            animate={{
              y: [0, 50, 0],
              x: [0, Math.random() * 40 - 20],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-400 to-cyan-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-nexus-500 to-cyan-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="max-w-5xl mx-auto relative" ref={containerRef}>
          <AnimatePresence mode="wait" custom={1}>
            <motion.div
              key={currentIndex}
              custom={1}
              variants={projectVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative bg-gray-800/30 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <div className="relative group h-full">
                <motion.div 
                  className="relative overflow-hidden h-80 md:h-96"
                  initial={false}
                  animate={{
                    scale: isHovered ? 1.03 : 1,
                    boxShadow: isHovered ? '0 20px 40px rgba(0, 0, 0, 0.2)' : '0 10px 20px rgba(0, 0, 0, 0.1)'
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img 
                    src={projects[currentIndex].image} 
                    alt={projects[currentIndex].title}
                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-8 w-full">
                      <a 
                        href={projects[currentIndex].url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-nexus-500 to-cyan-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-nexus-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        View Live Project
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              
                {/* Project Details */}
                <div className="p-8 text-center relative z-10">
                  <motion.h3 
                    className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {projects[currentIndex].title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {projects[currentIndex].description}
                  </motion.p>
                  
                  <div className="flex flex-wrap gap-3 justify-center mb-8">
                    {projects[currentIndex].tags.map((tag, index) => (
                      <motion.span 
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-gray-700/50 to-gray-800/50 text-nexus-200 text-sm rounded-full backdrop-blur-sm border border-gray-600/30 shadow-lg"
                        custom={index}
                        initial="initial"
                        animate="animate"
                        variants={tagVariants}
                        whileHover={{ 
                          scale: 1.05,
                          background: 'linear-gradient(45deg, #4f46e5, #06b6d4)',
                          color: 'white',
                          transition: { duration: 0.2 }
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <motion.div 
                    className="flex justify-center items-center space-x-6 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.button
                      onClick={prevProject}
                      className="p-3 rounded-full bg-gray-700/50 hover:bg-nexus-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-nexus-500/20"
                      aria-label="Previous project"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                    
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-nexus-600 to-cyan-600 text-white font-bold shadow-lg">
                      <span className="text-sm">{currentIndex + 1}<span className="text-nexus-300">/{projects.length}</span></span>
                    </div>
                    
                    <motion.button
                      onClick={nextProject}
                      className="p-3 rounded-full bg-gray-700/50 hover:bg-nexus-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-nexus-500/20"
                      aria-label="Next project"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
