// Shared Mock Data 
// Used across all test files to keep data shapes consistent.

// ---------- USERS ----------
// mockUsers: Single source of truth for all user identities (students and tutors)
// Used by Assignment Tracker, Session Manager, Tutor Tab, and Shared Workspace features
export const mockUsers = {
  // Students
  student1: {
    id: 1,
    name: "John Doe",
    email: "john.doe@university.edu",
    role: "student",
    courses: ["CS3203", "MATH101"],
    notes: ["Needs help with trees"],
    sessions: [
      { date: "2025-10-10T14:00:00Z", tutorId: 8, topic: "Binary Trees" }
    ]
  },
  student2: {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    role: "student",
    courses: ["CS3203", "PHYS201"],
    notes: [],
    sessions: []
  },
  student3: {
    id: 3,
    name: "Carlos Vega",
    email: "carlos.vega@university.edu",
    role: "student",
    courses: ["CS3203", "ENGL102"],
    notes: ["Prefers group study"],
    sessions: []
  },
  student4: {
    id: 4,
    name: "Ava Lee",
    email: "ava.lee@university.edu",
    role: "student",
    courses: ["MATH101"],
    notes: [],
    sessions: []
  },
  student5: {
    id: 5,
    name: "Liam Patel",
    email: "liam.patel@university.edu",
    role: "student",
    courses: ["CS3203", "HIST210"],
    notes: [],
    sessions: []
  },
  student6: {
    id: 6,
    name: "Michael Brown",
    email: "michael.brown@university.edu",
    role: "student",
    courses: ["CS3203"],
    notes: [],
    sessions: []
  },
  student7: {
    id: 7,
    name: "Sara Williams",
    email: "sara.williams@university.edu",
    role: "student",
    courses: ["CS3203"],
    notes: [],
    sessions: []
  },
  student8: {
    id: 8,
    name: "David Chen",
    email: "david.chen@university.edu",
    role: "student",
    courses: ["CS3203"],
    notes: [],
    sessions: []
  },
  student9: {
    id: 9,
    name: "Lisa Thompson",
    email: "lisa.thompson@university.edu",
    role: "student",
    courses: ["CS3203"],
    notes: [],
    sessions: []
  },
  student10: {
    id: 10,
    name: "Alicia Martinez",
    email: "alicia.martinez@university.edu",
    role: "student",
    courses: ["CS3203"],
    notes: [],
    sessions: []
  },

  // Tutors (for other features - IDs 6-10 are now students for workspace)
  tutor1: {
    id: 20,
    name: "Dr. Green",
    email: "dr.green@university.edu",
    role: "tutor",
    courses: ["MATH101"],
    notes: [],
    sessions: []
  },
  tutor2: {
    id: 21,
    name: "Prof. Miller",
    email: "prof.miller@university.edu",
    role: "tutor",
    courses: ["PHYS201"],
    notes: [],
    sessions: []
  },
  tutor3: {
    id: 22,
    name: "Dr. Carter",
    email: "dr.carter@university.edu",
    role: "tutor",
    courses: ["ENGL102"],
    notes: [],
    sessions: []
  },
  tutor4: {
    id: 23,
    name: "Dr. Patel",
    email: "dr.patel@university.edu",
    role: "tutor",
    courses: ["HIST210"],
    notes: [],
    sessions: []
  },
  tutor5: {
    id: 24,
    name: "Dr. Smith",
    email: "dr.smith@university.edu",
    role: "tutor",
    courses: ["CS3203"],
    notes: [],
    sessions: []
  },

  // Additional tutors for Shared Workspace Dashboard (IDs 11-13)
  tutor6: {
    id: 11,
    name: "Dr. Johnson",
    email: "dr.johnson.ws@university.edu",
    role: "tutor",
    courses: ["CS3203"],
    notes: [],
    sessions: []
  },
  tutor7: {
    id: 12,
    name: "Professor Lee",
    email: "prof.lee@university.edu",
    role: "tutor",
    courses: ["CS3203"],
    notes: [],
    sessions: []
  },
  tutor8: {
    id: 13,
    name: "TA Roberts",
    email: "ta.roberts@university.edu",
    role: "tutor",
    courses: ["CS3203"],
    notes: [],
    sessions: []
  },

  // Edge users for validation tests (moved to IDs 14-16 to avoid conflict with tutors)
  emptyName: {
    id: 14,
    name: "",
    email: "empty.name@university.edu",
    role: "student",
    courses: []
  },
  emojiName: {
    id: 15,
    name: "🧠🔥",
    email: "emoji@university.edu",
    role: "student",
    courses: ["CS3203"]
  },
  nullEmail: {
    id: 16,
    name: "Null Email",
    email: null,
    role: "student",
    courses: ["CS3203"]
  }
};

// ---------- ASSIGNMENTS ----------
// mockAssignments: Per-student assignment objects for Assignment Tracker feature
export const mockAssignments = [
  {
    id: "a_001",
    title: "Data Structures Assignment",
    course: "CS3203",
    dueDate: "2025-10-20T23:59:00Z",
    status: "pending",
    studentId: 1,
    createdAt: "2025-10-01T12:00:00Z",
    completedAt: null
  },
  {
    id: "a_002",
    title: "Algorithm Analysis",
    course: "CS3203",
    dueDate: "2025-10-05T23:59:00Z",
    status: "completed",
    studentId: 2,
    createdAt: "2025-09-25T10:00:00Z",
    completedAt: "2025-10-03T15:30:00Z"
  },
  // Invalid for negative tests
  {
    id: "a_bad",
    title: "",
    course: "CS3203",
    dueDate: "not-a-date",
    status: "pending",
    studentId: 1,
    createdAt: "2025-10-01T12:00:00Z",
    completedAt: null
  }
];

// ---------- WORKSPACES ----------
// mockWorkspaces: High-level workspace objects used by Shared Workspace + Session Manager tests
// Contains workspace metadata, member lists, and collaborator roles
export const mockWorkspaces = [
  {
    id: "ws_001",
    name: "CS3203 Study Group",
    description: "Shared group workspace for CS3203 Software Engineering.",
    members: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], // All users from mockUsers
    createdAt: "2025-09-15T10:00:00Z",
    collaboratorList: [
      { userId: 1, role: "member" },
      { userId: 2, role: "member" },
      { userId: 3, role: "member" },
      { userId: 4, role: "member" },
      { userId: 5, role: "member" },
      { userId: 6, role: "member" },
      { userId: 7, role: "member" },
      { userId: 8, role: "member" },
      { userId: 9, role: "member" },
      { userId: 10, role: "member" },
      { userId: 11, role: "tutor" }, // Dr. Johnson
      { userId: 12, role: "tutor" }, // Professor Lee
      { userId: 13, role: "tutor" }  // TA Roberts (edge case user)
    ]
  },
  // Edge workspace: no members
  {
    id: "ws_empty",
    name: "Empty Workspace",
    description: "No members yet",
    members: [],
    createdAt: "2025-10-01T10:00:00Z",
    collaboratorList: []
  }
];

// ---------- TASKS ----------
// mockTasks: Per-user tasks for Assignment Tracker feature (minimal set for testing)
export const mockTasks = [
  { id: "t_001", userId: 1, title: "Review Trees", status: "open", updatedAt: "2025-10-12T09:00:00Z" },
  { id: "t_002", userId: 1, title: "Finish Assignment a_001", status: "open", updatedAt: "2025-10-13T14:15:00Z" },
  { id: "t_003", userId: 2, title: "Study Sorting", status: "done", updatedAt: "2025-10-08T18:30:00Z" }
];

// mockWorkspaceTasks: Dashboard tasks for Shared Workspace view (expanded set with due dates)
// Note: These represent workspace-level tasks visible in the dashboard
// inProgressBy and doneBy track who marked the task with their status
export const mockWorkspaceTasks = [
  { id: 1, title: "Review Trees", status: "open", due: "2025-03-21T23:59:00Z" },
  { id: 2, title: "Finish Assignment a_001", status: "open", due: "2025-03-25T23:59:00Z" },
  { id: 3, title: "Rewatch DP Lecture", status: "in-progress", due: "2025-03-20T23:59:00Z", inProgressBy: { userId: 1, name: "John Doe", timestamp: "2025-03-19T10:00:00Z" } },
  { id: 4, title: "Prepare Notes for Session 3", status: "done", due: "2025-03-18T23:59:00Z", doneBy: { userId: 2, name: "Jane Smith", timestamp: "2025-03-18T15:30:00Z" } },
  { id: 5, title: "Solve Practice Problems Set 4", status: "open", due: "2025-03-28T23:59:00Z" },
  { id: 6, title: "Implement Binary Search Tree", status: "in-progress", due: "2025-03-22T23:59:00Z", inProgressBy: { userId: 3, name: "Carlos Vega", timestamp: "2025-03-19T14:20:00Z" } },
  { id: 7, title: "Create Flashcards for Hashing", status: "open", due: "2025-03-26T23:59:00Z" },
  { id: 8, title: "Debug Session Manager Tests", status: "open", due: "2025-03-24T23:59:00Z" },
  { id: 9, title: "Write Summary Notes for Trees", status: "done", due: "2025-03-19T23:59:00Z", doneBy: { userId: 1, name: "John Doe", timestamp: "2025-03-19T09:15:00Z" } },
  { id: 10, title: "Collaborate on Whiteboard Diagram", status: "in-progress", due: "2025-03-23T23:59:00Z", inProgressBy: { userId: 4, name: "Emily Nguyen", timestamp: "2025-03-19T11:45:00Z" } },
  { id: 11, title: "Review Partner Code", status: "open", due: "2025-03-30T23:59:00Z" },
  { id: 12, title: "Submit Team Retrospective", status: "open", due: "2025-03-29T23:59:00Z" }
];

// ---------- SHARED WORKSPACE DASHBOARD DATA ----------
// Helper: Presence status map for collaborators (active/idle/offline)
// Maps userId to presence status for dashboard display
const presenceByUserId = {
  1: "active", 2: "idle", 3: "offline", 4: "active", 5: "active",
  6: "idle", 7: "active", 8: "offline", 9: "active", 10: "idle",
  11: "active", 12: "offline", 13: "active"
};

// mockCollaborators: Derived from mockUsers + workspace membership + presence status
// role field uses workspaceRole ("member" for students, "tutor" for tutors) from mockWorkspaces[0].collaboratorList
export const mockCollaborators = mockWorkspaces[0].collaboratorList.map(collab => {
  const user = Object.values(mockUsers).find(u => u.id === collab.userId);
  return {
    userId: collab.userId,
    name: user ? user.name : `Unknown User ${collab.userId}`,
    role: collab.role, // workspaceRole: "member" | "tutor"
    status: presenceByUserId[collab.userId] || "offline"
  };
});

// mockWorkspaceState: Workspace metadata for Shared Workspace Dashboard
// Derived from mockWorkspaces[0] to ensure consistency
export const mockWorkspaceState = {
  id: mockWorkspaces[0].id, // "ws_001" - matches mockWorkspaces[0]
  name: mockWorkspaces[0].name, // "CS3203 Study Group"
  status: "active",
  memberCount: mockWorkspaces[0].members.length, // 13 - matches actual members array length
  tutor: mockUsers.tutor6.name, // "Dr. Johnson" - from mockUsers tutor6 (id: 11) which is in workspace members
  lastUpdated: "2025-03-19T14:12:00Z",
  description: mockWorkspaces[0].description // "Shared group workspace for CS3203 Software Engineering."
};

// mockUpcomingSession: Upcoming session details for Shared Workspace Dashboard
export const mockUpcomingSession = {
  topic: "Midterm Review: Trees, Hashing & Dynamic Programming",
  date: "2025-03-22",
  time: "6:00 PM CST",
  location: "Zoom Room 148",
  host: mockUsers.tutor8.name // "TA Roberts" - from mockUsers
};

// mockActivity: Recent activity feed for Shared Workspace Dashboard
// Note: "time" fields are preformatted display strings for UI (not ISO timestamps)
export const mockActivity = [
  { id: 1, message: "Workspace created", time: "2 hours ago" },
  { id: 2, message: `New collaborator joined: ${mockUsers.student4.name}`, time: "1 hour ago" },
  { id: 3, message: "Task assigned: Solve Practice Problems Set 4", time: "45 minutes ago" },
  { id: 4, message: `${mockUsers.student3.name} marked 'Review Trees' as complete`, time: "40 minutes ago" },
  { id: 5, message: "Tutor uploaded example solution set", time: "30 minutes ago" },
  { id: 6, message: `Member ${mockUsers.student2.name} joined the active session`, time: "25 minutes ago" },
  { id: 7, message: "Workspace view updated", time: "20 minutes ago" },
  { id: 8, message: "New chat message in workspace", time: "12 minutes ago" },
  { id: 9, message: `${mockUsers.tutor3.name} scheduled a new session`, time: "10 minutes ago" },
  { id: 10, message: "Member updated whiteboard diagram", time: "5 minutes ago" }
];

// ---------- PRACTICE PROBLEMS ----------
// mockPracticeProblems: Practice problem sets for Practice Problems feature
export const mockPracticeProblems = [
  {
    id: "pp_001",
    title: "Binary Tree Traversal",
    difficulty: "medium",
    course: "CS3203",
    description: "Implement inorder, preorder, and postorder traversal",
    assignmentSent: false,
    sentTo: []
  },
  {
    id: "pp_long",
    title: "X".repeat(128),
    difficulty: "unknown",
    course: "CS3203",
    description: "",
    assignmentSent: false,
    sentTo: []
  }
];

