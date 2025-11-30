StudySync is a collaborative study tool designed for college students that combines AI-powered learning aids with real-time collaboration to make studying and exam preparation more efficient, organized, and engaging for all involved.

# Vision:

Combine collaboration and AI to streamline studying and exam prep. Students often waste time managing scattered materials across different platforms. StudySync provides a single hub to save time, improve collaboration, and boost exam readiness.

# Features

- Shared Workspaces – Upload and organize notes, slides, and problem sets in one place.  
- AI Study Guide Generator – Create instant summaries, quizzes, and flashcards.  
- Collaborative Whiteboard – Work together in real time on problems and diagrams.  
- Automatic Quiz Creation – Generate practice quizzes from uploaded materials.

# Audience

- College Students in STEM (CS, Engineering, Math, Physics)  
- Tutors and TAs running review sessions  
- Student Orgs hosting group study and prep events  

# Usage

1. Create a workspace and invite collaborators.  
2. Upload study materials (notes, slides, problem sets).  
3. Generate AI-powered quizzes and flashcards.  
4. Use the real-time whiteboard to collaborate during study sessions.  

# Tech Stack
- **Frontend:** React + Tailwind CSS  
- **Backend:** Node.js (Express)  
- **Database:** Firebase / JSON mock data  
- **AI Integration:** OpenAI API  
- **Testing:** Javascript (Manual Tests) 
- **Version Control:** Git + GitHub (GitOps workflow)


# Branch Strategy
- **main** -> production-ready (merge into main when feature complete)
- **feature** -> each person's own branch for features and tests


# Repository Structure
```text
StudySync/
├── backend/
│   ├── src/
│   │   └── app.js            # Backend entry point
│   └── package.json          # Backend dependencies
├── docs/
│   ├── design.md             # System design / diagrams
│   ├── requirements.md       # Functional + non-functional requirements
│   └── sprints.md            # Sprint notes / team backlog
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── QuizGenerator.js
│   │   │   ├── Whiteboard.js
│   │   │   └── Workspace.js
│   │   └── App.js            # Frontend app entry
│   └── package.json          # Frontend dependencies
├── tests/
│   ├── assignmentTracker/              # Will Ehrhart
│   │   ├── test_addAssignment.js
│   │   ├── test_markAsComplete.js
│   │   └── test_getUpcomingAssignments.js
│   ├── sharedWorkspaceDashboard/       # Gakuo Kairu
│   │   ├── test_displayDashboard.js
│   │   ├── test_updateWorkspaceView.js
│   │   ├── test_fetchUserTasks.js
│   │   └── test_renderCollaboratorList.js
│   ├── tutorTab/                       # Ryan King
│   │   ├── test_getStudentInfo.js
│   │   ├── test_addStudent.js
│   │   └── test_updateNotes.js
│   ├── practiceProblems/               # Ridwan Durosimi
│   │   ├── test_studentSelect.js
│   │   ├── test_assignWork.js
│   │   └── test_sendAssignment.js
│   ├── darriusFeature/                 # Darrius Gardner
│   │   └── README.md
│   ├── utils/                # Shared test utilities
│   │   └── mockData.js
│   └── README.md             # Test naming conventions & guidelines
├── .gitignore                # Git ignore file
├── LICENSE                   # License file
└── README.md                 # Project overview
```

# Contributing
**Starting from scratch (first time setup)** 
``` text
# Run all of this in terminal

git clone <repo-url>        # 1 - clone repo from Github to local machine
cd StudySync                # 2 - move into repo folder

git checkout main           # 3 - Jump into main branch first
git pull origin main        # 4 - Pull latest version from Github (IMPORTANT)

cd frontend && npm install  # 5 - install frontend dependencies
cd ../backend && npm install    # 6 - install backend dependecies
cd ..                       # 7 - return to root folder 
```

**Working on a test (no file overlap)** 
- always **Commit -> Pull -> Push**
``` text
git pull origin main                 # 1 - Always pull latest main first

# 2 - Make your changes in your test folder

git pull origin main
git add .                            # 3 - Stage changes
git commit -m "update test file"     # 4 - Commit with a short message
git pull origin main                 # 5 - IMPORTANT - Pull new changes from main
git push origin main                 # 5 - Push directly to main

```
**Working on a feature (conneted code with everyone)** 
``` text
# 1 - Create your own branch for your feature
git checkout -b feature/<your-name>-<feature>   

# 2 - Work/test only on your assigned files/folder
```

**Saving + Merging feature work** 
``` text
git add .                                       # 1 - Stage all changes
git commit -m "add short description"           # 2 - Commit on feature branch w/short message

git checkout main                               # 3 - Switch to main
git pull origin main                            # 4 - IMPORTANT - Pull latest version of main

git checkout feature/<your-name>-<feature>      # 5 - Go back to feature branch
git merge main                                  # 6 - Merge new changes (if any) from main into your feature branch

git push origin feature/<your-name>-<feature>   # 7 - Push your branch to GitHub

# 8 - When feature is ready, open a Pull Request (PR) on GitHub:
#     Base: main
#     Compare: your feature branch
#     - Get a teammate to review before merging
#     - Use “Squash + Merge”  to keep commit history clean

## 9 - After Merge
git checkout main           # 1 - Switch to main
git pull origin main        # 2 - Get the latest code after merge
```

# Testing
Each teammate writes and runs manual JavaScript tests for their individual feature to verify across 4 equivalence partitions:
- Correct Case – valid input(s) behave as expected
- Incorrect Case – invalid input(s) trigger error
- Boundary Case – input(s) at the lowest/highest valid limits still work
- Edge Case – unexpected/unusual input(s) (null, empty string, etc.) still work

## Reviewer: Unit Test Execution Steps
1. Clone the assigned repository
   ```bash
   git clone <repo-url>
   cd StudySync
   ```
2. Install prerequisites (Node.js ≥ 18 recommended)
   - macOS users can use Homebrew: `brew install node`
   - Verify: `node -v` (should be 18 or higher)
3. Run a Unit Test from the `tests/` folder
   - Navigate to the feature’s test directory and run a test file with Node:
   ```bash
   cd tests/<feature-folder>
   node <test_file>.js
   ```
   - Example:
   ```bash
   cd tests/sharedWorkspaceDashboard
   node test_displayDashboard.js
   ```
4. Verify Test Execution
   - Confirm that the Unit Test runs successfully (look for PASS/expected output)

# Contact
- Team F - CS3203 Fall 2025 - University of Oklahoma