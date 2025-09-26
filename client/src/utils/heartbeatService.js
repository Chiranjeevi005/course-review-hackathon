// Heartbeat service to send periodic user activity updates
class HeartbeatService {
  constructor() {
    this.socket = null;
    this.heartbeatInterval = null;
    this.userId = null;
    this.userName = null;
    this.ipAddress = null;
  }

  init(socket, userId, userName, ipAddress) {
    this.socket = socket;
    this.userId = userId;
    this.userName = userName;
    this.ipAddress = ipAddress;
    
    // Start heartbeat
    this.startHeartbeat();
  }

  startHeartbeat() {
    // Send heartbeat every 30 seconds
    this.heartbeatInterval = setInterval(() => {
      if (this.socket && this.socket.connected && this.userId) {
        this.socket.emit('user_activity', {
          userId: this.userId,
          userName: this.userName,
          ipAddress: this.ipAddress
        });
      }
    }, 30000); // 30 seconds
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  // Track course view
  trackCourseView(courseId, courseTitle) {
    if (this.socket && this.socket.connected && this.userId) {
      this.socket.emit('view_course', {
        userId: this.userId,
        courseId,
        courseTitle,
        ipAddress: this.ipAddress,
        userAgent: navigator.userAgent
      });
    }
  }

  // Track review submission
  trackReviewSubmission(courseId, rating) {
    if (this.socket && this.socket.connected && this.userId) {
      this.socket.emit('review_submit', {
        userId: this.userId,
        courseId,
        rating,
        ipAddress: this.ipAddress,
        userAgent: navigator.userAgent
      });
    }
  }

  // Track search
  trackSearch(query) {
    if (this.socket && this.socket.connected && this.userId) {
      this.socket.emit('search', {
        userId: this.userId,
        query,
        ipAddress: this.ipAddress,
        userAgent: navigator.userAgent
      });
    }
  }
}

const heartbeatService = new HeartbeatService();
export default heartbeatService;