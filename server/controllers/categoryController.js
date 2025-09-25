import Category from '../models/Category.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const { search, filter } = req.query;
    
    // Build query
    let query = { isActive: true };
    
    // Add search filter
    if (search) {
      query.$text = { $search: search };
    }
    
    // Add category filter
    if (filter && filter !== 'all') {
      query.filter = filter;
    }
    
    const categories = await Category.find(query).sort({ name: 1 });
    
    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching category'
    });
  }
};

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
  try {
    const { name, description, icon, filter } = req.body;
    
    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category with this name already exists'
      });
    }
    
    const category = await Category.create({
      name,
      description,
      icon,
      filter
    });
    
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error creating category:', error);
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
      message: 'Server error while creating category'
    });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res) => {
  try {
    const { name, description, icon, filter, isActive, courseCount } = req.body;
    
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    // Update fields
    category.name = name || category.name;
    category.description = description || category.description;
    category.icon = icon || category.icon;
    category.filter = filter || category.filter;
    category.isActive = isActive !== undefined ? isActive : category.isActive;
    category.courseCount = courseCount !== undefined ? courseCount : category.courseCount;
    
    const updatedCategory = await category.save();
    
    res.json({
      success: true,
      data: updatedCategory
    });
  } catch (error) {
    console.error('Error updating category:', error);
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
        message: 'Category not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating category'
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    await category.remove();
    
    res.json({
      success: true,
      message: 'Category removed'
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while deleting category'
    });
  }
};

// @desc    Seed categories
// @route   POST /api/categories/seed
// @access  Private/Admin
export const seedCategories = async (req, res) => {
  try {
    // Clear existing categories
    await Category.deleteMany({});
    
    // Define all categories
    const categories = [
      {
        name: 'Web Development',
        description: 'Learn HTML, CSS, JavaScript, and modern frameworks to build stunning websites and web applications.',
        icon: '💻',
        filter: 'technology'
      },
      {
        name: 'Mobile App Development',
        description: 'Build mobile applications for Android and iOS using various frameworks and technologies.',
        icon: '📱',
        filter: 'mobile-development'
      },
      {
        name: 'Data Science & Analytics',
        description: 'Master data analysis, machine learning, and visualization techniques to extract insights from data.',
        icon: '📊',
        filter: 'data-science'
      },
      {
        name: 'Artificial Intelligence & Machine Learning',
        description: 'Dive into AI algorithms, neural networks, and deep learning to create intelligent systems.',
        icon: '🤖',
        filter: 'ai'
      },
      {
        name: 'Cloud Computing & DevOps',
        description: 'Learn cloud platforms, containerization, and automation tools for modern software deployment.',
        icon: '☁️',
        filter: 'cloud'
      },
      {
        name: 'Cybersecurity & Ethical Hacking',
        description: 'Protect systems and networks from digital attacks with security best practices.',
        icon: '🔒',
        filter: 'cybersecurity'
      },
      {
        name: 'Blockchain & Web3',
        description: 'Explore decentralized technologies, cryptocurrencies, and smart contracts.',
        icon: '🔗',
        filter: 'blockchain'
      },
      {
        name: 'UI/UX Design',
        description: 'Create beautiful, user-friendly interfaces with principles of design thinking and user research.',
        icon: '🎨',
        filter: 'design'
      },
      {
        name: 'Graphic Design & Multimedia',
        description: 'Master visual design tools and techniques for digital and print media.',
        icon: '🖌️',
        filter: 'graphic-design'
      },
      {
        name: 'Business & Entrepreneurship',
        description: 'Develop leadership skills and strategic thinking to drive business growth and innovation.',
        icon: '💼',
        filter: 'business'
      },
      {
        name: 'Marketing & Digital Marketing',
        description: 'Master SEO, social media marketing, and analytics to grow brands in the digital landscape.',
        icon: '📈',
        filter: 'marketing'
      },
      {
        name: 'Finance & Accounting',
        description: 'Gain financial literacy and accounting skills to manage personal wealth or business finances.',
        icon: '💰',
        filter: 'finance'
      },
      {
        name: 'Leadership & Management',
        description: 'Develop team management and project leadership skills for professional growth.',
        icon: '👥',
        filter: 'leadership'
      },
      {
        name: 'Health & Fitness',
        description: 'Improve your physical and mental wellbeing with expert-led fitness and wellness programs.',
        icon: '💪',
        filter: 'health'
      },
      {
        name: 'Language Learning',
        description: 'Become fluent in new languages with immersive courses designed for all proficiency levels.',
        icon: '🗣️',
        filter: 'language'
      },
      {
        name: 'Music & Audio',
        description: 'Learn music theory, instruments, and audio production techniques.',
        icon: '🎵',
        filter: 'music'
      },
      {
        name: 'Photography & Video',
        description: 'Master photography and videography techniques with professional editing tools.',
        icon: '📸',
        filter: 'photography'
      },
      {
        name: 'Writing & Content Creation',
        description: 'Develop writing skills and content creation strategies for various platforms.',
        icon: '✍️',
        filter: 'writing'
      },
      {
        name: 'Career Development',
        description: 'Advance your career with resume building, interview prep, and professional skills.',
        icon: '🚀',
        filter: 'career'
      },
      {
        name: 'Education & Teaching',
        description: 'Learn effective teaching methods and educational technologies for online instruction.',
        icon: '🎓',
        filter: 'education'
      },
      {
        name: 'Science & Engineering',
        description: 'Explore fundamental principles in physics, chemistry, and various engineering disciplines.',
        icon: '🔬',
        filter: 'science'
      },
      {
        name: 'Personal Development',
        description: 'Improve time management, productivity, and mindfulness for personal growth.',
        icon: '🌱',
        filter: 'personal-development'
      }
    ];
    
    // Insert all categories
    const createdCategories = await Category.insertMany(categories);
    
    res.status(201).json({
      success: true,
      message: `${createdCategories.length} categories seeded successfully`,
      data: createdCategories
    });
  } catch (error) {
    console.error('Error seeding categories:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while seeding categories'
    });
  }
};