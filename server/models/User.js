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
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
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
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Real-time tracking fields
  isOnline: {
    type: Boolean,
    default: false
  },
  lastActiveAt: {
    type: Date,
    default: Date.now
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

// Ensure only one admin user exists with correct credentials
userSchema.statics.ensureAdmin = async function() {
  const adminEmail = 'admin@coursefinder.com';
  const adminPassword = 'admin123';
  
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  
  const adminUser = {
    name: 'Admin User',
    email: adminEmail,
    passwordHash: hashedPassword,
    role: 'admin',
    provider: 'local'
  };
  
  // Try to find existing admin user
  const existingAdmin = await this.findOne({ email: adminEmail });
  
  if (!existingAdmin) {
    // Create admin user if it doesn't exist
    await this.create(adminUser);
    console.log('✅ Admin user created with email: admin@coursefinder.com and password: admin123');
  } else {
    // Update existing admin user to ensure correct password and role
    await this.findOneAndUpdate(
      { email: adminEmail },
      { 
        ...adminUser,
        passwordHash: hashedPassword // Ensure the password is updated
      },
      { new: true, runValidators: true }
    );
    console.log('✅ Admin user updated with email: admin@coursefinder.com and password: admin123');
  }
};

const User = mongoose.model('User', userSchema);

export default User;