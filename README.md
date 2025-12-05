# StudySync

StudySync is a collaborative study tool designed for college students that combines AI-powered learning aids with real-time collaboration to make studying and exam preparation more efficient, organized, and engaging for all involved.

## Vision

Combine collaboration and AI to streamline studying and exam prep. Students often waste time managing scattered materials across different platforms. StudySync provides a single hub to save time, improve collaboration, and boost exam readiness.

## Features

- **Shared Workspaces** – Upload and organize notes, slides, and problem sets in one place.  
- **AI Study Guide Generator** – Create instant summaries, quizzes, and flashcards.  
- **Collaborative Whiteboard** – Work together in real time on problems and diagrams.  
- **Automatic Quiz Creation** – Generate practice quizzes from uploaded materials.
- **Assignment Tracker** – Track and manage assignments with due dates and status.
- **Session Manager** – Organize and manage study sessions with collaborators.
- **Tutor Tab** – Tools for tutors to manage students and track progress.

## Audience

- College Students in STEM (CS, Engineering, Math, Physics)  
- Tutors and TAs running review sessions  
- Student Orgs hosting group study and prep events  

## Usage

1. Create a workspace and invite collaborators.  
2. Upload study materials (notes, slides, problem sets).  
3. Generate AI-powered quizzes and flashcards.  
4. Use the real-time whiteboard to collaborate during study sessions.  
5. Track assignments and manage study sessions.

## Tech Stack

- **Frontend:** React 19 + Vite + React Router DOM
- **Backend:** Node.js (Express) - *Optional, for local development only*
- **Data:** Mock data (JSON) - *No database required*
- **AI Integration:** OpenAI API (planned)
- **Testing:** JavaScript (Manual Tests)
- **Version Control:** Git + GitHub
- **Deployment:** Vercel (Frontend-only)

## Quick Start

### Prerequisites
- Node.js ≥ 18
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd StudySync

# Install frontend dependencies
cd frontend
npm install

# (Optional) Install backend dependencies for local testing
cd ../backend
npm install
```

### Running Locally

**Frontend Only (Recommended):**
```bash
cd frontend
npm run dev
```
App runs at `http://localhost:5173` with mock data.

**With Backend (Optional - for testing):**
```bash
# Terminal 1: Backend
cd backend
npm start
# Backend runs at http://localhost:3000

# Terminal 2: Frontend
cd frontend
npm run dev
# Frontend runs at http://localhost:5173
```

**Note:** The frontend works standalone with mock data. Backend is optional and only needed for local API testing.

## Deployment

StudySync uses **frontend-only deployment** - no backend required!

### Deploy to Vercel (Recommended)

```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

That's it! Your app is live. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

**Key Points:**
- Frontend works entirely with mock data and local state
- No backend deployment needed
- No database required
- Free hosting on Vercel

## Repository Structure

```
StudySync/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── api/                # API client functions
│   │   ├── components/         # React components
│   │   │   ├── sharedWorkspace/
│   │   │   │   ├── CollaboratorList.jsx
│   │   │   │   ├── UserTaskList.jsx
│   │   │   │   └── WorkspacePreview.jsx
│   │   │   ├── QuizGenerator.js
│   │   │   ├── Whiteboard.js
│   │   │   └── Workspace.js
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── useSharedWorkspace.js
│   │   ├── layouts/            # Layout components
│   │   │   └── RootLayout.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── assignmentTracker/
│   │   │   ├── practiceProblems/
│   │   │   ├── sessionManager/
│   │   │   ├── sharedWorkspace/
│   │   │   ├── tutorTab/
│   │   │   └── userSelect/
│   │   ├── utils/              # Utilities
│   │   │   └── mockData.js     # Frontend mock data
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── public/                 # Static assets
│   ├── vercel.json             # Vercel deployment config
│   └── package.json
│
├── backend/                     # Express backend (optional, local dev only)
│   ├── src/
│   │   ├── features/           # Feature controllers
│   │   │   ├── assignmentTracker/
│   │   │   ├── sessionManager/
│   │   │   ├── shared-workspace-dashboard/
│   │   │   └── tutor-tab/
│   │   ├── utils/
│   │   │   └── mockData.js     # Backend mock data
│   │   └── app.js              # Express app entry point
│   └── package.json
│
├── tests/                       # Manual test files
│   ├── assignmentTracker/
│   ├── sharedWorkspaceDashboard/
│   ├── tutorTab/
│   ├── practiceProblems/
│   ├── sessionManager/
│   ├── utils/
│   │   └── mockData.js         # Shared test mock data
│   └── README.md
│
├── docs/                        # Documentation
│   ├── DEPLOYMENT.md           # Deployment guide
│   ├── CICD_SETUP.md           # CI/CD setup
│   ├── design.md               # System design
│   ├── requirements.md         # Requirements
│   └── sprints.md              # Sprint notes
│
├── .github/
│   └── workflows/              # GitHub Actions
│       ├── ci.yml              # CI pipeline
│       └── deploy-frontend.yml # Frontend deployment
│
├── docker-compose.yml           # Docker setup (optional)
└── README.md                   # This file
```

## Architecture

### Data Flow
- **Frontend** → Tries to call backend API → Falls back to mock data if unavailable
- **Mock Data** → Located in `frontend/src/utils/mockData.js` (deployed with frontend)
- **Local State** → React hooks manage all UI state
- **No Persistence** → Perfect for demos and development

### Key Design Decisions
- **Frontend-First:** App works entirely client-side
- **Graceful Degradation:** API failures don't break the app
- **Mock Data Everywhere:** Same data structure across frontend, backend, and tests
- **Feature-Based Organization:** Components organized by feature

## Branch Strategy

- **main** → Production-ready code (merge when feature complete)
- **feature/** → Individual feature branches
  - Format: `feature/<your-name>-<feature-name>`

## Contributing

### First Time Setup

```bash
# Clone repository
git clone <repo-url>
cd StudySync

# Switch to main branch
git checkout main
git pull origin main

# Install frontend dependencies
cd frontend
npm install

# (Optional) Install backend dependencies
cd ../backend
npm install
cd ..
```

### Working on a Feature

```bash
# Create feature branch
git checkout -b feature/<your-name>-<feature-name>

# Make your changes
# ...

# Commit and push
git add .
git commit -m "Add feature description"
git push origin feature/<your-name>-<feature-name>

# Create Pull Request on GitHub
# - Base: main
# - Compare: your feature branch
# - Get review before merging
# - Use "Squash + Merge" to keep history clean
```

### Working on Tests (No File Overlap)

```bash
# Always pull latest first
git pull origin main

# Make your test changes
# ...

# Commit and push
git add .
git commit -m "Update test file"
git pull origin main  # Pull any new changes
git push origin main
```

## Testing

Each teammate writes and runs manual JavaScript tests for their individual feature to verify across 4 equivalence partitions:

- **Correct Case** – Valid input(s) behave as expected
- **Incorrect Case** – Invalid input(s) trigger error
- **Boundary Case** – Input(s) at lowest/highest valid limits still work
- **Edge Case** – Unexpected/unusual input(s) (null, empty string, etc.) still work

### Running Tests

```bash
# Navigate to test directory
cd tests/<feature-folder>

# Run a test file
node <test_file>.js

# Example
cd tests/sharedWorkspaceDashboard
node test_displayDashboard.js
```

### Test Structure

Tests are located in `tests/` organized by feature:
- `assignmentTracker/` - Will Ehrhart
- `sharedWorkspaceDashboard/` - Gakuo Kairu
- `tutorTab/` - Ryan King
- `practiceProblems/` - Ridwan Durosimi
- `sessionManager/` - Session management tests

## CI/CD

- **CI Pipeline:** Runs on every push/PR (linting, build checks)
- **Frontend Deployment:** Auto-deploys to Vercel on push to `main`
- **Backend:** Not deployed (frontend works standalone)

See [docs/CICD_SETUP.md](docs/CICD_SETUP.md) for details.

## Environment Variables

### Frontend (Optional)
```bash
VITE_API_URL=  # Leave empty to use mock data only
```

If `VITE_API_URL` is not set, the app automatically uses mock data from `frontend/src/utils/mockData.js`.

## Documentation

- [Deployment Guide](docs/DEPLOYMENT.md) - How to deploy the frontend
- [CI/CD Setup](docs/CICD_SETUP.md) - Continuous integration/deployment
- [Design Docs](docs/design.md) - System design and architecture
- [Requirements](docs/requirements.md) - Functional and non-functional requirements
- [Sprints](docs/sprints.md) - Sprint notes and team backlog

## Team

**Team F - CS3203 Fall 2025 - University of Oklahoma**

- Will Ehrhart - Assignment Tracker
- Gakuo Kairu - Shared Workspace Dashboard
- Ryan King - Tutor Tab
- Ridwan Durosimi - Practice Problems
- Darrius Gardner - Session Manager

## License

MIT License - See [LICENSE](LICENSE) file for details.
