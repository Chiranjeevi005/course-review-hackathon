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
    trim: true,
    lowercase: true
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
    // Generate slug from name, ensuring it's not null
    this.slug = this.name ? this.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-') : 'category-' + Date.now();
    // Remove leading/trailing hyphens
    this.slug = this.slug.replace(/^-+|-+$/g, '');
    // If slug is empty, generate a default one
    if (!this.slug) {
      this.slug = 'category-' + Date.now();
    }
  }
  next();
});

// Index for search
categorySchema.index({ name: 'text', description: 'text' });

const Category = mongoose.model('Category', categorySchema);

export default Category;