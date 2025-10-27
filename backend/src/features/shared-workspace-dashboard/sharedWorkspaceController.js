//storage
import { mockUsers, mockAssignments, mockWorkspaces } from "../../../../tests/utils/mockData.js";

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