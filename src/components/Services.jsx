import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Import service images
import softwareImg from '../assets/services/software.jpg';
import webImg from '../assets/services/web.jpg';
import aiImg from '../assets/services/ai.jpg';
import virtualImg from '../assets/services/virtual.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const ServiceCard = ({ title, description, image }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl hover:shadow-nexus-500/20 transition-all duration-300 hover:-translate-y-2 h-full overflow-hidden w-full"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const services = [
    {
      title: 'Software Development',
      description: 'Custom software solutions tailored to your business needs. From web applications to enterprise systems, we build robust and scalable software that drives growth.',
      image: softwareImg
    },
    {
      title: 'Web Development',
      description: 'Modern, responsive, and high-performance websites and web applications that deliver exceptional user experiences and drive business growth.',
      image: webImg
    },
    {
      title: 'AI Solutions',
      description: 'Leverage the power of artificial intelligence to transform your business processes, gain insights, and deliver intelligent solutions.',
      image: aiImg
    },
    {
      title: 'Virtual Tours',
      description: 'Immersive 360° virtual experiences that showcase properties, venues, and spaces with stunning clarity and interactive elements.',
      image: virtualImg
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full text-white py-20 px-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, transparent 0%, #09090b 20%, #09090b 80%, transparent 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Content will be rendered here */}
      {/* Blurred overlay top and bottom */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black via-black/80 to-transparent backdrop-blur-sm"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-sm"></div>
      </div>
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-nexus-400 via-nexus-300 to-nexus-500 bg-clip-text text-transparent leading-tight pb-4"
            >
              Our Services
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8"
            >
              Comprehensive solutions designed to transform your digital presence and drive business growth.
            </motion.p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto px-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="h-full"
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Services;
