# StudySync Test Suite

This directory contains all test files organized by team member and feature area.

## Directory Structure

```
tests/
├── assignmentTracker/        # Will Ehrhart
│   ├── test_addAssignment.js
│   ├── test_markAsComplete.js
│   └── test_getUpcomingAssignments.js
│
├── sharedWorkspaceDashboard/ # Gakuo Kairu
│   ├── test_displayDashboard.js
│   ├── test_updateWorkspaceView.js
│   ├── test_fetchUserTasks.js
│   └── test_renderCollaboratorList.js
│
├── tutorTab/                 # Ryan King
│   ├── test_getStudentInfo.js
│   ├── test_addStudent.js
│   └── test_updateNotes.js
│
├── practiceProblems/         # Ridwan Durosimi
│   ├── test_studentSelect.js
│   ├── test_assignWork.js
│   └── test_sendAssignment.js
│
├── darriusFeature/           # Darrius Gardner (placeholder)
│   └── 
│
├── utils/                    # Shared test utilities
│   ├── mockData.js
│
└── README.md                 # This file
```

## Test Naming Conventions

### File Naming
- All test files must start with `test_`
- Use descriptive names that indicate the functionality being tested
- Use camelCase for multi-word names
- Examples:
  - `test_addAssignment.js` ✅
  - `test_userAuthentication.js` ✅
  - `test_dataValidation.js` ✅
  - `addAssignment.js` ❌ (missing test_ prefix)

### Test Structure
- Use `describe()` blocks to group related tests
- Use descriptive test names that explain what is being tested
- Follow the pattern: "should [expected behavior] when [condition]"
- Examples:
  - `test('should add assignment successfully', () => { ... })`
  - `test('should handle validation errors when invalid data provided', () => { ... })`

### Team Responsibilities
- **Will Ehrhart**: Assignment Tracker functionality
- **Gakuo Kairu**: Shared Workspace Dashboard
- **Ryan King**: Tutor Tab features
- **Ridwan Durosimi**: Practice Problems
- **Darrius Gardner**: TBD (placeholder folder ready)

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests for specific team member
```bash
npm test -- --testPathPattern=assignmentTracker
npm test -- --testPathPattern=sharedWorkspaceDashboard
npm test -- --testPathPattern=tutorTab
npm test -- --testPathPattern=practiceProblems
```

### Run specific test file
```bash
npm test test_addAssignment.js
```

## Shared Utilities

The `utils/` directory contains shared resources:

- **`mockData.js`**: Common mock data objects for testing
- **`testHelpers.js`**: Utility functions for common test operations
- **`setup.js`**: Global test setup and configuration

## Best Practices

1. **Isolation**: Each team member works in their own directory
2. **Consistency**: Follow the established naming conventions
3. **Reusability**: Use shared utilities when possible
4. **Documentation**: Include comments explaining complex test logic
5. **Coverage**: Aim for comprehensive test coverage of your features
6. **Maintenance**: Keep tests up to date with code changes

## Adding New Tests

1. Create your test file in the appropriate team directory
2. Follow the naming convention: `test_[featureName].js`
3. Import shared utilities from `../utils/` if needed
4. Update this README if you add new shared utilities

## Questions?

If you have questions about testing conventions or need help with test setup, reach out to the team or check the shared utilities in the `utils/` directory.
