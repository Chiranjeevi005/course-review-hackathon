import Course from '../models/Course.js';
import Category from '../models/Category.js';

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req, res) => {
  try {
    const { page = 1, limit = 12, search, category, difficulty, sortBy = 'rating', sortOrder = -1 } = req.query;
    
    // Build query
    let query = { isActive: true };
    
    // Add search filter
    if (search) {
      query.$text = { $search: search };
    }
    
    // Add category filter
    if (category) {
      query.categoryId = category;
    }
    
    // Add difficulty filter
    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }
    
    // Build sort object
    let sort = {};
    if (sortBy === 'price') {
      sort.price = sortOrder;
    } else if (sortBy === 'reviews') {
      sort.reviewsCount = sortOrder;
    } else {
      sort.rating = sortOrder;
    }
    
    // Execute query with pagination
    const courses = await Course.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('categoryId', 'name slug icon');
    
    // Get total count for pagination
    const total = await Course.countDocuments(query);
    
    res.json({
      success: true,
      count: courses.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: courses
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching courses'
    });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('categoryId', 'name slug icon');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching course'
    });
  }
};

// @desc    Get courses by category
// @route   GET /api/courses/category/:categoryId
// @access  Public
export const getCoursesByCategory = async (req, res) => {
  try {
    const { page = 1, limit = 12, difficulty, sortBy = 'rating', sortOrder = -1 } = req.query;
    
    // Build query
    let query = { 
      isActive: true,
      categoryId: req.params.categoryId
    };
    
    // Add difficulty filter
    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }
    
    // Build sort object
    let sort = {};
    if (sortBy === 'price') {
      sort.price = sortOrder;
    } else if (sortBy === 'reviews') {
      sort.reviewsCount = sortOrder;
    } else {
      sort.rating = sortOrder;
    }
    
    // Execute query with pagination
    const courses = await Course.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('categoryId', 'name slug icon');
    
    // Get total count for pagination
    const total = await Course.countDocuments(query);
    
    res.json({
      success: true,
      count: courses.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: courses
    });
  } catch (error) {
    console.error('Error fetching courses by category:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching courses by category'
    });
  }
};

// @desc    Search courses
// @route   GET /api/courses/search
// @access  Public
export const searchCourses = async (req, res) => {
  try {
    const { q, page = 1, limit = 12 } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    // Build query
    const query = {
      isActive: true,
      $text: { $search: q }
    };
    
    // Execute query with pagination
    const courses = await Course.find(query)
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('categoryId', 'name slug icon');
    
    // Get total count for pagination
    const total = await Course.countDocuments(query);
    
    res.json({
      success: true,
      count: courses.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: courses
    });
  } catch (error) {
    console.error('Error searching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching courses'
    });
  }
};

// @desc    Create course
// @route   POST /api/courses
// @access  Private/Admin
export const createCourse = async (req, res) => {
  try {
    const { title, description, thumbnail, instructor, categoryId, duration, difficulty, price } = req.body;
    
    // Check if course already exists
    const existingCourse = await Course.findOne({ title });
    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: 'Course with this title already exists'
      });
    }
    
    const course = await Course.create({
      title,
      description,
      thumbnail,
      instructor,
      categoryId,
      duration,
      difficulty,
      price
    });
    
    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error creating course:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while creating course'
    });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin
export const updateCourse = async (req, res) => {
  try {
    const { title, description, thumbnail, instructor, categoryId, duration, difficulty, price, isActive, rating, reviewsCount } = req.body;
    
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Update fields
    course.title = title || course.title;
    course.description = description || course.description;
    course.thumbnail = thumbnail || course.thumbnail;
    course.instructor = instructor || course.instructor;
    course.categoryId = categoryId || course.categoryId;
    course.duration = duration || course.duration;
    course.difficulty = difficulty || course.difficulty;
    course.price = price !== undefined ? price : course.price;
    course.isActive = isActive !== undefined ? isActive : course.isActive;
    course.rating = rating !== undefined ? rating : course.rating;
    course.reviewsCount = reviewsCount !== undefined ? reviewsCount : course.reviewsCount;
    
    const updatedCourse = await course.save();
    
    res.json({
      success: true,
      data: updatedCourse
    });
  } catch (error) {
    console.error('Error updating course:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating course'
    });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    await course.remove();
    
    res.json({
      success: true,
      message: 'Course removed'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while deleting course'
    });
  }
};