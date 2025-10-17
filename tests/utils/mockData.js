// Shared Mock Data for Tests (single source of truth)
// Use these across all test files to keep shapes consistent.

export const mockUsers = {
  student1: {
    id: "u_001",
    name: "John Doe",
    email: "john.doe@university.edu",
    role: "student",
    courses: ["CS3203", "MATH101"],
    notes: ["Needs help with trees"],
    sessions: [
      { date: "2025-10-10T14:00:00Z", tutorId: "u_003", topic: "Binary Trees" }
    ]
  },
  student2: {
    id: "u_002",
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    role: "student",
    courses: ["CS3203", "PHYS201"],
    notes: [],
    sessions: []
  },
  tutor: {
    id: "u_003",
    name: "Dr. Johnson",
    email: "dr.johnson@university.edu",
    role: "tutor",
    courses: ["CS3203"],
    notes: [],
    sessions: []
  },
  // Edge users for validation tests
  emptyName: {
    id: "u_004",
    name: "",
    email: "empty.name@university.edu",
    role: "student",
    courses: []
  },
  emojiName: {
    id: "u_005",
    name: "🧠🔥",
    email: "emoji@university.edu",
    role: "student",
    courses: ["CS3203"]
  },
  nullEmail: {
    id: "u_006",
    name: "Null Email",
    email: null,
    role: "student",
    courses: ["CS3203"]
  }
};

export const mockAssignments = [
  {
    id: "a_001",
    title: "Data Structures Assignment",
    course: "CS3203",
    dueDate: "2025-10-20T23:59:00Z",
    status: "pending",
    studentId: "u_001",
    createdAt: "2025-10-01T12:00:00Z",
    completedAt: null
  },
  {
    id: "a_002",
    title: "Algorithm Analysis",
    course: "CS3203",
    dueDate: "2025-10-05T23:59:00Z",
    status: "completed",
    studentId: "u_002",
    createdAt: "2025-09-25T10:00:00Z",
    completedAt: "2025-10-03T15:30:00Z"
  },
  // Invalid for negative tests (bad date + empty title)
  {
    id: "a_bad",
    title: "",
    course: "CS3203",
    dueDate: "not-a-date",
    status: "pending",
    studentId: "u_001",
    createdAt: "2025-10-01T12:00:00Z",
    completedAt: null
  }
];

export const mockWorkspaces = [
  {
    id: "ws_001",
    name: "CS3203 Study Group",
    description: "Collaborative workspace for Data Structures",
    members: ["u_001", "u_002", "u_003"],
    createdAt: "2025-09-15T10:00:00Z",
    collaboratorList: [
      { userId: "u_001", role: "member" },
      { userId: "u_002", role: "member" },
      { userId: "u_003", role: "tutor" }
    ]
  },
  // Edge: workspace with no members
  {
    id: "ws_empty",
    name: "Empty Workspace",
    description: "No members yet",
    members: [],
    createdAt: "2025-10-01T10:00:00Z",
    collaboratorList: []
  }
];

// Tasks to support fetchUserTasks(userId) and dashboard counts
export const mockTasks = [
  { id: "t_001", userId: "u_001", title: "Review Trees", status: "open", updatedAt: "2025-10-12T09:00:00Z" },
  { id: "t_002", userId: "u_001", title: "Finish Assignment a_001", status: "open", updatedAt: "2025-10-13T14:15:00Z" },
  { id: "t_003", userId: "u_002", title: "Study Sorting", status: "done", updatedAt: "2025-10-08T18:30:00Z" }
];

export const mockPracticeProblems = [
  {
    id: "pp_001",
    title: "Binary Tree Traversal",
    difficulty: "medium",
    course: "CS3203",
    description: "Implement inorder, preorder, and postorder traversal",
    assignmentSent: false,
    sentTo: [] // e.g., ["u_001"]
  },
  // Edge: max length title, odd difficulty
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
