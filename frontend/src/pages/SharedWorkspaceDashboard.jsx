import { useSharedWorkspace } from '../hooks/useSharedWorkspace';
import CollaboratorList from '../components/sharedWorkspace/CollaboratorList';
import UserTaskList from '../components/sharedWorkspace/UserTaskList';
import WorkspacePreview from '../components/sharedWorkspace/WorkspacePreview';
import './SharedWorkspaceDashboard.css';

export default function SharedWorkspaceDashboard() {
  const { collaborators, tasks, workspace, loading, error } = useSharedWorkspace();

  if (loading) {
    return (
      <div className="shared-workspace-dashboard">
        <header className="dashboard-header">
          <h1>Shared Workspace Dashboard</h1>
        </header>
        <div className="loading-message">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shared-workspace-dashboard">
        <header className="dashboard-header">
          <h1>Shared Workspace Dashboard</h1>
        </header>
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="shared-workspace-dashboard">
      <header className="dashboard-header">
        <h1>Shared Workspace Dashboard</h1>
      </header>
      <div className="dashboard-grid">
        <CollaboratorList collaborators={collaborators} />
        <UserTaskList tasks={tasks} />
        <WorkspacePreview workspace={workspace} />
      </div>
    </div>
  );
}

