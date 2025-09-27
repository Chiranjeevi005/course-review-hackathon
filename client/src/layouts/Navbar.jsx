import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import MobileMenu from '../components/MobileMenu';

const Navbar = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  // Navigation items
  const navItems = [
    { name: 'Courses', path: '/courses' },
    { name: 'Categories', path: '/categories' },
    { name: 'Recommendations', path: '/recommendations' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-primary-700">
              CourseFinder
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? 'text-primary-700 font-semibold border-b-2 border-primary-700'
                    : 'text-gray-600 hover:text-primary-700'
                } px-1 py-2 text-sm font-medium transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
            {/* Admin Dashboard link - only visible to admin users */}
            {user && isAdmin && (
              <Link
                to="/admin-dashboard"
                className={`${
                  location.pathname === '/admin-dashboard'
                    ? 'text-primary-700 font-semibold border-b-2 border-primary-700'
                    : 'text-gray-600 hover:text-primary-700'
                } px-1 py-2 text-sm font-medium transition-colors duration-200 flex items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <span className="hidden lg:inline">Admin</span>
                <span className="lg:hidden">Admin</span>
              </Link>
            )}
          </div>

          {/* Right side - Auth, Mobile menu button */}
          <div className="flex items-center">
            {/* Auth section */}
            <div className="hidden md:flex md:items-center md:ml-4">
              {user ? (
                <div className="flex items-center space-x-3 sm:space-x-4 bg-primary-50 px-2 py-1 sm:px-3 sm:py-1 rounded-lg">
                  <span className="text-xs sm:text-sm font-medium text-primary-800 truncate max-w-[80px] sm:max-w-[120px]">Hi, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-xs sm:text-sm font-medium text-primary-700 hover:text-primary-900 hover:underline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-3 sm:space-x-4">
                  <Link
                    to="/login"
                    className="text-xs sm:text-sm font-medium text-primary-700 hover:text-primary-900 hover:underline"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="text-xs sm:text-sm font-medium text-primary-600 bg-primary-100 hover:bg-primary-200 px-2 py-1 sm:px-3 sm:py-1 rounded-lg"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-primary-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-700"
                aria-label="Open menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu 
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            user={user}
            onLogout={handleLogout}
            navItems={navItems}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;