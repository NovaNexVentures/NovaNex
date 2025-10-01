import { motion } from 'framer-motion';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

const buttonItem = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      delay: 0.6,
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.98 },
};

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden">      
      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* Text Content */}
        <motion.div 
          className="lg:flex-1 text-left"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
            <motion.span className="block" variants={item}>Create, Connect,</motion.span>
            <motion.span className="relative block" variants={item}>
              <span className="relative z-10 bg-gradient-to-r from-nexus-gradient-start via-nexus-400 to-nexus-gradient-end bg-clip-text text-transparent">
                Innovate
              </span>
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 my-8 max-w-2xl"
            variants={item}
          >
            Transforming ideas into digital reality. We craft cutting-edge solutions that drive growth and innovation for businesses worldwide.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-12"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.4,
                },
              },
            }}
          >
            <motion.div variants={buttonItem} whileHover="hover" whileTap="tap">
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="relative px-8 py-4 bg-gradient-to-r from-nexus-gradient-start via-nexus-gradient-mid to-nexus-gradient-end text-white font-medium rounded-lg text-lg shadow-xl shadow-nexus-gradient-start/20 overflow-hidden group"
              >
                <span className="relative z-10">Book a Free Session</span>
                <span className="absolute inset-0 bg-nexus-gloss opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </motion.div>
            <motion.div variants={buttonItem} whileHover="hover" whileTap="tap">
              <button 
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="relative px-8 py-4 bg-transparent border-2 border-nexus-400 text-white font-medium rounded-lg text-lg group overflow-hidden"
              >
                <span className="relative z-10">Our Services</span>
                <span className="absolute inset-0 bg-nexus-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Image Container */}
        <motion.div 
          className="w-full lg:flex-1 relative"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
            alt="Digital Solutions" 
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-nexus-900/20 rounded-2xl"></div>
        </motion.div>
      </div>
      
    </section>
  );
};

export default Hero;
