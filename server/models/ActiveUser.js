// This is a virtual model for tracking active users in Redis
// It doesn't have a direct MongoDB collection but represents the data structure

class ActiveUser {
  constructor(userId, name, lastActiveAt, ipAddress) {
    this.userId = userId;
    this.name = name;
    this.lastActiveAt = lastActiveAt;
    this.ipAddress = ipAddress;
  }
}

export default ActiveUser;