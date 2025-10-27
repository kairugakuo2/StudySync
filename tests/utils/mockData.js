// Shared Mock Data for Tests (single source of truth)
// Used across all test files to keep data shapes consistent.

// ---------- USERS ----------
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
    name: "Carlos Rivera",
    email: "carlos.rivera@university.edu",
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

  // Tutors
  tutor1: {
    id: 6,
    name: "Dr. Johnson",
    email: "dr.johnson@university.edu",
    role: "tutor",
    courses: ["CS3203"],
    notes: [],
    sessions: []
  },
  tutor2: {
    id: 7,
    name: "Dr. Green",
    email: "dr.green@university.edu",
    role: "tutor",
    courses: ["MATH101"],
    notes: [],
    sessions: []
  },
  tutor3: {
    id: 8,
    name: "Prof. Miller",
    email: "prof.miller@university.edu",
    role: "tutor",
    courses: ["PHYS201"],
    notes: [],
    sessions: []
  },
  tutor4: {
    id: 9,
    name: "Dr. Carter",
    email: "dr.carter@university.edu",
    role: "tutor",
    courses: ["ENGL102"],
    notes: [],
    sessions: []
  },
  tutor5: {
    id: 10,
    name: "Dr. Patel",
    email: "dr.patel@university.edu",
    role: "tutor",
    courses: ["HIST210"],
    notes: [],
    sessions: []
  },

  // Edge users for validation tests
  emptyName: {
    id: 11,
    name: "",
    email: "empty.name@university.edu",
    role: "student",
    courses: []
  },
  emojiName: {
    id: 12,
    name: "🧠🔥",
    email: "emoji@university.edu",
    role: "student",
    courses: ["CS3203"]
  },
  nullEmail: {
    id: 13,
    name: "Null Email",
    email: null,
    role: "student",
    courses: ["CS3203"]
  }
};

// ---------- ASSIGNMENTS ----------
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
export const mockWorkspaces = [
  {
    id: "ws_001",
    name: "CS3203 Study Group",
    description: "Collaborative workspace for Data Structures",
    members: [1, 2, 6],
    createdAt: "2025-09-15T10:00:00Z",
    collaboratorList: [
      { userId: 1, role: "member" },
      { userId: 2, role: "member" },
      { userId: 6, role: "tutor" }
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
export const mockTasks = [
  { id: "t_001", userId: 1, title: "Review Trees", status: "open", updatedAt: "2025-10-12T09:00:00Z" },
  { id: "t_002", userId: 1, title: "Finish Assignment a_001", status: "open", updatedAt: "2025-10-13T14:15:00Z" },
  { id: "t_003", userId: 2, title: "Study Sorting", status: "done", updatedAt: "2025-10-08T18:30:00Z" }
];

// ---------- PRACTICE PROBLEMS ----------
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
