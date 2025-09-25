import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Categories', path: '/categories' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About', path: '/about' }
  ];

  return (
    <>
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        user={user}
        logout={logout}
      />

      {/* Header */}
      <motion.header 
        className="bg-card-100 shadow-sm sticky top-0 z-40 w-full backdrop-blur-sm bg-white/80"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.h1 
                className="text-xl sm:text-2xl font-bold text-primary-700 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => window.location.href = '/'}
              >
                CourseFinder
              </motion.h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4 lg:space-x-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.path}
                  className="text-muted-500 hover:text-primary-700 transition-colors duration-200 ease-in-out text-sm sm:text-base"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>
            
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <motion.button 
                className="text-muted-500 hover:text-primary-700 transition-colors duration-200 ease-in-out"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>
              {user ? (
                <>
                  <motion.button 
                    className="bg-primary-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-primary-800 transition-all duration-200 ease-in-out font-semibold shadow-md hover:shadow-lg text-sm sm:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    Dashboard
                  </motion.button>
                  <motion.button 
                    className="bg-accent-500 text-gray-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 ease-in-out font-semibold shadow-md hover:shadow-lg text-sm sm:text-base"
                    whileHover={{ scale: 1.05, backgroundColor: "#e6951d" }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    onClick={logout}
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <button 
                    className="bg-accent-500 text-gray-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold shadow-md hover:bg-opacity-90 transition-all duration-200 text-sm sm:text-base"
                    onClick={() => window.location.href = '/login'}
                  >
                    Sign In
                  </button>
                  <button 
                    className="bg-primary-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold shadow-md hover:bg-primary-800 transition-all duration-200 text-sm sm:text-base hidden sm:block"
                    onClick={() => window.location.href = '/login'}
                  >
                    Sign Up
                  </button>
                </>
              )}
              
              {/* Mobile Menu Button */}
              <motion.button 
                className="md:hidden text-muted-500"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;