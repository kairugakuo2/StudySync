import { useState } from 'react';

export default function UserTaskList({ 
  tasks = [], 
  markTaskComplete, 
  addTask, 
  updateTask, 
  deleteTask 
}) {
  const [sortBy, setSortBy] = useState('due');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDue, setNewTaskDue] = useState('');

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'due') {
      const aDue = a.due ? new Date(a.due) : new Date(0);
      const bDue = b.due ? new Date(b.due) : new Date(0);
      return aDue - bDue;
    }
    if (sortBy === 'status') {
      const statusOrder = { 'open': 0, 'in-progress': 1, 'done': 2 };
      return (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
    }
    return 0;
  });

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const taskData = {
      title: newTaskTitle,
      status: 'open',
      due: newTaskDue || null
    };

    if (addTask) {
      await addTask(taskData);
    }

    setNewTaskTitle('');
    setNewTaskDue('');
    setShowAddForm(false);
  };

  const handleTaskClick = async (taskId) => {
    if (markTaskComplete) {
      await markTaskComplete(taskId);
    }
  };

  const handleDeleteTask = async (taskId, e) => {
    e.stopPropagation();
    if (deleteTask && window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'done':
        return 'task-status-badge task-status-done';
      case 'in-progress':
        return 'task-status-badge task-status-in-progress';
      default:
        return 'task-status-badge task-status-open';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2 className="section-title">Tasks</h2>
        <div className="task-header-controls">
          <select
            className="task-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="due">Sort by Due Date</option>
            <option value="status">Sort by Status</option>
          </select>
          <button
            className="add-task-btn"
            onClick={() => setShowAddForm(!showAddForm)}
            type="button"
          >
            + Add Task
          </button>
        </div>
      </div>

      {showAddForm && (
        <form className="add-task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            className="task-input"
            placeholder="Task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            required
          />
          <input
            type="date"
            className="task-input"
            value={newTaskDue}
            onChange={(e) => setNewTaskDue(e.target.value)}
          />
          <div className="task-form-actions">
            <button type="submit" className="task-submit-btn">Add</button>
            <button
              type="button"
              className="task-cancel-btn"
              onClick={() => {
                setShowAddForm(false);
                setNewTaskTitle('');
                setNewTaskDue('');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {sortedTasks.length === 0 ? (
        <p className="empty-message">No tasks found</p>
      ) : (
        <ul className="task-items">
          {sortedTasks.map((task) => (
            <li
              key={task.id}
              className={`task-item clickable-task ${task.status === 'done' ? 'task-done' : ''}`}
              onClick={() => handleTaskClick(task.id)}
            >
              <div className="task-content">
                <span className={getStatusBadgeClass(task.status)}>
                  {task.status || 'open'}
                </span>
                <div className="task-details">
                  <span className="task-title">{task.title}</span>
                  {task.due && (
                    <span className="task-due">Due: {formatDate(task.due)}</span>
                  )}
                </div>
              </div>
              {deleteTask && (
                <button
                  className="task-delete-btn"
                  onClick={(e) => handleDeleteTask(task.id, e)}
                  type="button"
                  aria-label="Delete task"
                >
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
