/**
 * GitHub Data Service
 * Reads from public GitHub repo (no auth needed)
 * Writes via Vercel serverless function (uses server-side token)
 */

// These should match your GitHub repo
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || 'kairugakuo2/studysync-data';
const DATA_FILE_PATH = 'data/workspace.json';
const GITHUB_BRANCH = 'main'; // or 'master'

// Import mock data for fallback
import { 
  mockWorkspaces,
  mockUsers,
  mockWorkspaceTasks as mockTasks, 
  mockUpcomingSession, 
  mockActivity 
} from '../utils/mockData.js';

class GitHubDataService {
  /**
   * Read workspace data from public GitHub repo
   * No authentication needed for public repos
   */
  static async fetchWorkspaceData() {
    // Use raw.githubusercontent.com for public repos
    const url = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${DATA_FILE_PATH}?t=${Date.now()}`;
    
    try {
      const response = await fetch(url, {
        cache: 'no-cache',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          // File doesn't exist yet, return empty structure
          return this.getEmptyDataStructure();
        }
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching from GitHub:', error);
      // Fallback to local mock data structure
      return this.getFallbackData();
    }
  }
  
  /**
   * Get workspace JSON data for a specific workspace
   * @param {string} workspaceId - The workspace ID
   * @returns {Promise<Object>} Workspace object or null
   */
  static async getWorkspaceJSON(workspaceId) {
    try {
      const allData = await this.fetchWorkspaceData();
      return allData.workspaces?.[workspaceId] || null;
    } catch (error) {
      console.warn('Failed to fetch workspace from GitHub, using mock data:', error);
      return mockWorkspaces.find(ws => ws.id === workspaceId) || null;
    }
  }
  
  /**
   * Get tasks for a specific workspace
   * @param {string} workspaceId - The workspace ID
   * @returns {Promise<Array>} Array of task objects
   */
  static async getTasks(workspaceId) {
    try {
      const allData = await this.fetchWorkspaceData();
      const tasks = allData.tasks?.[workspaceId] || [];
      return Array.isArray(tasks) ? tasks : [];
    } catch (error) {
      console.warn('Failed to fetch tasks from GitHub, using mock data:', error);
      return mockTasks.filter(task => task.workspaceId === workspaceId);
    }
  }
  
  /**
   * Get notes for a specific workspace
   * @param {string} workspaceId - The workspace ID
   * @returns {Promise<Object>} Notes object with study, formulas, ideas
   */
  static async getNotes(workspaceId) {
    try {
      const allData = await this.fetchWorkspaceData();
      return allData.notes?.[workspaceId] || { study: '', formulas: '', ideas: '' };
    } catch (error) {
      console.warn('Failed to fetch notes from GitHub, using empty notes:', error);
      return { study: '', formulas: '', ideas: '' };
    }
  }
  
  /**
   * Get whiteboard data for a specific workspace
   * @param {string} workspaceId - The workspace ID
   * @returns {Promise<Object|null>} Whiteboard object or null
   */
  static async getWhiteboard(workspaceId) {
    try {
      const allData = await this.fetchWorkspaceData();
      return allData.whiteboards?.[workspaceId] || null;
    } catch (error) {
      console.warn('Failed to fetch whiteboard from GitHub, using null:', error);
      return null;
    }
  }
  
  /**
   * Get files for a specific workspace
   * @param {string} workspaceId - The workspace ID
   * @returns {Promise<Array>} Array of file objects
   */
  static async getFiles(workspaceId) {
    try {
      const allData = await this.fetchWorkspaceData();
      const files = allData.files?.[workspaceId] || [];
      return Array.isArray(files) ? files : [];
    } catch (error) {
      console.warn('Failed to fetch files from GitHub, using empty array:', error);
      return [];
    }
  }
  
  /**
   * Write workspace data via Vercel serverless function
   * Token is stored server-side, never exposed to browser
   */
  static async updateWorkspace(workspaceId, updates, username) {
    const updatesToSend = {
      workspace: updates.workspace,
      tasks: updates.tasks,
      notes: updates.notes,
      whiteboard: updates.whiteboard,
      files: updates.files
    };
    
    // Use VITE_API_URL if set, otherwise default to /api/update
    const API_URL = import.meta.env.VITE_API_URL || '/api/update';
    
    try {
      console.log('Calling update API:', { workspaceId, username, updates: Object.keys(updatesToSend) });
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          workspaceId,
          data: updatesToSend,
          username
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        console.error('Update API error response:', error);
        throw new Error(error.message || `Failed to update (${response.status})`);
      }
      
      const result = await response.json();
      console.log('Update API success:', result);
      return result;
    } catch (error) {
      console.error('Error updating workspace:', error);
      throw error;
    }
  }
  
  /**
   * Get empty data structure for new repos
   */
  static getEmptyDataStructure() {
    return {
      workspaces: {},
      tasks: {},
      notes: {},
      whiteboards: {},
      files: {},
      version: 0,
      lastModified: new Date().toISOString()
    };
  }
  
  /**
   * Fallback data if GitHub fetch fails
   * Returns structure compatible with mock data
   */
  static getFallbackData() {
    // Return structure that matches expected format
    // This will be used when GitHub fetch fails
    return this.getEmptyDataStructure();
  }
}

// Export as default
export default GitHubDataService;

