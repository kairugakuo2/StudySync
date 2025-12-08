import { useState } from 'react';
import { useSharedWorkspace } from '../../hooks/useSharedWorkspace';
import CollaboratorList from '../../components/sharedWorkspace/CollaboratorList';
import UserTaskList from '../../components/sharedWorkspace/UserTaskList';
import WorkspacePreview from '../../components/sharedWorkspace/WorkspacePreview';
import WorkspaceSelector from '../../components/sharedWorkspace/WorkspaceSelector';
import { mockUsers } from '../../utils/mockData';
import './SharedWorkspaceDashboard.css';

export default function SharedWorkspaceDashboard() {
  const currentUserId = localStorage.getItem('currentUserId');
  const currentUser = currentUserId ? mockUsers[currentUserId] : null;
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  
  const { collaborators, tasks, workspace, loading, error, markTaskComplete, addTask, updateTask, deleteTask } = useSharedWorkspace({
    userId: currentUser?.id,
    workspaceId: selectedWorkspaceId || "ws_001"
  });
  
  // Show all tasks for the selected workspace (tasks are already filtered by workspaceId in the API)
  const userTasks = tasks;

  const handleWorkspaceSelect = (workspaceId) => {
    setSelectedWorkspaceId(workspaceId);
  };

  // Show workspace selector if no workspace is selected
  if (!selectedWorkspaceId) {
    return (
      <div className="shared-workspace-dashboard">
        <header className="dashboard-header">
          <h1>Shared Workspace Dashboard</h1>
          {currentUser && (
            <p className="current-user-greeting">Welcome, {currentUser.name}!</p>
          )}
        </header>
        <WorkspaceSelector 
          onSelectWorkspace={handleWorkspaceSelect}
          currentWorkspaceId={selectedWorkspaceId}
        />
      </div>
    );
  }

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
        {currentUser && (
          <p className="current-user-greeting">Welcome, {currentUser.name}!</p>
        )}
      </header>
      
      <div className="dashboard-top-row">
        <CollaboratorList collaborators={collaborators} currentUserId={currentUser?.id} />
        <UserTaskList 
          tasks={userTasks} 
          markTaskComplete={(taskId) => markTaskComplete(taskId, currentUser)} 
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </div>

      <div className="dashboard-bottom-section">
        <WorkspacePreview 
          workspace={workspace} 
          currentUser={currentUser}
          onWorkspaceUpdate={(updated) => {
            // Refresh workspace data after update
            setSelectedWorkspaceId(updated.id);
          }}
        />
      </div>

      <div className="dashboard-workspace-selector-section">
        <WorkspaceSelector 
          onSelectWorkspace={handleWorkspaceSelect}
          currentWorkspaceId={selectedWorkspaceId}
          currentUser={currentUser}
          onWorkspaceCreated={(newWorkspaceId) => {
            setSelectedWorkspaceId(newWorkspaceId);
          }}
          onWorkspaceDeleted={() => {
            setSelectedWorkspaceId(null);
          }}
        />
      </div>
    </div>
  );
}

