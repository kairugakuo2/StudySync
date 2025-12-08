import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AssignmentTracker from './pages/assignmentTracker/AssignmentTracker';
import PracticeProblems from './pages/practiceProblems/PracticeProblems';
import SessionManager from './pages/sessionManager/SessionManager';
import SharedWorkspaceDashboard from './pages/sharedWorkspace/SharedWorkspaceDashboard';
import SharedWorkspace from './pages/sharedWorkspace/SharedWorkspace';
import Workspace from './pages/workspace/Workspace';
import TutorTab from './pages/tutorTab/TutorTab';
import UserSelect from './pages/userSelect/UserSelect';
import DemoLogin from './components/DemoLogin';
import AuthService from './services/authService';
import './App.css';

function ProtectedRoute({ children }) {
  // Check both old system (currentUserId) and new system (demo_username)
  const currentUserId = localStorage.getItem('currentUserId');
  const isDemoAuth = AuthService.isAuthenticated();
  
  if (!currentUserId && !isDemoAuth) {
    return <Navigate to="/demo-login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/login" element={<UserSelect />} />
          <Route path="/demo-login" element={<DemoLogin />} />
          <Route path="/" element={<Navigate to="/workspace-dashboard" replace />} />
          <Route 
            path="/workspace-dashboard" 
            element={
              <ProtectedRoute>
                <SharedWorkspaceDashboard />
              </ProtectedRoute>
            } 
          />
          <Route
          path="/assignment-tracker"
          element={
            <ProtectedRoute>
              <AssignmentTracker />
            </ProtectedRoute>              
            }
          />
          <Route path="/practice-problems" element={<PracticeProblems />} />
          <Route path="/session-manager" element={<SessionManager />} />
          <Route 
            path="/shared-workspace/:workspaceId" 
            element={
              <ProtectedRoute>
                <SharedWorkspace />
              </ProtectedRoute>
            } 
          />
          <Route path="/workspace/:workspaceId" element={<Workspace />} />
          <Route path="/tutor-tab" element={<TutorTab />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App
