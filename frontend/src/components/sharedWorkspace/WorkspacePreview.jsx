import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkspaceEditor from './WorkspaceEditor';

export default function WorkspacePreview({ workspace = null, currentUser = null, onWorkspaceUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localWorkspace, setLocalWorkspace] = useState(workspace);
  const navigate = useNavigate();

  // Update local workspace when prop changes
  useEffect(() => {
    setLocalWorkspace(workspace);
  }, [workspace]);

  const handleOpenWorkspace = () => {
    if (localWorkspace?.id) {
      navigate(`/shared-workspace/${localWorkspace.id}`);
    }
  };

  // Check if current user is tutor and owns this workspace
  const canEdit = () => {
    if (!currentUser || !localWorkspace) return false;
    if (currentUser.role !== 'tutor') return false;
    
    // Check if user owns the workspace
    return localWorkspace.ownerId === currentUser.id;
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (updatedData) => {
    const updated = { ...localWorkspace, ...updatedData };
    setLocalWorkspace(updated);
    setIsEditing(false);
    if (onWorkspaceUpdate) {
      onWorkspaceUpdate(updated);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!localWorkspace) {
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

  const tutorName = localWorkspace.tutor || localWorkspace.tutorName || 'Dr. Johnson';
  const isOwner = canEdit();

  return (
    <div className="workspace-preview">
      <div className="workspace-preview-header">
        <h3>Workspace Preview</h3>
        {isOwner && !isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="edit-workspace-btn"
          >
            Edit
          </button>
        )}
      </div>
      
      {isEditing ? (
        <WorkspaceEditor
          workspace={localWorkspace}
          currentUserId={currentUser?.id}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      ) : (
        <div className="workspace-info">
          <div className="workspace-header">
            <h4 className="workspace-name">{localWorkspace.name || localWorkspace.id}</h4>
            <span className={`workspace-status-badge workspace-status-${localWorkspace.status || 'idle'}`}>
              {getStatusDisplay(localWorkspace.status)}
            </span>
          </div>
          
          <div className="workspace-details">
            <div className="workspace-detail-item">
              <span className="detail-label">Members:</span>
              <span className="detail-value">{localWorkspace.memberCount || 0}</span>
            </div>
            {localWorkspace.status === 'active' && tutorName && (
              <div className="workspace-detail-item">
                <span className="detail-label">Tutor:</span>
                <span className="detail-value">{tutorName}</span>
              </div>
            )}
            {localWorkspace.description && (
              <div className="workspace-detail-item">
                <span className="detail-label">Description:</span>
                <span className="detail-value">{localWorkspace.description}</span>
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
      )}
    </div>
  );
}

