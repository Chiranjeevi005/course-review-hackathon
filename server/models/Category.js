import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '📁'
  },
  courseCount: {
    type: Number,
    default: 0
  },
  filter: {
    type: String,
    required: true,
    enum: [
      'technology', 
      'mobile-development', 
      'data-science', 
      'ai', 
      'cloud', 
      'cybersecurity', 
      'blockchain', 
      'design', 
      'graphic-design', 
      'business', 
      'marketing', 
      'finance', 
      'leadership', 
      'health', 
      'language', 
      'music', 
      'photography', 
      'writing', 
      'career', 
      'education', 
      'science', 
      'personal-development'
    ]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Generate slug before saving
categorySchema.pre('save', function(next) {
  if (this.isModified('name') || this.isNew) {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
  }
  next();
});

// Index for search
categorySchema.index({ name: 'text', description: 'text' });

const Category = mongoose.model('Category', categorySchema);

export default Category;