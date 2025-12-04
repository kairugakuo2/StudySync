import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AssignmentTracker from './pages/assignmentTracker/AssignmentTracker';
import PracticeProblems from './pages/practiceProblems/PracticeProblems';
import SessionManager from './pages/sessionManager/SessionManager';
import SharedWorkspaceDashboard from './pages/sharedWorkspace/SharedWorkspaceDashboard';
import Workspace from './pages/workspace/Workspace';
import TutorTab from './pages/tutorTab/TutorTab';
import UserSelect from './pages/userSelect/UserSelect';
import './App.css';

function ProtectedRoute({ children }) {
  const currentUserId = localStorage.getItem('currentUserId');
  
  if (!currentUserId) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/login" element={<UserSelect />} />
          <Route path="/" element={<Navigate to="/workspace-dashboard" replace />} />
          <Route 
            path="/workspace-dashboard" 
            element={
              <ProtectedRoute>
                <SharedWorkspaceDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/assignment-tracker" element={<AssignmentTracker />} />
          <Route path="/practice-problems" element={<PracticeProblems />} />
          <Route path="/session-manager" element={<SessionManager />} />
          <Route path="/workspace/:workspaceId" element={<Workspace />} />
          <Route path="/tutor-tab" element={<TutorTab />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App
