// Use VITE_API_URL for writes (points to /api/update)
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/update';

// Import GitHub data service for reads
import GitHubDataService from '../services/githubDataService.js';

// Import auth service to get username for writes
import AuthService from '../services/authService.js';

// Import shared mock data for fallback
import { 
  mockWorkspaces,
  mockUsers,
  mockWorkspaceTasks as mockTasks, 
  mockUpcomingSession, 
  mockActivity 
} from '../utils/mockData.js';

/**
 * Fetches collaborators for a workspace
 * Reads from GitHub workspace.json
 * @param {string} workspaceId - The workspace ID (default: "ws_001")
 * @returns {Promise<Array>} Array of collaborator objects
 */
export async function getCollaborators(workspaceId = "ws_001") {
  try {
    // Fetch workspace data from GitHub
    const workspace = await GitHubDataService.getWorkspaceJSON(workspaceId);
    
    if (workspace && workspace.collaboratorList) {
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
    
    // Fallback to mock data
    const mockWorkspace = mockWorkspaces.find(ws => ws.id === workspaceId) || mockWorkspaces[0];
    const presenceByUserId = {
      1: "active", 2: "idle", 3: "offline", 4: "active", 5: "active",
      6: "idle", 7: "active", 8: "offline", 9: "active", 10: "idle",
      11: "active", 12: "offline", 13: "active", 20: "active", 21: "idle", 24: "active"
    };
    return (mockWorkspace.collaboratorList || []).map(collab => {
      const user = Object.values(mockUsers).find(u => u.id === collab.userId);
      return {
        userId: collab.userId,
        name: user ? user.name : `Unknown User ${collab.userId}`,
        role: collab.role,
        status: presenceByUserId[collab.userId] || "offline"
      };
    });
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
 * Currently returns mock data (session data not stored in GitHub workspace.json)
 * @returns {Promise<Object>} Upcoming session object
 */
export async function getUpcomingSession() {
  // Session data is not part of workspace.json structure
  // Return mock data as fallback
  return mockUpcomingSession;
}

/**
 * Fetches recent activity feed
 * Currently returns mock data (activity data not stored in GitHub workspace.json)
 * @returns {Promise<Array>} Array of activity items
 */
export async function getRecentActivity() {
  // Activity data is not part of workspace.json structure
  // Return mock data as fallback
  return mockActivity;
}

/**
 * Fetches user tasks for a specific workspace
 * Reads from GitHub workspace.json
 * @param {number} userId - The user ID (default: 1) - currently not used, all workspace tasks are returned
 * @param {string} workspaceId - The workspace ID to filter tasks by (default: "ws_001")
 * @returns {Promise<Array>} Array of task objects
 */
export async function getUserTasks(userId = 1, workspaceId = "ws_001") {
  try {
    // Fetch tasks from GitHub
    const tasks = await GitHubDataService.getTasks(workspaceId);
    // Return all tasks for the workspace (filtered by workspaceId in the service)
    return tasks;
  } catch (error) {
    console.warn('Failed to fetch tasks, using mock data:', error);
    // Filter mock data by workspaceId only (show all tasks for the workspace)
    return mockTasks.filter(task => task.workspaceId === workspaceId);
  }
}

/**
 * Fetches workspace state
 * Reads from GitHub workspace.json
 * @param {number} userId - The user ID (default: 1) - currently not used
 * @param {string} workspaceId - The workspace ID (default: "ws_001")
 * @returns {Promise<Object>} Workspace state object
 */
export async function getWorkspaceState(userId = 1, workspaceId = "ws_001") {
  try {
    // Fetch workspace from GitHub
    const workspace = await GitHubDataService.getWorkspaceJSON(workspaceId);
    
    if (workspace) {
      const tutor = workspace.collaboratorList?.find(c => c.role === 'tutor');
      const tutorUser = tutor ? Object.values(mockUsers).find(u => u.id === tutor.userId) : null;
      
      return {
        id: workspace.id || workspaceId,
        name: workspace.name,
        status: workspace.status || (workspace.members?.length > 0 ? "active" : "idle"),
        memberCount: workspace.members?.length || 0,
        tutor: tutorUser ? tutorUser.name : null,
        description: workspace.description,
        ownerId: workspace.ownerId
      };
    }
    
    // Fallback to mock data
    const mockWorkspace = mockWorkspaces.find(ws => ws.id === workspaceId) || mockWorkspaces[0];
    const tutor = mockWorkspace.collaboratorList?.find(c => c.role === 'tutor');
    const tutorUser = tutor ? Object.values(mockUsers).find(u => u.id === tutor.userId) : null;
    
    return {
      id: mockWorkspace.id,
      name: mockWorkspace.name,
      status: mockWorkspace.status || (mockWorkspace.members?.length > 0 ? "active" : "idle"),
      memberCount: mockWorkspace.members?.length || 0,
      tutor: tutorUser ? tutorUser.name : null,
      description: mockWorkspace.description,
      ownerId: mockWorkspace.ownerId
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
 * Adds a new task and saves via /api/update
 * @param {Object} task - Task object { id, title, status, due, workspaceId }
 * @returns {Promise<Object>} Created task object
 */
export async function addTask(task) {
  try {
    // Get current user for username
    const user = AuthService.getCurrentUser();
    const username = user?.username || user?.name || 'anonymous';
    
    // Get current tasks for the workspace
    const workspaceId = task.workspaceId || "ws_001";
    const currentTasks = await GitHubDataService.getTasks(workspaceId);
    
    // Add the new task to the list
    const updatedTasks = [...currentTasks, task];
    
    // Send update to /api/update
    await GitHubDataService.updateWorkspace(workspaceId, {
      tasks: updatedTasks
    }, username);

    return task;
  } catch (error) {
    console.warn('Failed to save task to backend, task added locally only:', error);
    // Task is already added to local state, so we just log the warning
    return task;
  }
}

/**
 * Updates an existing task and saves via /api/update
 * @param {string|number} taskId - The task ID to update
 * @param {Object} taskData - Updated task object { status, inProgressBy, doneBy, workspaceId, ... }
 * @returns {Promise<Object>} Updated task object
 */
export async function updateTask(taskId, taskData) {
  try {
    // Get current user for username
    const user = AuthService.getCurrentUser();
    const username = user?.username || user?.name || 'anonymous';
    
    // Get workspaceId from taskData or find it from current tasks
    let workspaceId = taskData.workspaceId;
    if (!workspaceId) {
      // Try to find the task in current data to get workspaceId
      const allData = await GitHubDataService.fetchWorkspaceData();
      for (const [wsId, tasks] of Object.entries(allData.tasks || {})) {
        if (Array.isArray(tasks) && tasks.find(t => t.id === taskId || t.id === String(taskId))) {
          workspaceId = wsId;
          break;
        }
      }
      if (!workspaceId) {
        workspaceId = "ws_001"; // Default fallback
      }
    }
    
    // Get current tasks for the workspace
    const currentTasks = await GitHubDataService.getTasks(workspaceId);
    
    // Update the task in the list
    const updatedTasks = currentTasks.map(t => 
      (t.id === taskId || t.id === String(taskId)) ? { ...t, ...taskData } : t
    );
    
    // Send update to /api/update
    await GitHubDataService.updateWorkspace(workspaceId, {
      tasks: updatedTasks
    }, username);

    return { ...taskData, id: taskId };
  } catch (error) {
    console.warn('Failed to save task update to backend, task updated locally only:', error);
    // Task is already updated in local state, so we just log the warning
    return taskData;
  }
}

/**
 * Creates a new workspace and saves via /api/update
 * @param {Object} workspaceData - Workspace data { name, description, ownerId }
 * @returns {Promise<Object>} Created workspace object
 */
export async function createWorkspace(workspaceData) {
  try {
    // Get current user for username
    const user = AuthService.getCurrentUser();
    const username = user?.username || user?.name || 'anonymous';
    
    // Generate new workspace ID
    const allData = await GitHubDataService.fetchWorkspaceData();
    const existingIds = Object.keys(allData.workspaces || {});
    let maxId = 0;
    existingIds.forEach(id => {
      const num = parseInt(id.replace('ws_', ''));
      if (!isNaN(num) && num > maxId) maxId = num;
    });
    
    const newWorkspaceId = `ws_${String(maxId + 1).padStart(3, '0')}`;
    const newWorkspace = {
      id: newWorkspaceId,
      name: workspaceData.name,
      description: workspaceData.description || '',
      status: 'idle',
      ownerId: workspaceData.ownerId,
      members: [workspaceData.ownerId],
      createdAt: new Date().toISOString(),
      collaboratorList: [{ userId: workspaceData.ownerId, role: 'tutor' }]
    };
    
    // Send update to /api/update
    await GitHubDataService.updateWorkspace(newWorkspaceId, {
      workspace: newWorkspace,
      tasks: [],
      notes: { study: '', formulas: '', ideas: '' },
      whiteboard: null,
      files: []
    }, username);

    return newWorkspace;
  } catch (error) {
    console.warn('Failed to create workspace on backend, using local data:', error);
    // Generate new workspace ID from mock data as fallback
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
 * Updates a workspace (name, description) via /api/update
 * @param {string} workspaceId - The workspace ID
 * @param {Object} workspaceData - Updated workspace data { name, description, ... }
 * @returns {Promise<Object>} Updated workspace object
 */
export async function updateWorkspace(workspaceId, workspaceData) {
  try {
    // Get current user for username
    const user = AuthService.getCurrentUser();
    const username = user?.username || user?.name || 'anonymous';
    
    // Get current workspace data
    const currentWorkspace = await GitHubDataService.getWorkspaceJSON(workspaceId);
    
    // Merge updates
    const updatedWorkspace = {
      ...(currentWorkspace || {}),
      ...workspaceData,
      id: workspaceId
    };
    
    // Send update to /api/update
    await GitHubDataService.updateWorkspace(workspaceId, {
      workspace: updatedWorkspace
    }, username);

    return updatedWorkspace;
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
 * Deletes a task and saves via /api/update
 * @param {string|number} taskId - The task ID to delete
 * @param {string} workspaceId - The workspace ID (optional, will be found if not provided)
 * @returns {Promise<boolean>} Success status
 */
export async function deleteTask(taskId, workspaceId = null) {
  try {
    // Get current user for username
    const user = AuthService.getCurrentUser();
    const username = user?.username || user?.name || 'anonymous';
    
    // Find workspaceId if not provided
    if (!workspaceId) {
      const allData = await GitHubDataService.fetchWorkspaceData();
      for (const [wsId, tasks] of Object.entries(allData.tasks || {})) {
        if (Array.isArray(tasks) && tasks.find(t => t.id === taskId || t.id === String(taskId))) {
          workspaceId = wsId;
          break;
        }
      }
      if (!workspaceId) {
        console.warn('Could not find workspace for task, using default');
        workspaceId = "ws_001"; // Default fallback
      }
    }
    
    // Get current tasks for the workspace
    const currentTasks = await GitHubDataService.getTasks(workspaceId);
    
    // Remove the task from the list
    const updatedTasks = currentTasks.filter(t => t.id !== taskId && t.id !== String(taskId));
    
    // Send update to /api/update
    await GitHubDataService.updateWorkspace(workspaceId, {
      tasks: updatedTasks
    }, username);

    return true;
  } catch (error) {
    console.warn('Failed to delete task on backend:', error);
    // Still return true for local deletion
    return true;
  }
}

/**
 * Deletes a workspace via /api/update
 * @param {string} workspaceId - The workspace ID to delete
 * @returns {Promise<boolean>} Success status
 */
export async function deleteWorkspace(workspaceId) {
  try {
    // Get current user for username
    const user = AuthService.getCurrentUser();
    const username = user?.username || user?.name || 'anonymous';
    
    // Get all workspace data
    const allData = await GitHubDataService.fetchWorkspaceData();
    
    // Remove the workspace and its associated data
    const updatedWorkspaces = { ...allData.workspaces };
    delete updatedWorkspaces[workspaceId];
    
    const updatedTasks = { ...allData.tasks };
    delete updatedTasks[workspaceId];
    
    const updatedNotes = { ...allData.notes };
    delete updatedNotes[workspaceId];
    
    const updatedWhiteboards = { ...allData.whiteboards };
    delete updatedWhiteboards[workspaceId];
    
    const updatedFiles = { ...allData.files };
    delete updatedFiles[workspaceId];
    
    // Send update to /api/update with empty workspace data (effectively deleting it)
    // Note: The /api/update endpoint merges data, so we need to send the full updated structure
    // For now, we'll set the workspace to null/empty which should effectively remove it
    await GitHubDataService.updateWorkspace(workspaceId, {
      workspace: null,
      tasks: [],
      notes: {},
      whiteboard: null,
      files: []
    }, username);

    return true;
  } catch (error) {
    console.warn('Failed to delete workspace on backend:', error);
    // Still return true for local deletion
    return true;
  }
}

