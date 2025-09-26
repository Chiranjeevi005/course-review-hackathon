import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import Navbar from '../components/Navbar';

const RecommendationPage = () => {
  const { user } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    fieldOfInterest: '',
    currentLevel: '',
    goal: '',
    learningStyle: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [careerPaths, setCareerPaths] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [filters, setFilters] = useState({
    level: 'all',
    duration: 'all',
    price: 'all',
    platform: 'all'
  });

  // Questionnaire steps
  const steps = [
    {
      id: 1,
      title: "What field interests you the most?",
      description: "Select the area that excites you the most for your future career or personal development.",
      options: [
        { id: 'technology', label: 'Technology & IT', icon: '💻', description: 'Web development, AI, cybersecurity, etc.' },
        { id: 'business', label: 'Business & Entrepreneurship', icon: '💼', description: 'Marketing, finance, startups, etc.' },
        { id: 'data-science', label: 'Data Science & Analytics', icon: '📊', description: 'Machine learning, data analysis, etc.' },
        { id: 'design', label: 'Design & Creativity', icon: '🎨', description: 'UI/UX, graphic design, multimedia, etc.' },
        { id: 'health', label: 'Health & Wellness', icon: '🏥', description: 'Fitness, nutrition, mental health, etc.' },
        { id: 'education', label: 'Education & Teaching', icon: '📚', description: 'Online teaching, curriculum design, etc.' }
      ]
    },
    {
      id: 2,
      title: "What's your current skill level?",
      description: "Be honest about your experience to get the most accurate recommendations.",
      options: [
        { id: 'beginner', label: 'Beginner', description: 'Just starting out, no prior experience' },
        { id: 'intermediate', label: 'Intermediate', description: 'Some experience, looking to advance' },
        { id: 'advanced', label: 'Advanced', description: 'Extensive experience, seeking mastery' }
      ]
    },
    {
      id: 3,
      title: "What's your primary goal?",
      description: "Tell us what you want to achieve with your learning journey.",
      options: [
        { id: 'career-change', label: 'Career Change', icon: '🔄', description: 'Switching to a new field or industry' },
        { id: 'skill-upgrade', label: 'Skill Upgrade', icon: '📈', description: 'Enhancing current professional skills' },
        { id: 'hobby', label: 'Hobby Learning', icon: '🎯', description: 'Learning for personal interest and growth' },
        { id: 'certification', label: 'Certification', icon: '🏅', description: 'Preparing for industry certifications' }
      ]
    },
    {
      id: 4,
      title: "How do you prefer to learn?",
      description: "Choose the learning style that works best for you.",
      options: [
        { id: 'video', label: 'Video Lectures', icon: '🎥', description: 'Pre-recorded or live video content' },
        { id: 'text', label: 'Text & Articles', icon: '📝', description: 'Reading materials and documentation' },
        { id: 'projects', label: 'Hands-on Projects', icon: '🛠️', description: 'Building real-world applications' },
        { id: 'interactive', label: 'Interactive Content', icon: '🎮', description: 'Quizzes, simulations, and gamified learning' }
      ]
    }
  ];

  // Mock career paths data
  const mockCareerPaths = [
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'From frontend to full-stack development',
      icon: '💻',
      roadmap: [
        { level: 'Entry', duration: '3-6 months', courses: 3, description: 'HTML, CSS, JavaScript basics' },
        { level: 'Intermediate', duration: '6-12 months', courses: 5, description: 'React, Node.js, databases' },
        { level: 'Advanced', duration: '12+ months', courses: 7, description: 'Full-stack projects, DevOps, cloud' }
      ]
    },
    {
      id: 'data-science',
      title: 'Data Science',
      description: 'From data analysis to machine learning',
      icon: '📊',
      roadmap: [
        { level: 'Entry', duration: '4-6 months', courses: 4, description: 'Python, statistics, data visualization' },
        { level: 'Intermediate', duration: '8-12 months', courses: 6, description: 'Machine learning, SQL, big data' },
        { level: 'Advanced', duration: '12+ months', courses: 8, description: 'Deep learning, NLP, AI research' }
      ]
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      description: 'Protecting digital assets and infrastructure',
      icon: '🔒',
      roadmap: [
        { level: 'Entry', duration: '3-6 months', courses: 3, description: 'Network security, fundamentals' },
        { level: 'Intermediate', duration: '6-12 months', courses: 5, description: 'Ethical hacking, penetration testing' },
        { level: 'Advanced', duration: '12+ months', courses: 7, description: 'Forensics, compliance, security architecture' }
      ]
    }
  ];

  // Mock trending topics data
  const mockTrendingTopics = [
    { id: 'ai', name: 'Artificial Intelligence', courses: 1240, icon: '🤖' },
    { id: 'blockchain', name: 'Blockchain & Web3', courses: 890, icon: '🔗' },
    { id: 'cloud', name: 'Cloud Computing', courses: 1560, icon: '☁️' },
    { id: 'cybersecurity', name: 'Cybersecurity', courses: 1120, icon: '🔒' },
    { id: 'data-science', name: 'Data Science', courses: 1430, icon: '📊' },
    { id: 'devops', name: 'DevOps', courses: 780, icon: '⚙️' }
  ];

  // Mock testimonials data
  const mockTestimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Frontend Developer at TechCorp',
      quote: 'The personalized recommendations helped me transition from marketing to tech in just 8 months!',
      avatar: 'https://placehold.co/80x80/4F46E5/FFFFFF?text=SJ',
      before: 'Marketing Specialist',
      after: 'Frontend Developer',
      salary: '₹8,50,000'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Data Scientist at FinTech Inc',
      quote: 'I went from beginner to landing my dream job with a 40% salary increase in under a year.',
      avatar: 'https://placehold.co/80x80/10B981/FFFFFF?text=MC',
      before: 'Accountant',
      after: 'Data Scientist',
      salary: '₹12,00,000'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      role: 'UX Designer at DesignStudio',
      quote: 'The career roadmap feature gave me clarity on exactly what skills I needed to develop.',
      avatar: 'https://placehold.co/80x80/8B5CF6/FFFFFF?text=PS',
      before: 'Graphic Designer',
      after: 'UX Designer',
      salary: '₹9,20,000'
    }
  ];

  // Mock course recommendations
  const mockRecommendations = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      description: 'Master HTML, CSS, JavaScript, React, Node.js and build real-world projects.',
      provider: 'Udemy',
      rating: 4.8,
      ratingCount: 12400,
      price: 7469,
      originalPrice: 10792,
      duration: '42 hours',
      category: 'technology',
      level: 'beginner',
      language: 'english',
      thumbnail: 'https://placehold.co/300x200/4F46E5/FFFFFF?text=Web+Dev',
      reason: 'Because you\'re interested in Technology & have beginner skills',
      platform: 'Udemy'
    },
    {
      id: 2,
      title: 'Data Science & Machine Learning',
      description: 'Learn Python, data analysis, visualization, and machine learning algorithms.',
      provider: 'Coursera',
      rating: 4.7,
      ratingCount: 9800,
      price: 4149,
      originalPrice: null,
      duration: '36 hours',
      category: 'data-science',
      level: 'intermediate',
      language: 'english',
      thumbnail: 'https://placehold.co/300x200/10B981/FFFFFF?text=Data+Science',
      reason: 'Because you want to upgrade your skills in Data Science',
      platform: 'Coursera'
    },
    {
      id: 3,
      title: 'Digital Marketing Mastery',
      description: 'Master SEO, social media marketing, content marketing, and analytics.',
      provider: 'Skillshare',
      rating: 4.9,
      ratingCount: 5600,
      price: 2489,
      originalPrice: 4979,
      duration: '20 hours',
      category: 'business',
      level: 'beginner',
      language: 'english',
      thumbnail: 'https://placehold.co/300x200/8B5CF6/FFFFFF?text=Marketing',
      reason: 'Because you\'re interested in Business & want career change',
      platform: 'Skillshare'
    },
    {
      id: 4,
      title: 'Creative Writing Workshop',
      description: 'Develop your writing skills and learn to craft compelling stories.',
      provider: 'MasterClass',
      rating: 4.6,
      ratingCount: 7200,
      price: 6639,
      originalPrice: 8299,
      duration: '15 hours',
      category: 'arts',
      level: 'intermediate',
      language: 'english',
      thumbnail: 'https://placehold.co/300x200/EC4899/FFFFFF?text=Writing',
      reason: 'Because you prefer interactive learning & have intermediate skills',
      platform: 'MasterClass'
    },
    {
      id: 5,
      title: 'Cybersecurity Fundamentals',
      description: 'Learn network security, cryptography, and threat analysis.',
      provider: 'edX',
      rating: 4.8,
      ratingCount: 8900,
      price: 3999,
      originalPrice: null,
      duration: '30 hours',
      category: 'technology',
      level: 'beginner',
      language: 'english',
      thumbnail: 'https://placehold.co/300x200/F59E0B/FFFFFF?text=Cybersecurity',
      reason: 'Because you\'re interested in Technology & prefer hands-on projects',
      platform: 'edX'
    },
    {
      id: 6,
      title: 'UI/UX Design Masterclass',
      description: 'Master design thinking, prototyping, and user research techniques.',
      provider: 'Udacity',
      rating: 4.7,
      ratingCount: 6700,
      price: 5499,
      originalPrice: 7999,
      duration: '25 hours',
      category: 'design',
      level: 'intermediate',
      language: 'english',
      thumbnail: 'https://placehold.co/300x200/06B6D4/FFFFFF?text=UI%2FUX',
      reason: 'Because you\'re interested in Design & want skill upgrade',
      platform: 'Udacity'
    }
  ];

  useEffect(() => {
    // Initialize with mock data
    setCareerPaths(mockCareerPaths);
    setTrendingTopics(mockTrendingTopics);
    setTestimonials(mockTestimonials);
  }, []);

  const handleOptionSelect = (stepId, optionId) => {
    const stepKeyMap = {
      1: 'fieldOfInterest',
      2: 'currentLevel',
      3: 'goal',
      4: 'learningStyle'
    };
    
    setAnswers(prev => ({
      ...prev,
      [stepKeyMap[stepId]]: optionId
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would call an API to get recommendations
      // For now, we'll use mock data
      setRecommendations(mockRecommendations);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuestionnaire = () => {
    setCurrentStep(1);
    setAnswers({
      fieldOfInterest: '',
      currentLevel: '',
      goal: '',
      learningStyle: ''
    });
    setRecommendations([]);
    setIsSubmitted(false);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredRecommendations = recommendations.filter(course => {
    if (filters.level !== 'all' && course.level !== filters.level) return false;
    if (filters.price !== 'all') {
      if (filters.price === 'free' && course.price > 0) return false;
      if (filters.price === 'paid' && course.price === 0) return false;
    }
    if (filters.platform !== 'all' && course.platform !== filters.platform) return false;
    return true;
  });

  const currentStepData = steps.find(step => step.id === currentStep);
  const isStepCompleted = answers[
    currentStep === 1 ? 'fieldOfInterest' : 
    currentStep === 2 ? 'currentLevel' : 
    currentStep === 3 ? 'goal' : 'learningStyle'
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-white sm:top-10 sm:left-10 sm:w-32 sm:h-32"></div>
          <div className="absolute top-20 right-10 w-12 h-12 rounded-full bg-white sm:top-40 sm:right-20 sm:w-24 sm:h-24"></div>
          <div className="absolute bottom-10 left-1/4 w-8 h-8 rounded-full bg-white sm:bottom-20 sm:w-16 sm:h-16"></div>
          <div className="absolute bottom-20 right-1/3 w-10 h-10 rounded-full bg-white sm:bottom-40 sm:w-20 sm:h-20"></div>
          <div className="absolute top-1/3 left-1/3 w-6 h-6 rounded-full bg-white sm:top-1/3 sm:w-12 sm:h-12"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl sm:max-w-4xl mx-auto text-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Your Personal Career Advisor & Course Recommender
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8">
              Answer a few questions and let our AI-powered engine guide you to courses tailored to your interests, career goals, and skills.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12 lg:py-16">
        {!isSubmitted ? (
          /* Questionnaire Section */
          <motion.div
            id="questionnaire-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Progress Bar */}
            <div className="mb-10">
              <div className="flex justify-between mb-2 text-sm font-medium text-gray-600">
                <span>Step {currentStep} of {steps.length}</span>
                <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  initial={{ width: `${((currentStep - 1) / steps.length) * 100}%` }}
                  animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                {currentStepData?.title}
              </h2>
              <p className="text-gray-600 text-center mb-6">
                {currentStepData?.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentStepData?.options.map((option) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                      answers[
                        currentStep === 1 ? 'fieldOfInterest' :
                        currentStep === 2 ? 'currentLevel' :
                        currentStep === 3 ? 'goal' : 'learningStyle'
                      ] === option.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                    }`}
                    onClick={() => handleOptionSelect(currentStep, option.id)}
                  >
                    <div className="flex items-start">
                      {option.icon && (
                        <span className="text-2xl mr-3 mt-0.5">{option.icon}</span>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{option.label}</h3>
                        {option.description && (
                          <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              
              {currentStep < steps.length ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepCompleted}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    !isStepCompleted
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90'
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepCompleted || isLoading}
                  className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                    !isStepCompleted || isLoading
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90 shadow-lg'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Recommendations...
                    </>
                  ) : (
                    'Get My Recommendations'
                  )}
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          /* Results Section */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Motivational Quote */}
            <div className="text-center mb-12">
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-gray-800 italic max-w-3xl mx-auto"
              >
                "Your journey to success begins with the right course. Let's make it happen together."
              </motion.blockquote>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 mt-4"
              >
                Based on your preferences, we've found these courses that align perfectly with your goals
              </motion.p>
            </div>

            {/* Journey Roadmap */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Your Learning Journey Roadmap</h2>
              <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                Follow this structured path to achieve your career goals step by step
              </p>
              <div className="flex justify-between relative">
                {/* Line connecting the steps */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-green-500 transform -translate-y-1/2 z-0"></div>
                
                {['Discover', 'Learn', 'Build', 'Succeed'].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="relative z-10 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg mb-2 mx-auto">
                      {index + 1}
                    </div>
                    <span className="font-semibold text-gray-700">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Smart Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Filter Recommendations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select
                    value={filters.level}
                    onChange={(e) => handleFilterChange('level', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <select
                    value={filters.price}
                    onChange={(e) => handleFilterChange('price', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Prices</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                  <select
                    value={filters.platform}
                    onChange={(e) => handleFilterChange('platform', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Platforms</option>
                    <option value="Udemy">Udemy</option>
                    <option value="Coursera">Coursera</option>
                    <option value="edX">edX</option>
                    <option value="Udacity">Udacity</option>
                    <option value="Skillshare">Skillshare</option>
                    <option value="MasterClass">MasterClass</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setFilters({ level: 'all', duration: 'all', price: 'all', platform: 'all' })}
                    className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Recommendations Title */}
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Personalized Course Recommendations
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Courses tailored to your interests and goals
            </p>

            {/* Recommendations Grid */}
            {filteredRecommendations.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
                layout
              >
                {filteredRecommendations.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    layout
                  >
                    <div className="bg-white rounded-lg shadow-md p-4 mb-3">
                      <p className="text-sm text-blue-600 font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.reason}
                      </p>
                    </div>
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg mb-16">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses match your filters</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters to see more recommendations</p>
                <button
                  onClick={() => setFilters({ level: 'all', duration: 'all', price: 'all', platform: 'all' })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Career Paths Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Career Path Guidance</h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Explore structured learning paths for trending career fields
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {careerPaths.map((path, index) => (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                      <div className="flex items-center mb-3">
                        <span className="text-3xl mr-3">{path.icon}</span>
                        <h3 className="text-xl font-bold">{path.title}</h3>
                      </div>
                      <p className="opacity-90">{path.description}</p>
                    </div>
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-4">Learning Roadmap</h4>
                      <div className="space-y-4">
                        {path.roadmap.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm mr-3 mt-0.5">
                              {stepIndex + 1}
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">{step.level} Level</h5>
                              <p className="text-sm text-gray-600">{step.duration} • {step.courses} courses</p>
                              <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity">
                        Explore Path
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trending Topics Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Trending Skills & Technologies</h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Discover the most in-demand skills in today's job market
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="text-3xl mb-3">{topic.icon}</div>
                    <h3 className="font-semibold text-gray-800 mb-1">{topic.name}</h3>
                    <p className="text-sm text-gray-600">{topic.courses} courses</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Success Stories Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Success Stories</h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Real people who transformed their careers with our recommendations
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-gray-600">Before</p>
                        <p className="font-medium">{testimonial.before}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">Now</p>
                        <p className="font-medium">{testimonial.after}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-center font-bold text-green-600">New Salary: {testimonial.salary}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white mb-16">
              <motion.h2 
                className="text-2xl sm:text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Ready to start your journey?
              </motion.h2>
              <motion.p 
                className="text-lg opacity-90 mb-6 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Create an account to save your recommendations and track your progress
              </motion.p>
              {user ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg text-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  Go to Dashboard →
                </motion.button>
              ) : (
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg text-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg"
                    onClick={() => window.location.href = '/register'}
                  >
                    Create Account
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 shadow-lg"
                    onClick={() => window.location.href = '/login'}
                  >
                    Sign In
                  </motion.button>
                </div>
              )}
            </div>

            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={resetQuestionnaire}
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center justify-center mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Take the quiz again
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RecommendationPage;