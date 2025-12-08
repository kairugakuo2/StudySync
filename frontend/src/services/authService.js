/**
 * Fake authentication service for demo mode
 * Users select a username from dropdown - no real auth needed
 */

class AuthService {
  static getCurrentUser() {
    const username = localStorage.getItem('demo_username');
    const userId = localStorage.getItem('demo_userId');
    
    if (!username) return null;
    
    return {
      id: userId,
      name: username,
      role: 'student', // Mock role
      username: username
    };
  }
  
  static setUser(username, userId) {
    localStorage.setItem('demo_username', username);
    localStorage.setItem('demo_userId', userId);
  }
  
  static logout() {
    localStorage.removeItem('demo_username');
    localStorage.removeItem('demo_userId');
  }
  
  static isAuthenticated() {
    return !!localStorage.getItem('demo_username');
  }
  
  static getUsername() {
    return localStorage.getItem('demo_username');
  }
}

export default AuthService;

