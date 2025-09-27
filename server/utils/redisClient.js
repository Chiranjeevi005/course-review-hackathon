import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

// Create Redis client
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  }
  // Add password if needed
  // password: process.env.REDIS_PASSWORD
});

// Handle Redis connection events
redisClient.on('connect', () => {
  console.log('✅ Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis error:', err);
});

// Connect to Redis
redisClient.connect().catch(console.error);

export default redisClient;