import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import SharedWorkspaceDashboard from './pages/SharedWorkspaceDashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/workspace-dashboard" replace />} />
          <Route path="/workspace-dashboard" element={<SharedWorkspaceDashboard />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App
