import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value
    };

    // Google Apps Script endpoint
    const scriptURL = "https://script.google.com/macros/s/AKfycbxjAdDxum50tCq9vg1Y-qW_HcNOJBTDuGsSW4prSxu7GsYX8sJmkI2FgaCYT9unvW4PhQ/exec";

    try {
      console.log("Submitting form data:", formData);

      const response = await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Fetch response object:", response);
      if (response.ok) {
        console.log("Form successfully submitted (response.ok = true)");
        alert("Thank you! Your message has been sent successfully.");
        e.target.reset();
      } else {
        alert("Thank you! Your message has been sent successfully.");
        e.target.reset();
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to send. Check your internet connection or try later.");
    }
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
      url: '#',
      icon: <Twitter className="w-6 h-6" />
    },
    {
      name: 'Facebook',
      url: '#',
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
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
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
                className="h-1.5 bg-gradient-to-r from-nexus-500/50 to-nexus-500 w-24 rounded-full mx-auto"
              />
            </div>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mt-8"
            >
              Have questions or want to discuss a project? We'd love to hear from you.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-gray-900 to-gray-800/50 p-8 rounded-2xl border border-gray-800/50 shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nexus-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nexus-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nexus-500 focus:border-transparent"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nexus-500 focus:border-transparent"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-nexus-500 to-nexus-600 text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="space-y-8"
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-800/50 h-full"
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-bold mb-6">Get in touch</h3>

                <motion.div
                  className="space-y-6"
                  variants={fadeInUp}
                >
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
                        contact@novanext.com.pk
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
                        href="tel:+923265025286"
                        className="text-white hover:text-nexus-400 transition-colors"
                      >
                        +92 326 5025286
                      </a>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-gray-300 text-sm font-medium mb-4">Follow us</h4>
                    <div className="flex space-x-4">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
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
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
