import { useParams, useNavigate } from 'react-router-dom';
import { useWorkspaceData } from '../../hooks/useWorkspaceData';
import { useSharedWorkspace } from '../../hooks/useSharedWorkspace';
import { mockUsers } from '../../utils/mockData';
import AuthService from '../../services/authService';
import UserTaskList from '../../components/sharedWorkspace/UserTaskList';
import Notes from '../../components/sharedWorkspace/Notes';
import Whiteboard from '../../components/sharedWorkspace/Whiteboard';
import AITools from '../../components/sharedWorkspace/AITools';
import Files from '../../components/sharedWorkspace/Files';
import './SharedWorkspace.css';

export default function SharedWorkspace() {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  
  // Get current user (support both old and new auth systems)
  const currentUserId = localStorage.getItem('currentUserId');
  const demoUser = AuthService.getCurrentUser();
  const currentUser = currentUserId ? mockUsers[currentUserId] : (demoUser ? { ...demoUser, id: demoUser.id } : null);

  // Use GitHub data hook for collaborative features
  const { data: githubData, loading: githubLoading, error: githubError, updateWorkspace: updateGitHubWorkspace } = useWorkspaceData(workspaceId);
  
  // Use existing hook for collaborators and tasks (can be enhanced later)
  const { collaborators, tasks, workspace, loading, error, markTaskComplete, addTask, updateTask, deleteTask } = useSharedWorkspace({
    userId: currentUser?.id,
    workspaceId: workspaceId || "ws_001"
  });

  // Merge GitHub data with existing data
  const mergedWorkspace = githubData?.workspace || workspace;
  const mergedTasks = githubData?.tasks || tasks;
  const userTasks = mergedTasks;

  if (loading || githubLoading) {
    return (
      <div className="shared-workspace-page">
        <div className="loading-message">Loading workspace...</div>
      </div>
    );
  }

  if (error || githubError) {
    return (
      <div className="shared-workspace-page">
        <div className="error-message">Error: {error || githubError}</div>
      </div>
    );
  }

  if (!mergedWorkspace) {
    return (
      <div className="shared-workspace-page">
        <div className="error-message">Workspace not found</div>
      </div>
    );
  }

  return (
    <div className="shared-workspace-page">
      <div className="workspace-header-section">
        <button 
          onClick={() => navigate('/workspace-dashboard')} 
          className="back-link"
          type="button"
        >
          ← Back to Dashboard
        </button>
        <div className="workspace-header-content">
          <div>
            <h1>{mergedWorkspace.name || mergedWorkspace.id}</h1>
            <div className="workspace-meta">
              <span className={`workspace-status-badge workspace-status-${mergedWorkspace.status || 'idle'}`}>
                {mergedWorkspace.status ? mergedWorkspace.status.charAt(0).toUpperCase() + mergedWorkspace.status.slice(1) : 'Unknown'}
              </span>
              <span className="workspace-meta-item">{mergedWorkspace.memberCount || 0} Members</span>
              {mergedWorkspace.tutor && (
                <span className="workspace-meta-item">Tutor: {mergedWorkspace.tutor}</span>
              )}
            </div>
          </div>
          <AITools workspaceId={workspaceId} />
        </div>
      </div>

      {mergedWorkspace.description && (
        <div className="workspace-description">
          <p>{mergedWorkspace.description}</p>
        </div>
      )}

      <div className="workspace-tools-grid">
        <div className="workspace-tool-section">
          <UserTaskList 
            tasks={userTasks} 
            markTaskComplete={(taskId) => markTaskComplete(taskId, currentUser)} 
            addTask={addTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </div>

        <div className="workspace-tool-section">
          <Notes 
            workspaceId={workspaceId} 
            initialNotes={githubData?.notes}
            onNotesUpdate={(notes) => updateGitHubWorkspace({ notes })}
          />
        </div>

        <div className="workspace-tool-section whiteboard-section">
          <Whiteboard 
            workspaceId={workspaceId} 
            initialWhiteboard={githubData?.whiteboard}
            onWhiteboardUpdate={(whiteboard) => updateGitHubWorkspace({ whiteboard })}
          />
        </div>

        <div className="workspace-tool-section files-section">
          <Files 
            workspaceId={workspaceId} 
            initialFiles={githubData?.files}
            onFilesUpdate={(files) => updateGitHubWorkspace({ files })}
          />
        </div>
      </div>
    </div>
  );
}

