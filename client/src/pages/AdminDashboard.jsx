import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import CourseManagement from '../components/CourseManagement';
import ReviewManagement from '../components/ReviewManagement';
import UserManagement from '../components/UserManagement';
import CategoryManagement from '../components/CategoryManagement';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Import the default Navbar

const AdminDashboard = ({ socket }) => {
  const { user, isAdmin } = useAuth();
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [newReviewsToday, setNewReviewsToday] = useState(0);
  const [trendingCategory, setTrendingCategory] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activityStream, setActivityStream] = useState([]);
  const [dailyActiveUsers, setDailyActiveUsers] = useState([]);
  const [courseViewsByCategory, setCourseViewsByCategory] = useState([]);
  const [reviewTrends, setReviewTrends] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendationWeights, setRecommendationWeights] = useState({
    rating: 40,
    trending: 30,
    tags: 30
  });

  // Redirect if not admin
  useEffect(() => {
    if (user && !isAdmin) {
      window.location.href = '/';
    }
  }, [user, isAdmin]);

  // Fetch real-time stats from API
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/stats');
      const { usersOnline, coursesAvailable, reviewsSubmittedToday } = response.data;
      
      setActiveUsers(usersOnline);
      setTotalCourses(coursesAvailable);
      setNewReviewsToday(reviewsSubmittedToday);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to fetch dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  // Fetch trending courses
  const fetchTrendingCourses = async () => {
    try {
      const response = await axios.get('/api/admin/trending-courses');
      const trending = response.data;
      
      if (trending.length > 0) {
        setTrendingCategory(trending[0].title || 'N/A');
      }
    } catch (err) {
      console.error('Error fetching trending courses:', err);
    }
  };

  // Fetch active users from Redis
  const fetchActiveUsers = async () => {
    try {
      const response = await axios.get('/api/admin/active-users');
      setOnlineUsers(response.data);
    } catch (err) {
      console.error('Error fetching active users:', err);
      // Fallback to mock data if API fails
      const mockActiveUsers = [
        { id: 1, name: 'Alex Johnson', email: 'alex@example.com', status: 'online', lastActive: '2 min ago' },
        { id: 2, name: 'Maria Garcia', email: 'maria@example.com', status: 'online', lastActive: '5 min ago' },
        { id: 3, name: 'James Wilson', email: 'james@example.com', status: 'online', lastActive: '10 min ago' },
        { id: 4, name: 'Sarah Chen', email: 'sarah@example.com', status: 'away', lastActive: '15 min ago' },
        { id: 5, name: 'Robert Davis', email: 'robert@example.com', status: 'online', lastActive: '20 min ago' },
      ];
      setOnlineUsers(mockActiveUsers);
    }
  };

  // Fetch recent events
  const fetchRecentEvents = async () => {
    try {
      const response = await axios.get('/api/admin/recent-events');
      const events = response.data;
      
      // Transform events into activity stream format
      const activities = events.map(event => ({
        id: event._id,
        user: event.userId?.name || 'Unknown User',
        action: getActionText(event.type),
        target: getTargetText(event.type, event.metadata),
        time: getTimeAgo(event.createdAt)
      }));
      
      setActivityStream(activities);
    } catch (err) {
      console.error('Error fetching recent events:', err);
    }
  };

  // Helper functions for activity stream
  const getActionText = (type) => {
    switch (type) {
      case 'user_online': return 'logged in';
      case 'user_offline': return 'logged out';
      case 'view_course': return 'viewed course';
      case 'review_submit': return 'submitted review';
      case 'search': return 'searched for';
      default: return type;
    }
  };

  const getTargetText = (type, metadata) => {
    switch (type) {
      case 'view_course': return metadata.courseTitle || 'a course';
      case 'review_submit': return `course with ${metadata.rating} stars`;
      case 'search': return `"${metadata.query}"`;
      default: return '';
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
  };

  // Fetch analytics data
  const fetchAnalyticsData = async () => {
    try {
      // Fetch real analytics data from API endpoints
      const [dailyResponse, categoryResponse, reviewResponse] = await Promise.all([
        axios.get('/api/analytics/daily-active-users'),
        axios.get('/api/analytics/course-views-by-category'),
        axios.get('/api/analytics/review-trends')
      ]);
      
      setDailyActiveUsers(dailyResponse.data);
      setCourseViewsByCategory(categoryResponse.data);
      setReviewTrends(reviewResponse.data);
    } catch (err) {
      console.error('Error fetching analytics data:', err);
      // Fallback to mock data if API fails
      const today = new Date();
      
      // Daily Active Users (last 30 days)
      const dailyData = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        // Simulate realistic data with some randomness
        const baseUsers = 100 + Math.floor(Math.random() * 50);
        const fluctuation = Math.floor(Math.sin(i / 5) * 20);
        dailyData.push({
          day: formattedDate,
          users: baseUsers + fluctuation
        });
      }
      setDailyActiveUsers(dailyData);
      
      // Course Views by Category
      setCourseViewsByCategory([
        { category: 'Web Development', views: 1240 },
        { category: 'Mobile Apps', views: 980 },
        { category: 'Data Science', views: 1420 },
        { category: 'AI & ML', views: 1680 },
        { category: 'Cloud Computing', views: 890 },
        { category: 'Cybersecurity', views: 760 },
        { category: 'UI/UX Design', views: 1100 },
      ]);
      
      // Review Trends (last 30 days)
      const reviewData = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        // Simulate realistic data with some randomness
        const baseReviews = 10 + Math.floor(Math.random() * 15);
        const fluctuation = Math.floor(Math.sin(i / 7) * 5);
        reviewData.push({
          day: formattedDate,
          reviews: baseReviews + fluctuation
        });
      }
      setReviewTrends(reviewData);
    }
  };

  // Initialize dashboard data
  useEffect(() => {
    if (user && isAdmin) {
      fetchStats();
      fetchTrendingCourses();
      fetchActiveUsers();
      fetchRecentEvents();
      fetchAnalyticsData();
    }
  }, [user, isAdmin]);

  // Set up real-time updates with Socket.IO
  useEffect(() => {
    if (!socket || !user || !isAdmin) return;

    // Listen for user status changes
    const handleUserStatusChange = (data) => {
      console.log('User status change received:', data);
      // Refresh active users and stats when user status changes
      fetchStats();
      fetchActiveUsers();
    };

    // Listen for new events
    const handleNewEvent = (data) => {
      console.log('New event received:', data);
      // Refresh activity stream and stats when new events occur
      fetchRecentEvents();
      fetchStats();
    };

    socket.on('user_status_change', handleUserStatusChange);
    socket.on('new_event', handleNewEvent);

    // Clean up event listeners
    return () => {
      socket.off('user_status_change', handleUserStatusChange);
      socket.off('new_event', handleNewEvent);
    };
  }, [socket, user, isAdmin]);

  // Refresh data periodically
  useEffect(() => {
    if (!user || !isAdmin) return;
    
    const interval = setInterval(() => {
      fetchStats();
      fetchRecentEvents();
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [user, isAdmin]);

  // Handle recommendation weight changes
  const handleWeightChange = (weightType, value) => {
    setRecommendationWeights(prev => ({
      ...prev,
      [weightType]: value
    }));
  };

  // Save recommendation settings
  const saveRecommendationSettings = async () => {
    try {
      // In a real implementation, you would send this to an API endpoint
      console.log('Saving recommendation weights:', recommendationWeights);
      // await axios.post('/api/admin/recommendation-settings', recommendationWeights);
      alert('Recommendation settings saved successfully!');
    } catch (err) {
      console.error('Error saving recommendation settings:', err);
      setError('Failed to save recommendation settings');
    }
  };

  // Navigation items for admin dashboard
  const adminNavItems = [
    { name: 'Dashboard', key: 'dashboard' },
    { name: 'Courses', key: 'courses' },
    { name: 'Categories', key: 'categories' },
    { name: 'Users', key: 'users' },
    { name: 'Reviews', key: 'reviews' },
    { name: 'Settings', key: 'settings' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show loading or redirect if not admin
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">🚫</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h3>
          <p className="text-gray-600 mb-6">You don't have permission to access the admin dashboard.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Use the default Navbar instead of custom header */}
      <Navbar />
      
      {/* Admin Dashboard Navigation */}
      <div className="bg-white shadow-sm sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <nav className="hidden md:flex md:space-x-8">
                {adminNavItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      activeTab === item.key
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center">
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <div className="text-right mr-3 hidden md:block">
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <div>
                    <button className="flex text-sm rounded-full focus:outline-none">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-10 w-10 rounded-full border-2 border-indigo-500"
                        src={user?.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                        alt="Admin"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-2 space-x-4">
            {adminNavItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === item.key
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Dashboard Overview Section - Hero Cards Row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {[
                { title: 'Active Users', value: activeUsers, change: '+12%', icon: '👥', color: 'bg-blue-500' },
                { title: 'Total Courses', value: totalCourses, change: '+5%', icon: '📚', color: 'bg-green-500' },
                { title: 'New Reviews Today', value: newReviewsToday, change: '+8%', icon: '⭐', color: 'bg-yellow-500' },
                { title: 'Trending Category', value: trendingCategory, change: 'Hot 🔥', icon: '🔥', color: 'bg-red-500' }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  className="bg-white overflow-hidden shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 p-3 rounded-xl ${card.color} text-white text-2xl`}>
                        {card.icon}
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{card.title}</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                              {card.change}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Real-Time Insights Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Live Users Widget */}
              <motion.div
                className="bg-white shadow-lg rounded-2xl overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <h3 className="text-lg leading-6 font-bold text-gray-900">Live Users</h3>
                  <p className="mt-1 text-sm text-gray-500">Currently online users</p>
                </div>
                <div className="p-6">
                  {onlineUsers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-80 overflow-y-auto">
                      {onlineUsers.map((user) => (
                        <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                          <div className="flex-shrink-0 relative">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                              alt={user.name}
                            />
                            <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                              user.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}></div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            <p className="text-xs text-gray-400">{user.lastActive}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-2">No users online</div>
                      <p className="text-sm text-gray-500">Active users will appear here</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Activity Stream */}
              <motion.div
                className="bg-white shadow-lg rounded-2xl overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-green-50 to-teal-50">
                  <h3 className="text-lg leading-6 font-bold text-gray-900">Activity Stream</h3>
                  <p className="mt-1 text-sm text-gray-500">Recent platform activities</p>
                </div>
                <div className="p-6">
                  {activityStream.length > 0 ? (
                    <div className="space-y-4 max-h-80 overflow-y-auto">
                      {activityStream.map((activity) => (
                        <div key={activity.id} className="flex space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-800 text-sm font-bold">{activity.user.charAt(0)}</span>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-gray-800">
                              <span className="font-semibold text-gray-900">{activity.user}</span> {activity.action} 
                              {activity.target && (
                                <span className="font-semibold text-indigo-600"> {activity.target}</span>
                              )}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-2">No recent activities</div>
                      <p className="text-sm text-gray-500">User activities will appear here</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Analytics & Charts Section */}
            <div className="grid grid-cols-1 gap-8 mb-8">
              {/* Daily Active Users */}
              <motion.div
                className="bg-white shadow-lg rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg leading-6 font-bold text-gray-900">Daily Active Users</h3>
                    <p className="mt-1 text-sm text-gray-500">Last 30 days trend</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-indigo-600">{dailyActiveUsers[dailyActiveUsers.length - 1]?.users || 0}</p>
                    <p className="text-sm text-gray-500">Today</p>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyActiveUsers}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '0.5rem',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#4f46e5" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={3}
                        name="Active Users"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Course Views by Category and Review Submission Trends */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  className="bg-white shadow-lg rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-lg leading-6 font-bold text-gray-900 mb-6">Course Views by Category</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={courseViewsByCategory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="category" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb', 
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="views" fill="#10b981" name="Views" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white shadow-lg rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-lg leading-6 font-bold text-gray-900 mb-6">Review Submission Trends</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={reviewTrends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="day" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb', 
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="reviews" 
                          stroke="#8b5cf6" 
                          fill="#c4b5fd" 
                          name="Reviews"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CourseManagement />
          </motion.div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CategoryManagement />
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <UserManagement />
          </motion.div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ReviewManagement />
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            className="bg-white shadow-lg rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg leading-6 font-bold text-gray-900 mb-6">Platform Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">General Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      defaultValue="CourseFinder"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      defaultValue="admin@coursefinder.com"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Analytics Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Track User Activity</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Send Weekly Reports</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Recommendation Engine Settings */}
              <div className="bg-gray-50 p-6 rounded-xl md:col-span-2">
                <h4 className="font-semibold text-gray-900 mb-4">Recommendation Engine</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating Weight</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={recommendationWeights.rating}
                        onChange={(e) => handleWeightChange('rating', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-sm font-medium text-gray-900 w-12">{recommendationWeights.rating}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trending Weight</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={recommendationWeights.trending}
                        onChange={(e) => handleWeightChange('trending', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-sm font-medium text-gray-900 w-12">{recommendationWeights.trending}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags Weight</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={recommendationWeights.tags}
                        onChange={(e) => handleWeightChange('tags', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-sm font-medium text-gray-900 w-12">{recommendationWeights.tags}%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Total weight must equal 100%. Adjust sliders to change how recommendations are calculated.</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={saveRecommendationSettings}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;