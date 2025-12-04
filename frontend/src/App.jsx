import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AssignmentTracker from './pages/AssignmentTracker';
import PracticeProblems from './pages/PracticeProblems';
import SessionManager from './pages/SessionManager';
import SharedWorkspaceDashboard from './pages/SharedWorkspaceDashboard';
import TutorTab from './pages/TutorTab';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/workspace-dashboard" replace />} />
          <Route path="/assignment-tracker" element={<AssignmentTracker />} />
          <Route path="/practice-problems" element={<PracticeProblems />} />
          <Route path="/session-manager" element={<SessionManager />} />
          <Route path="/workspace-dashboard" element={<SharedWorkspaceDashboard />} />
          <Route path="/tutor-tab" element={<TutorTab />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App
