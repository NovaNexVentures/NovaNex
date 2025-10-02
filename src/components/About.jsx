import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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

const ServiceCard = ({ icon, title, description, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ delay: delay * 0.1 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl hover:shadow-nexus-500/20 transition-all duration-300 hover:-translate-y-2"
    >
      <div className="text-4xl mb-4 text-nexus-400">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
      {/* Blurred overlay top and bottom */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black via-black/80 to-transparent backdrop-blur-sm"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-sm"></div>
      </div>
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-24"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-nexus-400 via-nexus-300 to-nexus-500 bg-clip-text text-transparent leading-tight pb-4"
          >
            Crafting Digital Excellence
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto"
          >
            We transform visionary ideas into powerful digital experiences that drive results and inspire innovation.
          </motion.p>
        </motion.div>

        {/* Our Story */}
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8 }
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div>
            <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
            <p className="text-gray-300 mb-6 text-lg">
              At NovaNex, we're redefining digital innovation. Founded on the belief that technology should be both powerful and accessible, 
              we've built a team that thrives on pushing boundaries and challenging the status quo.
            </p>
            <p className="text-gray-300 mb-8 text-lg">
              Our journey is driven by a commitment to excellence, where cutting-edge development meets intuitive design to create 
              solutions that don't just meet industry standards—they set them.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-nexus-400 mr-3">✓</span>
                <span className="text-gray-300">Pioneering digital solutions since our inception</span>
              </div>
              <div className="flex items-start">
                <span className="text-nexus-400 mr-3">✓</span>
                <span className="text-gray-300">Award-winning team of industry experts</span>
              </div>
              <div className="flex items-start">
                <span className="text-nexus-400 mr-3">✓</span>
                <span className="text-gray-300">Client-focused approach with measurable results</span>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="relative z-10 bg-gradient-to-br from-nexus-500/20 to-nexus-900/30 rounded-2xl overflow-hidden">
              <div className="relative w-full h-full">
                <img 
                  src="/src/assets/about.png" 
                  alt="NovaNex About" 
                  className="w-full h-auto transition-opacity duration-500 group-hover:opacity-0"
                />
                <img 
                  src="/src/assets/about-neon.png" 
                  alt="NovaNex About Glow" 
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>
            <div className="absolute -inset-4 bg-nexus-500/10 rounded-2xl blur-xl -z-10 group-hover:bg-nexus-500/20 transition-colors duration-500"></div>
          </div>
        </motion.div>


        {/* Team Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8 }
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-3xl font-bold mb-6">Our Approach</h3>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
            We believe in a collaborative process that puts your vision at the center. 
            Our iterative approach ensures we deliver solutions that not only meet but exceed your expectations.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { number: '01', title: 'Discover', desc: 'We dive deep to understand your goals and challenges.' },
              { number: '02', title: 'Design', desc: 'Crafting solutions that balance form and function.' },
              { number: '03', title: 'Deliver', desc: 'Bringing your vision to life with precision and care.' },
            ].map((item, index) => (
              <motion.div 
                key={item.number}
                className="bg-gradient-to-b from-nexus-900/50 to-nexus-800/30 p-8 rounded-2xl border border-nexus-800/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: index * 0.2,
                    duration: 0.6 
                  }
                }}
                viewport={{ once: true }}
              >
                <div className="text-6xl font-bold mb-4 text-nexus-400">{item.number}</div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
