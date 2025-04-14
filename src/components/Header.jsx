import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/play', name: 'Play' },
    { path: '/create', name: 'Create Room' },
    { path: '/friends', name: 'Friends' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-gradient-to-r from-indigo-600 to-purple-600 py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${scrolled ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'} text-xl font-bold`}>
                T
              </div>
              <span className={`text-2xl font-bold ${scrolled ? 'text-indigo-600' : 'text-white'}`}>Tribbl</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 font-medium transition-colors ${location.pathname === link.path ? 
                  (scrolled ? 'text-indigo-600' : 'text-white') : 
                  (scrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-indigo-100 hover:text-white')}`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="header-underline"
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-white"
                    initial={false}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button className={`px-4 py-2 rounded-full font-medium transition-all ${scrolled ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-indigo-600 hover:bg-indigo-50'}`}>
              Login
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Play Now
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className={`w-6 h-6 ${scrolled ? 'text-indigo-600' : 'text-white'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 font-medium rounded-lg ${location.pathname === link.path ? 
                    'bg-indigo-100 text-indigo-600' : 
                    'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200">
                <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium mb-2">
                  Login
                </button>
                <button className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded-lg font-bold">
                  Play Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;