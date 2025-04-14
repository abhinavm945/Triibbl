import { motion } from 'framer-motion';
import { FaDiscord, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: <FaDiscord size={20} />, url: '#' },
    { icon: <FaTwitter size={20} />, url: '#' },
    { icon: <FaInstagram size={20} />, url: '#' },
    { icon: <FaYoutube size={20} />, url: '#' },
  ];

  const footerLinks = [
    {
      title: 'Game',
      links: [
        { name: 'How to Play', url: '#' },
        { name: 'Leaderboard', url: '#' },
        { name: 'Word Lists', url: '#' },
        { name: 'Custom Words', url: '#' },
      ],
    },
    {
      title: 'Community',
      links: [
        { name: 'Discord', url: '#' },
        { name: 'Tournaments', url: '#' },
        { name: 'Fan Art', url: '#' },
        { name: 'Merch', url: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', url: '#' },
        { name: 'Careers', url: '#' },
        { name: 'Press', url: '#' },
        { name: 'Contact', url: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', url: '#' },
        { name: 'Privacy Policy', url: '#' },
        { name: 'Cookie Policy', url: '#' },
        { name: 'GDPR', url: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mr-2">
                T
              </div>
              <span className="text-2xl font-bold text-white">Tribbl</span>
            </div>
            <p className="mb-6">
              The ultimate online drawing and guessing game. Create, play, and share the fun with friends!
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ y: -2, color: '#818CF8' }}
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-white font-bold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                  >
                    <a 
                      href={link.url} 
                      className="text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>© {currentYear} Tribbl. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Cookies</a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Legal</a>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg"
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;