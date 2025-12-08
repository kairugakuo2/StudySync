import { useParams, Link } from 'react-router-dom';
import { useSharedWorkspace } from '../../hooks/useSharedWorkspace';
import './Workspace.css';

export default function Workspace() {
  const { workspaceId } = useParams();
  const { workspace, collaborators, tasks, loading, error } = useSharedWorkspace({ 
    workspaceId: workspaceId || "ws_001" 
  });

  if (loading) {
    return (
      <div className="workspace-page">
        <div className="loading-message">Loading workspace...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="workspace-page">
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="workspace-page">
        <div className="error-message">Workspace not found</div>
      </div>
    );
  }

  return (
    <div className="workspace-page">
      <div className="workspace-header-section">
        <Link to="/workspace-dashboard" className="back-link">← Back to Dashboard</Link>
        <h1>{workspace.name || workspace.id}</h1>
        <div className="workspace-meta">
          <span className={`workspace-status-badge workspace-status-${workspace.status || 'idle'}`}>
            {workspace.status ? workspace.status.charAt(0).toUpperCase() + workspace.status.slice(1) : 'Unknown'}
          </span>
          <span className="workspace-meta-item">{workspace.memberCount || 0} Members</span>
          {workspace.tutor && (
            <span className="workspace-meta-item">Tutor: {workspace.tutor}</span>
          )}
        </div>
      </div>

      {workspace.description && (
        <div className="workspace-description">
          <p>{workspace.description}</p>
        </div>
      )}

      <div className="workspace-content">
        <div className="workspace-section">
          <h2>Collaborators ({collaborators.length})</h2>
          <div className="collaborators-grid">
            {collaborators.map((collab) => (
              <div key={collab.userId} className="collaborator-card">
                <span 
                  className="collaborator-dot" 
                  style={{ 
                    backgroundColor: collab.role === 'tutor' 
                      ? (collab.status === 'active' ? '#4caf50' : collab.status === 'idle' ? '#ff9800' : '#9e9e9e')
                      : (collab.status === 'active' ? '#2196f3' : collab.status === 'idle' ? '#ff9800' : '#9e9e9e')
                  }}
                />
                <div className="collaborator-info">
                  <div className="collaborator-name">{collab.name}</div>
                  <div className="collaborator-role">{collab.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="workspace-section">
          <h2>Tasks ({tasks.length})</h2>
          <div className="tasks-list">
            {tasks.length === 0 ? (
              <p className="empty-state">No tasks in this workspace</p>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className="task-card">
                  <div className="task-card-header">
                    <h3>{task.title}</h3>
                    <span className={`task-status-badge task-status-${task.status}`}>
                      {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </div>
                  {task.due && (
                    <p className="task-due">Due: {new Date(task.due).toLocaleDateString()}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

