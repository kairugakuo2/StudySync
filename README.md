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

# Contact

- Team F - CS3203 Fall 2025

# Branch Strategy
- main -> production-ready
- dev -> testing
- feature branches -> each ticket
- squash + merge -> keep history clean

# Repository Structure

## 📂 Repository Structure

```text
StudySync/
├── backend/
│   ├── src/
│   │   └── app.js            # Backend entry point
│   └── package.json          # Backend dependencies
├── docs/
│   ├── design.md             # System design / diagrams
│   ├── requirements.md       # Functional + non-functional requirements
│   └── sprints.md            # Sprint notes / backlog
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── QuizGenerator.js
│   │   │   ├── Whiteboard.js
│   │   │   └── Workspace.js
│   │   └── App.js            # Frontend app entry
│   └── package.json          # Frontend dependencies
├── .gitignore                # Git ignore file
├── LICENSE                   # License file
└── README.md                 # Project overview
