import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: function() {
      return this.provider === 'local';
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it's modified and the user is using local authentication
  if (this.isModified('passwordHash') && this.provider === 'local') {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  }
  
  // Ensure the admin user has the correct email and role
  if (this.email === 'admin@coursefinder.com') {
    this.role = 'admin';
  }
  
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (this.provider !== 'local') {
    throw new Error('This user did not sign up with a password');
  }
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Ensure only one admin user exists
userSchema.statics.ensureAdmin = async function() {
  const adminExists = await this.findOne({ email: 'admin@coursefinder.com' });
  if (!adminExists) {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    await this.create({
      name: 'Admin User',
      email: 'admin@coursefinder.com',
      passwordHash: hashedPassword,
      role: 'admin',
      provider: 'local'
    });
    console.log('✅ Admin user created with email: admin@coursefinder.com and password: admin123');
  }
};

const User = mongoose.model('User', userSchema);

export default User;