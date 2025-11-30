//storage
import { mockUsers, mockAssignments, mockWorkspaces, mockTasks } from "../../../../tests/utils/mockData.js";

export function displayDashboard(userID) {
// 1 - TEST CHECKS FIRST

    // 1st check - userID is valid (not null, undefined, a number, and greater than 0)
    if (userID  == null ||userID == undefined || typeof userID !== "number" || userID <= 0) {
        return {message: "Error: Invalid user"};
    }

     // 2nd check - lookup user in mock data -> evaluates to TRUE or FALSE
    const userExists = Object.values(mockUsers).some((user) => user.id === userID);
    if (!userExists) {
        return {message: "Error: User Not Found"};
    }

// 2 - FETCH USER DATA
    const user = Object.values(mockUsers).find(u => u.id === userID);
    const userAssignments = mockAssignments.filter(a => a.studentId === userID);
    const userWorkspaces = mockWorkspaces.filter(ws => ws.members.includes(userID))

// 3 - MAKE DASHBOARD SUMMARY TO RETURN
    const dashboard = {
        message: "Dashboard Loaded",
        user: {
            id: user.id,
            name: user.name,
            role: user.role,
        },
        summary: {
            totalAssignments: userAssignments.length,
            totalWorkspaces: userWorkspaces.length,
        },
        workspaces: userWorkspaces.map(ws => ({
            id: ws.id,
            name: ws.name,
            memberCount: ws.members.length,
        })),
        assignments: userAssignments.map(a => ({
            id: a.id,
            title: a.title,
            status: a.status,
        })),
    }
    return dashboard
}

export function fetchUserTasks(userID) {
  // Validation
  if (userID == null || userID == undefined || typeof userID !== "number" || userID <= 0) {
    return { message: "Error: Invalid user" };
  }
  const userExists = Object.values(mockUsers).some((user) => user.id === userID);
  if (!userExists) {
    return { message: "Error: User Not Found" };
  }

  // Fetch tasks
  const tasks = (mockTasks || []).filter(t => t.userId === userID);
  return {
    message: "Tasks Loaded",
    count: tasks.length,
    tasks: tasks.map(t => ({ id: t.id, title: t.title, status: t.status }))
  };
}

export function renderCollaboratorList(workspaceId) {
  // Validation
  if (workspaceId == null || workspaceId == undefined || typeof workspaceId !== "string" || workspaceId.trim().length === 0) {
    return { message: "Error: Invalid workspace" };
  }
  const workspace = mockWorkspaces.find(ws => ws.id === workspaceId);
  if (!workspace) {
    return { message: "Error: Workspace Not Found" };
  }

  const collaborators = (workspace.collaboratorList || []).map(c => {
    const user = Object.values(mockUsers).find(u => u.id === c.userId);
    return { userId: c.userId, name: user ? user.name : "Unknown", role: c.role };
  });

  return {
    message: "Collaborators Loaded",
    workspace: { id: workspace.id, name: workspace.name },
    collaborators,
    count: collaborators.length
  };
}

export function updateWorkspaceView(userID, workspaceId) {
  // Validation
  if (userID == null || userID == undefined || typeof userID !== "number" || userID <= 0) {
    return { message: "Error: Invalid user" };
  }
  if (workspaceId == null || workspaceId == undefined || typeof workspaceId !== "string" || workspaceId.trim().length === 0) {
    return { message: "Error: Invalid workspace" };
  }

  const userExists = Object.values(mockUsers).some((user) => user.id === userID);
  if (!userExists) {
    return { message: "Error: User Not Found" };
  }

  const workspace = mockWorkspaces.find(ws => ws.id === workspaceId);
  if (!workspace) {
    return { message: "Error: Workspace Not Found" };
  }

  const isMember = (workspace.members || []).includes(userID);
  if (!isMember) {
    return { message: "Error: Access Denied" };
  }

  return {
    message: "Workspace View Updated",
    workspace: { id: workspace.id, name: workspace.name, memberCount: (workspace.members || []).length }
  };
}