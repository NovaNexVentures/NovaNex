import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Facebook, Mail, Phone } from 'lucide-react';

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

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
  };

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/novanexventures',
      icon: <Instagram className="w-6 h-6" />
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/novanexventures',
      icon: <Linkedin className="w-6 h-6" />
    },
    {
      name: 'Twitter',
      url: '#', // Add your Twitter URL
      icon: <Twitter className="w-6 h-6" />
    },
    {
      name: 'Facebook',
      url: '#', // Add your Facebook URL
      icon: <Facebook className="w-6 h-6" />
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
      {/* Blurred overlay top and bottom */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black via-black/80 to-transparent backdrop-blur-sm"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-sm"></div>
      </div>
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <div className="space-y-4">
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-nexus-400 via-nexus-300 to-nexus-500 bg-clip-text text-transparent leading-tight"
              >
                Let's Connect
              </motion.h2>
              <motion.div 
                variants={fadeInUp}
                className="h-1.5 bg-gradient-to-r from-nexus-500/50 to-nexus-500 w-24 rounded-full"
              />
            </div>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto"
            >
              Have questions or want to discuss a project? We'd love to hear from you.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-br from-gray-900 to-gray-800/50 p-8 rounded-2xl border border-gray-800/50"
            >
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nexus-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nexus-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-1">
                      WhatsApp Number
                      <span className="text-xs text-gray-500 ml-1">(optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">+</span>
                      </div>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nexus-500 focus:border-transparent"
                        placeholder="92 123 4567890"
                        pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nexus-500 focus:border-transparent"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-nexus-500 to-nexus-600 text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
              <p className="mt-4 text-sm text-gray-400 text-center">
                We'll get back to you within 24 hours.
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              variants={fadeInUp}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 p-8 rounded-2xl border border-gray-800/50 h-full">
                <h3 className="text-2xl font-bold mb-6">Get in touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-nexus-500/20 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-nexus-400" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-gray-300 text-sm font-medium">Email us</h4>
                      <a 
                        href="mailto:contact@novanext.com" 
                        className="text-white hover:text-nexus-400 transition-colors"
                      >
                        contact@novanext.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-nexus-500/20 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-nexus-400" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-gray-300 text-sm font-medium">Call us</h4>
                      <a 
                        href="tel:03195238402" 
                        className="text-white hover:text-nexus-400 transition-colors"
                      >
                        +92 319 5238402
                      </a>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-800">
                    <h4 className="text-gray-300 text-sm font-medium mb-4">Follow us</h4>
                    <div className="flex space-x-4">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-900/50 hover:bg-nexus-500/20 border border-gray-800 hover:border-nexus-500/50 rounded-full p-3 transition-all duration-300"
                          aria-label={social.name}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
