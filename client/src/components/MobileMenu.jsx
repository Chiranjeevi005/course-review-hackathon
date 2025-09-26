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
        className="relative bg-card-100 h-full w-4/5 max-w-xs ml-auto overflow-y-auto"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="p-4 border-b border-muted-500 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-extrabold text-primary-700">CourseFinder</h2>
          <motion.button 
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-muted-500 hover:text-text-900 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-500 rounded-full"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>
        
        <nav className="p-4">
          <motion.ul 
            className="space-y-3 sm:space-y-4"
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
              <a href="/" className="block py-2 text-text-900 hover:text-primary-700 font-medium transition-colors duration-200 ease-in-out text-sm sm:text-base">Home</a>
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
              }}
            >
              <a href="/courses" className="block py-2 text-text-900 hover:text-primary-700 font-medium transition-colors duration-200 ease-in-out text-sm sm:text-base">Courses</a>
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
              }}
            >
              <a href="/categories" className="block py-2 text-text-900 hover:text-primary-700 font-medium transition-colors duration-200 ease-in-out text-sm sm:text-base">Categories</a>
            </motion.li>
            {/* Removed 'Find Courses' option as per user request */}
            <motion.li
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
              }}
            >
              <a href="/reviews" className="block py-2 text-text-900 hover:text-primary-700 font-medium transition-colors duration-200 ease-in-out text-sm sm:text-base">Reviews</a>
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
              }}
            >
              <a href="/about" className="block py-2 text-text-900 hover:text-primary-700 font-medium transition-colors duration-200 ease-in-out text-sm sm:text-base">About</a>
            </motion.li>
          </motion.ul>
          
          <motion.div 
            className="mt-6 sm:mt-8 pt-4 border-t border-muted-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            {user ? (
              <div className="space-y-3">
                {/* Admin Dashboard link for admin users - positioned before logout button */}
                {user && user.role === 'admin' && (
                  <motion.a
                    href="/admin-dashboard"
                    className="block w-full text-left bg-primary-100 text-primary-700 py-2.5 sm:py-3 rounded-lg hover:bg-primary-200 transition-all duration-200 ease-in-out font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                      Admin Dashboard
                    </div>
                  </motion.a>
                )}
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-accent-500 text-text-900 py-2.5 sm:py-3 rounded-lg hover:bg-opacity-90 transition-all duration-200 ease-in-out font-semibold focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm sm:text-base"
                  onClick={() => {
                    onClose();
                    logout();
                  }}
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="space-y-3">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-accent-500 text-text-900 py-2.5 sm:py-3 rounded-lg hover:bg-opacity-90 transition-all duration-200 ease-in-out font-semibold focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm sm:text-base"
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
                  className="w-full bg-primary-600 text-white py-2.5 sm:py-3 rounded-lg hover:bg-primary-700 transition-all duration-200 ease-in-out font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
                  onClick={() => {
                    onClose();
                    window.location.href = '/login';
                  }}
                >
                  Sign Up
                </motion.button>
              </div>
            )}
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-3 border border-muted-500 text-text-900 py-2.5 sm:py-3 rounded-lg hover:bg-muted-50 transition-colors duration-200 ease-in-out font-semibold focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm sm:text-base"
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