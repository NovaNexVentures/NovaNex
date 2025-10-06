import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const socialLinks = [
    { icon: <FaGithub className="text-2xl" />, url: "https://github.com" },
    { icon: <FaLinkedin className="text-2xl" />, url: "https://linkedin.com" },
    { icon: <FaTwitter className="text-2xl" />, url: "https://twitter.com" },
    { icon: <FaEnvelope className="text-2xl" />, url: "mailto:contact@example.com" }
  ];

  const footerLinks = [
    { title: "Home", href: "#home" },
    { title: "About", href: "#about" },
    { title: "Services", href: "#services" },
    { title: "Portfolio", href: "#portfolio" },
    { title: "Contact", href: "#contact" }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {/* Logo and description */}
          <motion.div variants={item} className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-nexus-400 to-cyan-400 bg-clip-text text-transparent">
              NovaNex
            </h2>
            <p className="mt-4 text-gray-400">
              Empowering businesses with cutting-edge technology solutions and innovative digital experiences.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-nexus-400 transition-colors duration-300"
                  whileHover={{ y: -3 }}
                  variants={item}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={item} className="mt-8 md:mt-0">
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <motion.li key={index} variants={item}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-nexus-400 transition-colors duration-300"
                  >
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={item} className="mt-8 md:mt-0">
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <motion.li variants={item} className="flex items-center">
                <span className="mr-2">📧</span>
                <a href="mailto:contact@novanex.com" className="hover:text-nexus-400 transition-colors duration-300">
                  contact@novanex.com
                </a>
              </motion.li>
              <motion.li variants={item} className="flex items-center">
                <span className="mr-2">📞</span>
                <a href="tel:+923265025286" className="hover:text-nexus-400 transition-colors duration-300">
                +92 326 5025286
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          © {currentYear} NovaNex. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
