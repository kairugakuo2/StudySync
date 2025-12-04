const API_BASE_URL = 'http://localhost:3000';

// Mock data fallbacks
const mockCollaborators = [
  { userId: 1, name: "John Doe", role: "member" },
  { userId: 2, name: "Jane Smith", role: "member" },
  { userId: 6, name: "Dr. Johnson", role: "tutor" }
];

const mockTasks = [
  { id: "t_001", title: "Review Trees", status: "open" },
  { id: "t_002", title: "Finish Assignment a_001", status: "open" }
];

const mockWorkspaceState = {
  id: "ws_001",
  name: "CS3203 Study Group",
  status: "active",
  memberCount: 3
};

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

