import { useSharedWorkspace } from '../hooks/useSharedWorkspace';
import CollaboratorList from '../components/sharedWorkspace/CollaboratorList';
import UserTaskList from '../components/sharedWorkspace/UserTaskList';
import WorkspacePreview from '../components/sharedWorkspace/WorkspacePreview';
import './SharedWorkspaceDashboard.css';

export default function SharedWorkspaceDashboard() {
  const { collaborators, tasks, workspace, upcomingSession, activity, loading, error, markTaskComplete, addTask } = useSharedWorkspace();

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
      
      <div className="dashboard-top-row">
        <CollaboratorList collaborators={collaborators} />
        <UserTaskList tasks={tasks} markTaskComplete={markTaskComplete} addTask={addTask} />
      </div>

      <div className="dashboard-bottom-section">
        <WorkspacePreview workspace={workspace} />
      </div>

      <div className="dashboard-future-sections">
        <div className="future-section upcoming-session">
          <h3>Upcoming Session</h3>
          {upcomingSession ? (
            <div className="session-details">
              <h4 className="session-topic">{upcomingSession.topic}</h4>
              <div className="session-info">
                <p><strong>Date:</strong> {upcomingSession.date}</p>
                <p><strong>Time:</strong> {upcomingSession.time}</p>
                <p><strong>Location:</strong> {upcomingSession.location}</p>
                <p><strong>Host:</strong> {upcomingSession.host}</p>
              </div>
            </div>
          ) : (
            <p className="placeholder-text">No upcoming sessions scheduled</p>
          )}
        </div>
        <div className="future-section recent-activity">
          <h3>Recent Activity</h3>
          {activity.length > 0 ? (
            <ul className="activity-list activity-list-scrollable">
              {activity.map((item) => (
                <li key={item.id} className="activity-item">
                  <span className="activity-message">{item.message}</span>
                  <span className="activity-time">{item.time}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="placeholder-text">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
}

