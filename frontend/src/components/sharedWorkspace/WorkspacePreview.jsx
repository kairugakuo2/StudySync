export default function WorkspacePreview({ workspace = null }) {
  const handleOpenWorkspace = () => {
    if (workspace?.id) {
      alert(`Opening workspace: ${workspace.name || workspace.id}`);
    } else {
      alert('Opening workspace...');
    }
  };

  if (!workspace) {
    return (
      <div className="workspace-preview">
        <h3>Workspace Preview</h3>
        <p className="empty-state">No workspace data available</p>
      </div>
    );
  }

  const getStatusDisplay = (status) => {
    return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown';
  };

  const tutorName = workspace.tutor || workspace.tutorName || 'Dr. Johnson';

  return (
    <div className="workspace-preview">
      <h3>Workspace Preview</h3>
      <div className="workspace-info">
        <div className="workspace-header">
          <h4 className="workspace-name">{workspace.name || workspace.id}</h4>
          <span className={`workspace-status-badge workspace-status-${workspace.status || 'idle'}`}>
            {getStatusDisplay(workspace.status)}
          </span>
        </div>
        
        <div className="workspace-details">
          <div className="workspace-detail-item">
            <span className="detail-label">Members:</span>
            <span className="detail-value">{workspace.memberCount || 0}</span>
          </div>
          {workspace.status === 'active' && tutorName && (
            <div className="workspace-detail-item">
              <span className="detail-label">Tutor:</span>
              <span className="detail-value">{tutorName}</span>
            </div>
          )}
          {workspace.description && (
            <div className="workspace-detail-item">
              <span className="detail-label">Description:</span>
              <span className="detail-value">{workspace.description}</span>
            </div>
          )}
        </div>

        <button 
          className="open-workspace-btn"
          onClick={handleOpenWorkspace}
          type="button"
        >
          Open Workspace
        </button>
      </div>
    </div>
  );
}

