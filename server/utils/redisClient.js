import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

// Create a mock Redis client for when Redis is not available
class MockRedisClient {
  constructor() {
    this.data = new Map();
    this.timers = new Map();
  }

  async setEx(key, ttl, value) {
    this.data.set(key, value);
    // Clear existing timer if any
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
    }
    // Set new timer to delete the key
    const timer = setTimeout(() => {
      this.data.delete(key);
      this.timers.delete(key);
    }, ttl * 1000);
    this.timers.set(key, timer);
    return 'OK';
  }

  async del(key) {
    this.data.delete(key);
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }
    return 1;
  }

  async keys(pattern) {
    // Simple pattern matching for our use case
    if (pattern === 'activeUsers:*') {
      return Array.from(this.data.keys()).filter(key => key.startsWith('activeUsers:'));
    }
    return [];
  }

  async get(key) {
    return this.data.get(key) || null;
  }

  async connect() {
    console.log('⚠️  Using mock Redis client');
    return Promise.resolve();
  }

  async quit() {
    return Promise.resolve();
  }
}

// Create Redis client or mock client based on environment
let redisClient;

// Check if Redis is explicitly disabled (empty REDIS_HOST) or we're in production without Redis config
const isRedisDisabled = process.env.REDIS_HOST === '' || 
                      (process.env.NODE_ENV === 'production' && !process.env.REDIS_HOST);

if (isRedisDisabled) {
  console.log('⚠️  Redis is disabled, using mock client');
  redisClient = new MockRedisClient();
} else if (process.env.NODE_ENV === 'production') {
  // In production, try to connect to Redis but fall back to mock if not available
  try {
    const redisConfig = {
      socket: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
      }
    };
    
    redisClient = redis.createClient(redisConfig);
    
    redisClient.on('connect', () => {
      console.log('✅ Connected to Redis');
    });
    
    redisClient.on('error', (err) => {
      console.error('❌ Redis error:', err);
    });
    
    // Attempt to connect
    redisClient.connect().catch(err => {
      console.error('❌ Failed to connect to Redis, using mock client:', err);
      redisClient = new MockRedisClient();
    });
  } catch (error) {
    console.error('❌ Redis client creation failed, using mock client:', error);
    redisClient = new MockRedisClient();
  }
} else {
  // In development, try to connect to Redis
  try {
    const redisConfig = {
      socket: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
      }
    };
    
    redisClient = redis.createClient(redisConfig);
    
    redisClient.on('connect', () => {
      console.log('✅ Connected to Redis');
    });
    
    redisClient.on('error', (err) => {
      console.error('❌ Redis error:', err);
    });
    
    redisClient.connect().catch(console.error);
  } catch (error) {
    console.error('❌ Redis client creation failed in development:', error);
    redisClient = new MockRedisClient();
  }
}

export default redisClient;