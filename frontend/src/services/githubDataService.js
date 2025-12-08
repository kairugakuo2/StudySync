/**
 * GitHub Data Service
 * Reads from public GitHub repo (no auth needed)
 * Writes via Vercel serverless function (uses server-side token)
 */

// These should match your GitHub repo
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || 'kairugakuo2/studysync-data';
const DATA_FILE_PATH = 'data/workspace.json';
const GITHUB_BRANCH = 'main'; // or 'master'

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
    
    try {
      console.log('Calling GitHub API:', { workspaceId, username, updates: Object.keys(updatesToSend) });
      const response = await fetch('/api/github/update', {
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
        console.error('GitHub API error response:', error);
        throw new Error(error.message || `Failed to update (${response.status})`);
      }
      
      const result = await response.json();
      console.log('GitHub API success:', result);
      return result;
    } catch (error) {
      console.error('Error updating GitHub:', error);
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
   */
  static getFallbackData() {
    // Return structure that matches expected format
    return this.getEmptyDataStructure();
  }
}

// Export as default
export default GitHubDataService;

