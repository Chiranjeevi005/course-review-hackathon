import React from 'react';
import { motion } from 'framer-motion';

const MobileMenu = ({ isOpen, onClose, user, logout }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50">
      {/* Backdrop */}
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      ></motion.div>
      
      {/* Menu Panel */}
      <motion.div 
        className="relative bg-card-100 h-full w-4/5 max-w-sm ml-auto overflow-y-auto"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="p-4 border-b border-muted-500 flex justify-between items-center">
          <h2 className="text-h3 font-extrabold text-primary-700">CourseFinder</h2>
          <motion.button 
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-muted-500 hover:text-text-900 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-500 rounded-full"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>
        
        <nav className="p-4">
          <motion.ul 
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.li
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
              }}
            >
              <a href="#" className="block py-2 text-text-900 hover:text-primary-700 font-medium transition-colors duration-200 ease-in-out">Home</a>
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
              }}
            >
              <a href="#" className="block py-2 text-text-900 hover:text-primary-700 font-medium transition-colors duration-200 ease-in-out">Courses</a>
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
              }}
            >
              <a href="#" className="block py-2 text-text-900 hover:text-primary-700 font-medium transition-colors duration-200 ease-in-out">Categories</a>
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
              }}
            >
              <a href="#" className="block py-2 text-text-900 hover:text-primary-700 font-medium transition-colors duration-200 ease-in-out">Reviews</a>
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
              }}
            >
              <a href="#" className="block py-2 text-text-900 hover:text-primary-700 font-medium transition-colors duration-200 ease-in-out">About</a>
            </motion.li>
          </motion.ul>
          
          <motion.div 
            className="mt-8 pt-4 border-t border-muted-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            {user ? (
              <>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-all duration-200 ease-in-out font-semibold mb-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onClick={() => {
                    onClose();
                    window.location.href = '/dashboard';
                  }}
                >
                  Dashboard
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-accent-500 text-text-900 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-200 ease-in-out font-semibold mb-3 focus:outline-none focus:ring-2 focus:ring-accent-500"
                  onClick={logout}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-accent-500 text-text-900 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-200 ease-in-out font-semibold mb-3 focus:outline-none focus:ring-2 focus:ring-accent-500"
                  onClick={() => {
                    onClose();
                    window.location.href = '/login';
                  }}
                >
                  Sign In
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-all duration-200 ease-in-out font-semibold mb-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onClick={() => {
                    onClose();
                    window.location.href = '/login';
                  }}
                >
                  Sign Up
                </motion.button>
              </>
            )}
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full border border-muted-500 text-text-900 py-3 rounded-lg hover:bg-muted-50 transition-colors duration-200 ease-in-out font-semibold focus:outline-none focus:ring-2 focus:ring-accent-500"
            >
              Get Curated Picks
            </motion.button>
          </motion.div>
        </nav>
      </motion.div>
    </div>
  );
};

export default MobileMenu;