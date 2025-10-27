//storage
import { mockUsers, mockAssignments, mockWorkspaces } from "../../../../tests/utils/mockData.js";

export function displayDashboard(userID) {

    // 1st check - userID is valid (not null, undefined, a number, and greater than 0)
    if (userID  == null ||userID == undefined || typeof userID !== "number" || userID <= 0) {
        return "Error: Invalid user";
    }

    // 2nd check - lookup user in mock data -> evaluates to TRUE or FALSE
    const userExists = Object.values(mockUsers).some(
        (user) => user.id === userID
    );
    
    if (userExists) {
        return "Dashboard Loaded";
    } else {
        return "Error: User Not Found";
    }
}