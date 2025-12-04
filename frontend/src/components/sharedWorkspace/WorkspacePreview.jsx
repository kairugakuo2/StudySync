export default function WorkspacePreview({ workspace = null }) {
  if (!workspace) {
    return (
      <div className="workspace-preview">
        <h3>Workspace Preview</h3>
        <p>No workspace data available</p>
      </div>
    );
  }

  return (
    <div className="workspace-preview">
      <h3>Workspace Preview</h3>
      <div className="workspace-info">
        <p className="workspace-name">{workspace.name || workspace.id}</p>
        <p className={`workspace-status workspace-status-${workspace.status}`}>
          Status: {workspace.status || 'unknown'}
        </p>
        {workspace.memberCount !== undefined && (
          <p className="workspace-members">
            Members: {workspace.memberCount}
          </p>
        )}
      </div>
    </div>
  );
}

