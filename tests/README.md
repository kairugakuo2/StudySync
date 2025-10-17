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
│   └── README.md
│
├── utils/                    # Shared test utilities
│   ├── mockData.js
│   ├── testHelpers.js
│   └── setup.js
│
└── README.md                 # This file
```

### Team Responsibilities
- **Will Ehrhart**: Assignment Tracker functionality
- **Gakuo Kairu**: Shared Workspace Dashboard
- **Ryan King**: Tutor Tab features
- **Ridwan Durosimi**: Practice Problems
- **Darrius Gardner**: TBD (placeholder folder ready)

### File Naming
- test files must start with `test_`
- Examples:
  - `test_addAssignment.js` ✅
  - `addAssignment.js` ❌ (missing test_ prefix)

### Test Structure
Each file should include four main test cases:
- Correct Case – valid inputs behave as expected
- Incorrect Case – invalid inputs show an error
- Boundary Case – lowest/highest valid inputs still work
- Edge Case – weird inputs (null, empty string, etc.) don’t break anything

### Run specific test file

```bash
cd tests/sharedWorkspaceDashboard
node test_displayDashboard_manual.js
```

## Shared Utilities

The `utils/` directory contains shared resources:

- **`mockData.js`**: Common mock data objects for testing
- Each teammate can import mock data:
```text
const { mockUsers, mockAssignments } = require("../utils/mockData.js");
```

## Best Practices

1. Keep it local – run tests with Node only
2. Stay organized – one folder per teammate
3. Use mockData.js instead of making new fake data
4. Comment your tests – explain what’s being tested
5. Keep it simple – if it works and prints PASS/FAIL, it’s good

## Adding New Tests

1. Create your test file in the appropriate team directory
2. Follow the naming convention: `test_[featureName].js`
3. Import shared utilities from `../utils/` if needed
4. Update this README if you add new shared utilities

## Questions?

If you have questions about testing conventions or need help with test setup, reach out to the team or check the shared utilities in the `utils/` directory.
