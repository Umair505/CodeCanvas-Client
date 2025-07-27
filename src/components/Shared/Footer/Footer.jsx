import { FaGithub, FaLinkedin, FaTwitter, FaProductHunt } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { motion } from 'framer-motion';
import logo from '../../../assets/images/logo-flat.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a12] border-t border-[#9d00ff]/30 mt-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#9d00ff]/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-[#00f5ff]/10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center">
              <img 
                src={logo} 
                alt="CodeCanvas Logo" 
                className="w-14 h-14 object-contain"
              />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] to-[#9d00ff]">
                CodeCanvas
              </span>
            </div>
            <p className="text-[#b8b8b8] text-sm">
              Where tech products paint their stories. Discover, share, and innovate with the latest digital creations.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <FaGithub size={20} />, label: "GitHub" },
                { icon: <FaTwitter size={20} />, label: "Twitter" },
                { icon: <FaLinkedin size={20} />, label: "LinkedIn" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-[#b8b8b8] hover:text-[#00f5ff] transition-colors relative group"
                  whileHover={{ y: -2 }}
                  aria-label={social.label}
                >
                  {social.icon}
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-[#00f5ff] opacity-0 group-hover:opacity-100 transition-opacity">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-[#00f5ff] font-medium text-lg relative inline-block">
              Explore
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#00f5ff] to-[#9d00ff]"></span>
            </h3>
            <ul className="space-y-3">
              {['Featured Products', 'Trending Tech', 'New Releases', 'Upcoming Tools'].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a href="#" className="text-[#b8b8b8] hover:text-[#9d00ff] text-sm transition-colors flex items-center">
                    <span className="w-1 h-1 bg-[#9d00ff] rounded-full mr-2"></span>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Community */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-[#00f5ff] font-medium text-lg relative inline-block">
              Community
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#00f5ff] to-[#9d00ff]"></span>
            </h3>
            <ul className="space-y-3">
              {['Guidelines', 'Discussions', 'Events', 'Blog'].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a href="#" className="text-[#b8b8b8] hover:text-[#9d00ff] text-sm transition-colors flex items-center">
                    <span className="w-1 h-1 bg-[#9d00ff] rounded-full mr-2"></span>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-[#00f5ff] font-medium text-lg relative inline-block">
              Contact
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#00f5ff] to-[#9d00ff]"></span>
            </h3>
            <ul className="space-y-3">
              <motion.li 
                className="flex items-start space-x-2"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <SiGmail className="text-[#b8b8b8] mt-0.5 flex-shrink-0" size={16} />
                <a href="mailto:contact@codecanvas.tech" className="text-[#b8b8b8] hover:text-[#9d00ff] text-sm transition-colors">
                  contact@codecanvas.tech
                </a>
              </motion.li>
              <motion.li 
                className="text-[#b8b8b8] text-sm flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="w-1 h-1 bg-[#9d00ff] rounded-full mr-2"></span>
                San Francisco, CA
              </motion.li>
              <motion.li 
                className="text-[#b8b8b8] text-sm flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="w-1 h-1 bg-[#9d00ff] rounded-full mr-2"></span>
                Open 24/7
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Developer Credit - Animated */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-[#9d00ff]/10 text-center"
        >
          <div className="relative inline-block group">
            <p className="text-[#b8b8b8] text-sm">
              © {currentYear} CodeCanvas. All rights reserved.
            </p>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00f5ff] to-[#9d00ff] transition-all duration-300 group-hover:w-full"></div>
          </div>
          
          <div className="mt-3">
            <motion.p 
              className="text-[#b8b8b8] text-xs"
              whileHover={{ scale: 1.05 }}
            >
              Crafted with <span className="text-[#9d00ff]">♥</span> by
              <a 
                href="https://github.com/Umair505" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 text-[#00f5ff] hover:text-[#9d00ff] transition-colors font-medium"
              >
                Moinul
              </a>
            </motion.p>
          </div>

          {/* Back to top button */}
          <motion.div 
            className="mt-6"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="#top" 
              className="inline-block px-4 py-2 text-xs font-medium rounded-full bg-gradient-to-r from-[#9d00ff]/20 to-[#00f5ff]/20 text-[#b8b8b8] hover:text-white border border-[#9d00ff]/30 hover:border-[#00f5ff]/50 transition-all"
            >
              Back to Top
            </a>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;