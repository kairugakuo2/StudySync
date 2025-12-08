/**
 * Fake authentication service for demo mode
 * Users select a username from dropdown - no real auth needed
 */

import { mockUsers } from '../utils/mockData';

class AuthService {
  static getCurrentUser() {
    const username = localStorage.getItem('demo_username');
    const userId = localStorage.getItem('demo_userId');
    
    if (!username) return null;
    
    // Look up the actual user from mockUsers to get their real role
    const userIdNum = userId ? parseInt(userId, 10) : null;
    const actualUser = userIdNum ? Object.values(mockUsers).find(u => u.id === userIdNum) : null;
    
    return {
      id: userId,
      name: username,
      role: actualUser?.role || 'student', // Get real role from mockUsers
      username: username,
      email: actualUser?.email || null
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

