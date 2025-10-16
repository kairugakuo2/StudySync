// Shared Mock Data for Tests
// Contains common mock data used across different test files

export const mockUsers = {
  student1: {
    id: 'user_001',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    role: 'student',
    courses: ['CS3203', 'MATH101']
  },
  student2: {
    id: 'user_002',
    name: 'Jane Smith',
    email: 'jane.smith@university.edu',
    role: 'student',
    courses: ['CS3203', 'PHYS201']
  },
  tutor: {
    id: 'user_003',
    name: 'Dr. Johnson',
    email: 'dr.johnson@university.edu',
    role: 'tutor',
    courses: ['CS3203']
  }
};

export const mockAssignments = [
  {
    id: 'assign_001',
    title: 'Data Structures Assignment',
    course: 'CS3203',
    dueDate: '2024-02-15',
    status: 'pending',
    studentId: 'user_001'
  },
  {
    id: 'assign_002',
    title: 'Algorithm Analysis',
    course: 'CS3203',
    dueDate: '2024-02-20',
    status: 'completed',
    studentId: 'user_002'
  }
];

export const mockWorkspaces = [
  {
    id: 'workspace_001',
    name: 'CS3203 Study Group',
    description: 'Collaborative workspace for Data Structures course',
    members: ['user_001', 'user_002', 'user_003'],
    createdAt: '2024-01-15T10:00:00Z'
  }
];

export const mockPracticeProblems = [
  {
    id: 'problem_001',
    title: 'Binary Tree Traversal',
    difficulty: 'medium',
    course: 'CS3203',
    description: 'Implement inorder, preorder, and postorder traversal'
  }
];
