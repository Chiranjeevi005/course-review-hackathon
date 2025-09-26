import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import Select from 'react-select';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    location: null
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Indian cities data
  const indianCities = [
    { value: 'mumbai', label: 'Mumbai, Maharashtra' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore, Karnataka' },
    { value: 'hyderabad', label: 'Hyderabad, Telangana' },
    { value: 'chennai', label: 'Chennai, Tamil Nadu' },
    { value: 'kolkata', label: 'Kolkata, West Bengal' },
    { value: 'pune', label: 'Pune, Maharashtra' },
    { value: 'ahmedabad', label: 'Ahmedabad, Gujarat' },
    { value: 'jaipur', label: 'Jaipur, Rajasthan' },
    { value: 'lucknow', label: 'Lucknow, Uttar Pradesh' },
    { value: 'kochi', label: 'Kochi, Kerala' },
    { value: 'bhopal', label: 'Bhopal, Madhya Pradesh' },
    { value: 'indore', label: 'Indore, Madhya Pradesh' },
    { value: 'nagpur', label: 'Nagpur, Maharashtra' },
    { value: 'patna', label: 'Patna, Bihar' },
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'goa', label: 'Goa' },
    { value: 'shimla', label: 'Shimla, Himachal Pradesh' },
    { value: 'srinagar', label: 'Srinagar, Jammu and Kashmir' },
    { value: 'amritsar', label: 'Amritsar, Punjab' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLocationChange = (selectedOption) => {
    setFormData(prev => ({
      ...prev,
      location: selectedOption
    }));
    
    // Clear location error if it exists
    if (errors.location) {
      setErrors(prev => ({
        ...prev,
        location: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    }
    
    // Location is optional but if provided, validate
    if (formData.location && !indianCities.some(city => city.value === formData.location.value)) {
      newErrors.location = 'Please select a valid location';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call - in a real app, this would be an actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form and show success message
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        location: null
      });
      setSubmitSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      // In a real app, you would show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email Us',
      content: 'support@coursefinder.com'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Call Us',
      content: '+91 98765 43210'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Visit Us',
      content: 'Education Tower, Mumbai, Maharashtra 400001, India'
    }
  ];

  // Select styles
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: errors.location ? '#ef4444' : '#d1d5db',
      boxShadow: 'none',
      '&:hover': {
        borderColor: errors.location ? '#ef4444' : '#9ca3af'
      },
      borderRadius: '0.5rem',
      padding: '0.25rem'
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999
    })
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-primary-700 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get in Touch with Us
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Have questions, feedback, or need support? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Section - Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-900 mb-6">Contact Information</h2>
                <p className="text-muted-500 mb-8">
                  Reach out to us through any of the following channels. Our team is ready to assist you with any questions or concerns.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start p-4 bg-card-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex-shrink-0 p-3 bg-primary-700 text-white rounded-lg mr-4">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-900 text-lg">{info.title}</h3>
                      <p className="text-muted-500 mt-1">{info.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Section */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-text-900 mb-4">Our Location in India</h3>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  {/* Embedded Google Map */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.8571230491!2d72.77004015717754!3d19.08252231808947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1652966282479!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Our Location in Mumbai, India"
                  ></iframe>
                </div>
                <div className="mt-3 text-center">
                  <p className="font-semibold text-text-900">Education Tower</p>
                  <p className="text-muted-500">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </motion.div>

            {/* Right Section - Contact Form */}
            <motion.div
              className="bg-card-100 rounded-xl shadow-lg p-6 sm:p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-text-900 mb-6">Send us a Message</h2>
              
              {submitSuccess && (
                <motion.div 
                  className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thank you for your message! We'll get back to you soon.
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-900 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-muted-500'} focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-900 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-muted-500'} focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-text-900 mb-1">
                    Location in India (Optional)
                  </label>
                  <Select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleLocationChange}
                    options={indianCities}
                    placeholder="Select your city..."
                    isClearable
                    styles={customSelectStyles}
                    className="w-full"
                  />
                  {errors.location && <p className="mt-1 text-red-500 text-sm">{errors.location}</p>}
                  <p className="mt-1 text-muted-500 text-sm">Help us understand your location better</p>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-900 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-muted-500 focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all duration-200"
                    placeholder="Enter subject (optional)"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-900 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-muted-500'} focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter your message (minimum 20 characters)"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-800 transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
              
              <div className="mt-6 pt-6 border-t border-muted-500">
                <p className="text-muted-500 text-sm">
                  Need faster help? <a href="#" className="text-primary-700 hover:underline">Visit our Help Center</a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;