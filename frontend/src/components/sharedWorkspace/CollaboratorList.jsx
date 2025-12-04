export default function CollaboratorList({ collaborators = [] }) {
  return (
    <div className="collaborator-list">
      <h3>Collaborators</h3>
      {collaborators.length === 0 ? (
        <p>No collaborators found</p>
      ) : (
        <ul className="collaborator-items">
          {collaborators.map((collaborator) => (
            <li key={collaborator.userId} className="collaborator-item">
              {collaborator.name}
              {collaborator.role && (
                <span className="collaborator-role"> ({collaborator.role})</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

