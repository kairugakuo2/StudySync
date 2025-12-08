const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Import shared mock data
import { 
  mockWorkspaces,
  mockUsers,
  mockWorkspaceTasks as mockTasks, 
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
    
    // Read as text first to safely check if it's JSON
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      throw new Error('Response is not valid JSON');
    }
    
    // Check if response indicates success
    if (data.message && data.message.includes("Error")) {
      throw new Error(data.message);
    }
    
    return data.collaborators || [];
  } catch (error) {
    console.warn('Failed to fetch collaborators, using mock data:', error);
    // Derive collaborators from selected workspace
    const workspace = mockWorkspaces.find(ws => ws.id === workspaceId) || mockWorkspaces[0];
    const presenceByUserId = {
      1: "active", 2: "idle", 3: "offline", 4: "active", 5: "active",
      6: "idle", 7: "active", 8: "offline", 9: "active", 10: "idle",
      11: "active", 12: "offline", 13: "active", 20: "active", 21: "idle", 24: "active"
    };
    return (workspace.collaboratorList || []).map(collab => {
      const user = Object.values(mockUsers).find(u => u.id === collab.userId);
      return {
        userId: collab.userId,
        name: user ? user.name : `Unknown User ${collab.userId}`,
        role: collab.role,
        status: presenceByUserId[collab.userId] || "offline"
      };
    });
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
    // Read as text first to safely check if it's JSON
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      throw new Error('Response is not valid JSON');
    }
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
    // Read as text first to safely check if it's JSON
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      throw new Error('Response is not valid JSON');
    }
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
 * Fetches user tasks for a specific workspace
 * @param {number} userId - The user ID (default: 1)
 * @param {string} workspaceId - The workspace ID to filter tasks by (default: "ws_001")
 * @returns {Promise<Array>} Array of task objects
 */
export async function getUserTasks(userId = 1, workspaceId = "ws_001") {
  try {
    const response = await fetch(`${API_BASE_URL}/shared-workspace-dashboard/tasks?userId=${userId}&workspaceId=${workspaceId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Read as text first to safely check if it's JSON
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      throw new Error('Response is not valid JSON');
    }
    
    // Check if response indicates success
    if (data.message && data.message.includes("Error")) {
      throw new Error(data.message);
    }
    
    // Filter tasks by workspaceId only (show all tasks for the workspace)
    const tasks = data.tasks || [];
    return tasks.filter(task => task.workspaceId === workspaceId);
  } catch (error) {
    console.warn('Failed to fetch tasks, using mock data:', error);
    // Filter mock data by workspaceId only (show all tasks for the workspace)
    return mockTasks.filter(task => task.workspaceId === workspaceId);
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
    
    // Read as text first to safely check if it's JSON
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      throw new Error('Response is not valid JSON');
    }
    
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
    
    // Derive workspace state from selected workspace
    const workspace = mockWorkspaces.find(ws => ws.id === workspaceId) || mockWorkspaces[0];
    const tutor = workspace.collaboratorList?.find(c => c.role === 'tutor');
    const tutorUser = tutor ? Object.values(mockUsers).find(u => u.id === tutor.userId) : null;
    
    return {
      id: workspace.id,
      name: workspace.name,
      status: workspace.status || (workspace.members?.length > 0 ? "active" : "idle"),
      memberCount: workspace.members?.length || 0,
      tutor: tutorUser ? tutorUser.name : null,
      description: workspace.description,
      ownerId: workspace.ownerId
    };
  } catch (error) {
    console.warn('Failed to fetch workspace state, using mock data:', error);
    // Derive workspace state from selected workspace
    const workspace = mockWorkspaces.find(ws => ws.id === workspaceId) || mockWorkspaces[0];
    const tutor = workspace.collaboratorList?.find(c => c.role === 'tutor');
    const tutorUser = tutor ? Object.values(mockUsers).find(u => u.id === tutor.userId) : null;
    
    return {
      id: workspace.id,
      name: workspace.name,
      status: workspace.status || (workspace.members?.length > 0 ? "active" : "idle"),
      memberCount: workspace.members?.length || 0,
      tutor: tutorUser ? tutorUser.name : null,
      description: workspace.description,
      ownerId: workspace.ownerId
    };
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

    // Read as text first to safely check if it's JSON
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      throw new Error('Response is not valid JSON');
    }
    
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

    // Read as text first to safely check if it's JSON
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      throw new Error('Response is not valid JSON');
    }
    
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

/**
 * Creates a new workspace
 * @param {Object} workspaceData - Workspace data { name, description, ownerId }
 * @returns {Promise<Object>} Created workspace object
 */
export async function createWorkspace(workspaceData) {
  try {
    const response = await fetch(`${API_BASE_URL}/shared-workspace-dashboard/workspaces`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workspaceData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Read as text first to safely check if it's JSON
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      throw new Error('Response is not valid JSON');
    }
    
    if (data.message && data.message.includes("Error")) {
      throw new Error(data.message);
    }

    return data.workspace || workspaceData;
  } catch (error) {
    console.warn('Failed to create workspace on backend, using local data:', error);
    // Generate new workspace ID
    const maxId = Math.max(...mockWorkspaces.map(ws => {
      const num = parseInt(ws.id.replace('ws_', ''));
      return isNaN(num) ? 0 : num;
    }));
    const newWorkspace = {
      id: `ws_${String(maxId + 1).padStart(3, '0')}`,
      name: workspaceData.name,
      description: workspaceData.description || '',
      status: 'idle',
      ownerId: workspaceData.ownerId,
      members: [workspaceData.ownerId],
      createdAt: new Date().toISOString(),
      collaboratorList: [{ userId: workspaceData.ownerId, role: 'tutor' }]
    };
    return newWorkspace;
  }
}

/**
 * Updates a workspace (name, description)
 * @param {string} workspaceId - The workspace ID
 * @param {Object} workspaceData - Updated workspace data { name, description }
 * @returns {Promise<Object>} Updated workspace object
 */
export async function updateWorkspace(workspaceId, workspaceData) {
  try {
    const response = await fetch(`${API_BASE_URL}/shared-workspace-dashboard/workspaces/${workspaceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workspaceData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Read as text first to safely check if it's JSON
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      throw new Error('Response is not valid JSON');
    }
    
    if (data.message && data.message.includes("Error")) {
      throw new Error(data.message);
    }

    return data.workspace || workspaceData;
  } catch (error) {
    console.warn('Failed to update workspace on backend, using local data:', error);
    const workspace = mockWorkspaces.find(ws => ws.id === workspaceId);
    if (workspace) {
      return {
        ...workspace,
        ...workspaceData
      };
    }
    throw error;
  }
}

/**
 * Deletes a workspace
 * @param {string} workspaceId - The workspace ID to delete
 * @returns {Promise<boolean>} Success status
 */
export async function deleteWorkspace(workspaceId) {
  try {
    const response = await fetch(`${API_BASE_URL}/shared-workspace-dashboard/workspaces/${workspaceId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Read as text first to safely check if it's JSON
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      throw new Error('Response is not valid JSON');
    }
    
    if (data.message && data.message.includes("Error")) {
      throw new Error(data.message);
    }

    return true;
  } catch (error) {
    console.warn('Failed to delete workspace on backend:', error);
    // Still return true for local deletion
    return true;
  }
}

