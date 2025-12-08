const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Import shared mock data
import { 
  mockCollaborators, 
  mockWorkspaceTasks as mockTasks, 
  mockWorkspaceState, 
  mockUpcomingSession, 
  mockActivity 
} from '../utils/mockData.js';

/**
 * Fetches collaborators for a workspace
 * @param {string} workspaceId - The workspace ID (default: "ws_001")
 * @returns {Promise<Array>} Array of collaborator objects
 */
export async function getCollaborators(workspaceId = "ws_001") {
  try {
    const response = await fetch(`${API_BASE_URL}/shared-workspace-dashboard/collaborators?workspaceId=${workspaceId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if response indicates success
    if (data.message && data.message.includes("Error")) {
      throw new Error(data.message);
    }
    
    return data.collaborators || [];
  } catch (error) {
    console.warn('Failed to fetch collaborators, using mock data:', error);
    return mockCollaborators;
  }
}

/**
 * Fetches upcoming session data
 * @returns {Promise<Object>} Upcoming session object
 */
export async function getUpcomingSession() {
  try {
    const response = await fetch(`${API_BASE_URL}/shared-workspace-dashboard/upcoming-session`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.message && data.message.includes("Error")) {
      throw new Error(data.message);
    }
    return data.session || mockUpcomingSession;
  } catch (error) {
    console.warn('Failed to fetch upcoming session, using mock data:', error);
    return mockUpcomingSession;
  }
}

/**
 * Fetches recent activity feed
 * @returns {Promise<Array>} Array of activity items
 */
export async function getRecentActivity() {
  try {
    const response = await fetch(`${API_BASE_URL}/shared-workspace-dashboard/activity`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.message && data.message.includes("Error")) {
      throw new Error(data.message);
    }
    return data.activity || mockActivity;
  } catch (error) {
    console.warn('Failed to fetch activity, using mock data:', error);
    return mockActivity;
  }
}

/**
 * Fetches user tasks
 * @param {number} userId - The user ID (default: 1)
 * @returns {Promise<Array>} Array of task objects
 */
export async function getUserTasks(userId = 1) {
  try {
    const response = await fetch(`${API_BASE_URL}/shared-workspace-dashboard/tasks?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if response indicates success
    if (data.message && data.message.includes("Error")) {
      throw new Error(data.message);
    }
    
    return data.tasks || [];
  } catch (error) {
    console.warn('Failed to fetch tasks, using mock data:', error);
    return mockTasks;
  }
}

/**
 * Fetches workspace state
 * @param {number} userId - The user ID (default: 1)
 * @param {string} workspaceId - The workspace ID (default: "ws_001")
 * @returns {Promise<Object>} Workspace state object
 */
export async function getWorkspaceState(userId = 1, workspaceId = "ws_001") {
  try {
    const response = await fetch(`${API_BASE_URL}/shared-workspace-dashboard/state?userId=${userId}&workspaceId=${workspaceId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if response indicates success
    if (data.message && data.message.includes("Error")) {
      throw new Error(data.message);
    }
    
    // Transform response to match expected format
    if (data.workspace) {
      return {
        id: data.workspace.id,
        name: data.workspace.name,
        status: data.workspace.memberCount > 0 ? "active" : "idle",
        memberCount: data.workspace.memberCount || 0
      };
    }
    
    return mockWorkspaceState;
  } catch (error) {
    console.warn('Failed to fetch workspace state, using mock data:', error);
    return mockWorkspaceState;
  }
}

/**
 * Adds a new task and saves to mock data file
 * @param {Object} task - Task object { id, title, status, due }
 * @returns {Promise<Object>} Created task object
 */
export async function addTask(task) {
  try {
    const response = await fetch(`${API_BASE_URL}/shared-workspace-dashboard/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.message && data.message.includes("Error")) {
      throw new Error(data.message);
    }

    return data.task || task;
  } catch (error) {
    console.warn('Failed to save task to backend, task added locally only:', error);
    // Task is already added to local state, so we just log the warning
    return task;
  }
}

/**
 * Updates an existing task and saves to mock data file
 * @param {string|number} taskId - The task ID to update
 * @param {Object} taskData - Updated task object { status, inProgressBy, doneBy, ... }
 * @returns {Promise<Object>} Updated task object
 */
export async function updateTask(taskId, taskData) {
  try {
    const response = await fetch(`${API_BASE_URL}/shared-workspace-dashboard/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.message && data.message.includes("Error")) {
      throw new Error(data.message);
    }

    return data.task || taskData;
  } catch (error) {
    console.warn('Failed to save task update to backend, task updated locally only:', error);
    // Task is already updated in local state, so we just log the warning
    return taskData;
  }
}

