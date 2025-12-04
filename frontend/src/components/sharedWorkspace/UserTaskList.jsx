export default function UserTaskList({ tasks = [] }) {
  return (
    <div className="user-task-list">
      <h3>User Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul className="task-items">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span className="task-title">{task.title}</span>
              <span className={`task-status task-status-${task.status}`}>
                {task.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

