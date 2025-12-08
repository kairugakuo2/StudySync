export default function CollaboratorList({ collaborators = [], currentUserId = null }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#10b981'; // green
      case 'idle':
        return '#f59e0b'; // yellow
      case 'offline':
        return '#6b7280'; // gray
      default:
        return '#6b7280';
    }
  };

  const formatRole = (role) => {
    if (!role) return 'Member';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="collaborator-list">
      <h2 className="section-title">Collaborators</h2>
      {collaborators.length === 0 ? (
        <p className="empty-message">No collaborators found</p>
      ) : (
        <ul className="collaborator-items collaborator-items-scrollable">
          {collaborators.map((collab) => {
            const isCurrentUser = collab.userId === currentUserId;
            return (
              <li
                key={collab.userId}
                className={`collaborator-item ${isCurrentUser ? 'current-user' : ''}`}
              >
                <div className="collaborator-content">
                  <div className="collaborator-presence">
                    <span
                      className="presence-dot"
                      style={{ backgroundColor: getStatusColor(collab.status) }}
                      title={collab.status || 'offline'}
                    />
                  </div>
                  <button className="collaborator-name-btn" type="button">
                    {collab.name || `User ${collab.userId}`}
                  </button>
                </div>
                <span className="collaborator-role-badge">
                  {formatRole(collab.role)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      <div className="presence-legend">
        <div className="legend-item">
          <span className="presence-dot" style={{ backgroundColor: '#10b981' }} />
          <span>Active</span>
        </div>
        <div className="legend-item">
          <span className="presence-dot" style={{ backgroundColor: '#f59e0b' }} />
          <span>Idle</span>
        </div>
        <div className="legend-item">
          <span className="presence-dot" style={{ backgroundColor: '#6b7280' }} />
          <span>Offline</span>
        </div>
      </div>
    </div>
  );
}
