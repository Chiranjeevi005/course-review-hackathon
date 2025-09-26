import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import Navbar from '../components/Navbar';

const RecommendationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    fieldOfInterest: '',
    currentLevel: '',
    goal: '',
    learningStyle: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Questionnaire steps
  const steps = [
    {
      id: 1,
      title: "Choose your field of interest",
      options: [
        { id: 'technology', label: 'Technology', icon: '💻' },
        { id: 'business', label: 'Business', icon: '💼' },
        { id: 'arts', label: 'Arts & Creativity', icon: '🎨' },
        { id: 'health', label: 'Health & Wellness', icon: '🏥' },
        { id: 'science', label: 'Science', icon: '🔬' },
        { id: 'education', label: 'Education', icon: '📚' }
      ]
    },
    {
      id: 2,
      title: "Select your current level",
      options: [
        { id: 'beginner', label: 'Beginner', description: 'Just starting out' },
        { id: 'intermediate', label: 'Intermediate', description: 'Some experience' },
        { id: 'advanced', label: 'Advanced', description: 'Extensive experience' }
      ]
    },
    {
      id: 3,
      title: "What's your goal?",
      options: [
        { id: 'career-change', label: 'Career Change', icon: '🔄' },
        { id: 'skill-upgrade', label: 'Skill Upgrade', icon: '📈' },
        { id: 'hobby', label: 'Hobby Learning', icon: '🎯' },
        { id: 'certification', label: 'Certification', icon: '🏅' }
      ]
    },
    {
      id: 4,
      title: "Preferred learning style",
      options: [
        { id: 'video', label: 'Video Lectures', icon: '🎥' },
        { id: 'text', label: 'Text & Articles', icon: '📝' },
        { id: 'projects', label: 'Hands-on Projects', icon: '🛠️' },
        { id: 'interactive', label: 'Interactive Content', icon: '🎮' }
      ]
    }
  ];

  // Mock course recommendations
  const mockRecommendations = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
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
    },
    {
      id: 2,
      title: 'Data Science & Machine Learning',
      provider: 'Coursera',
      rating: 4.7,
      ratingCount: 9800,
      price: 4149,
      originalPrice: null,
      duration: '36 hours',
      category: 'technology',
      level: 'intermediate',
      language: 'english',
      thumbnail: 'https://placehold.co/300x200/10B981/FFFFFF?text=Data+Science',
    },
    {
      id: 3,
      title: 'Digital Marketing Mastery',
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
    },
    {
      id: 4,
      title: 'Creative Writing Workshop',
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
    }
  ];

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

  const handleSubmit = () => {
    // In a real app, this would call an API to get recommendations
    // For now, we'll use mock data
    setRecommendations(mockRecommendations);
    setIsSubmitted(true);
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

  const currentStepData = steps.find(step => step.id === currentStep);
  const isStepCompleted = answers[currentStepData?.id === 1 ? 'fieldOfInterest' : 
                                  currentStepData?.id === 2 ? 'currentLevel' : 
                                  currentStepData?.id === 3 ? 'goal' : 'learningStyle'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-white"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 rounded-full bg-white"></div>
          <div className="absolute bottom-40 right-1/3 w-20 h-20 rounded-full bg-white"></div>
          <div className="absolute top-1/3 left-1/3 w-12 h-12 rounded-full bg-white"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Find the Perfect Course for Your Future
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              Answer a few questions and let our smart recommendation engine guide you to courses tailored to your interests, career goals, and skills.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {!isSubmitted ? (
          /* Questionnaire Section */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {currentStepData?.title}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentStepData?.options.map((option) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
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
                    <div className="flex items-center">
                      {option.icon && (
                        <span className="text-2xl mr-3">{option.icon}</span>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-800">{option.label}</h3>
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
                  disabled={!isStepCompleted}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    !isStepCompleted
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90 shadow-lg'
                  }`}
                >
                  Get Recommendations
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
                className="text-2xl font-bold text-gray-800 italic max-w-2xl mx-auto"
              >
                "Your journey to success begins with the right course."
              </motion.blockquote>
            </div>

            {/* Journey Roadmap */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="flex justify-between relative">
                {/* Line connecting the steps */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-green-500 transform -translate-y-1/2 z-0"></div>
                
                {['Choose', 'Learn', 'Grow', 'Achieve'].map((step, index) => (
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

            {/* Recommendations Title */}
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Personalized Course Recommendations
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Based on your preferences, we've found these courses that align perfectly with your goals
            </p>

            {/* Recommendations Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
              layout
            >
              {recommendations.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  layout
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>

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
                Explore our full catalog of courses and take the next step toward your future.
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg text-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg"
              >
                Explore All Courses →
              </motion.button>
            </div>

            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={resetQuestionnaire}
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
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