import { useState } from 'react';

export default function UserTaskList({ tasks = [], markTaskComplete, addTask, updateTask, deleteTask }) {
  const [sortBy, setSortBy] = useState('default');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    due: '',
    status: 'open'
  });

  const handleMarkComplete = (taskId, e) => {
    e.stopPropagation();
    if (markTaskComplete) {
      markTaskComplete(taskId);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'due') {
      if (!a.due && !b.due) return 0;
      if (!a.due) return 1;
      if (!b.due) return -1;
      return new Date(a.due) - new Date(b.due);
    }
    return 0;
  });

  const getStatusDisplay = (status) => {
    if (status === 'in-progress') return 'In Progress';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return '';
    try {
      const date = new Date(dueDate);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dueDate;
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    const taskToAdd = {
      title: newTask.title.trim(),
      status: newTask.status,
      due: newTask.due ? new Date(newTask.due).toISOString() : null
    };

    if (addTask) {
      await addTask(taskToAdd);
      setNewTask({ title: '', due: '', status: 'open' });
      setShowAddModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewTask({ title: '', due: '', status: 'open' });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    // Format due date for input field (YYYY-MM-DD)
    const dueDate = task.due ? new Date(task.due).toISOString().split('T')[0] : '';
    setEditedTask({
      ...task,
      due: dueDate
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedTask(null);
    setEditedTask(null);
  };

  const handleEditBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseEditModal();
    }
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!editedTask.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    const updatedTask = {
      ...editedTask,
      title: editedTask.title.trim(),
      due: editedTask.due ? new Date(editedTask.due).toISOString() : null
    };

    if (updateTask) {
      updateTask(selectedTask.id, updatedTask);
    }
    handleCloseEditModal();
  };

  const handleDeleteTask = () => {
    if (window.confirm(`Are you sure you want to delete "${selectedTask.title}"?`)) {
      if (deleteTask) {
        deleteTask(selectedTask.id);
      }
      handleCloseEditModal();
    }
  };


  return (
    <>
    <div className="user-task-list">
      <div className="task-list-header">
        <h3>User Tasks</h3>
        <div className="task-header-controls">
          <select 
            className="task-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="status">Sort by Status</option>
            <option value="title">Sort by Title</option>
            <option value="due">Sort by Due Date</option>
          </select>
          <button
            className="add-task-btn"
            onClick={() => setShowAddModal(true)}
            type="button"
            title="Add new task"
          >
            +
          </button>
        </div>
      </div>
      {tasks.length === 0 ? (
        <p className="empty-state">No tasks found</p>
      ) : (
        <ul className="task-items task-items-scrollable">
          {sortedTasks.map((task) => {
            const isCompleted = task.status === 'done';
            return (
                  <li 
                    key={task.id} 
                    className={`task-item ${isCompleted ? 'completed' : ''} ${task.status === 'done' ? 'task-done' : ''} clickable-task`}
                    onClick={() => handleTaskClick(task)}
                  >
                <div className="task-content">
                  <div className="task-title-wrapper">
                    <span className="task-title">{task.title}</span>
                    {task.due && (
                      <span className="task-due-date">Due: {formatDueDate(task.due)}</span>
                    )}
                    {task.status === 'in-progress' && task.inProgressBy && (
                      <span className="task-attribution">In Progress by: {task.inProgressBy.name}</span>
                    )}
                    {task.status === 'done' && task.doneBy && (
                      <span className="task-attribution">Done by: {task.doneBy.name}</span>
                    )}
                  </div>
                  <span className={`task-status-pill task-status-${task.status}`}>
                    {getStatusDisplay(task.status)}
                  </span>
                </div>
                <button
                  className={`task-complete-btn ${task.status === 'done' ? 'checked' : task.status === 'in-progress' ? 'in-progress' : ''}`}
                  onClick={(e) => handleMarkComplete(task.id, e)}
                  type="button"
                  title={
                    task.status === 'open' 
                      ? 'Mark as in progress' 
                      : task.status === 'in-progress' 
                      ? 'Mark as done' 
                      : 'Mark as open'
                  }
                >
                  {task.status === 'done' ? '✓' : task.status === 'in-progress' ? '⋯' : ''}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {showAddModal && (
        <div className="task-modal-overlay" onClick={handleBackdropClick}>
          <div className="task-modal">
            <button 
              className="task-modal-close"
              onClick={handleCloseModal}
              type="button"
              aria-label="Close"
            >
              ×
            </button>
            <h3>Add New Task</h3>
            <p className="task-modal-note">This task will be saved to local state for now.</p>
            <form onSubmit={handleAddTask} className="task-form">
              <div className="form-group">
                <label htmlFor="task-title">Task Title *</label>
                <input
                  id="task-title"
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="task-due">Due Date</label>
                <input
                  id="task-due"
                  type="date"
                  value={newTask.due}
                  onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="task-status">Status</label>
                <select
                  id="task-status"
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" onClick={handleCloseModal} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>

    {showEditModal && selectedTask && editedTask && (
      <div className="task-modal-overlay" onClick={handleEditBackdropClick}>
        <div className="task-modal task-edit-modal">
          <button 
            className="task-modal-close"
            onClick={handleCloseEditModal}
            type="button"
            aria-label="Close"
          >
            ×
          </button>
          <h3>Edit Task</h3>
          <p className="task-modal-note">Changes are saved to local state only.</p>
          
          <form onSubmit={handleSaveTask} className="task-form">
            <div className="form-group">
              <label htmlFor="edit-task-title">Task Title *</label>
              <input
                id="edit-task-title"
                type="text"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                placeholder="Enter task title"
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-task-due">Due Date</label>
              <input
                id="edit-task-due"
                type="date"
                value={editedTask.due || ''}
                onChange={(e) => setEditedTask({ ...editedTask, due: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-task-status">Status</label>
              <select
                id="edit-task-status"
                value={editedTask.status}
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Task Info Display */}
            <div className="task-info-section">
              <div className="task-info-compact">
                <div className="task-info-row">
                  <span className="info-label">Task ID:</span>
                  <span className="info-value">{selectedTask.id}</span>
                </div>
                {selectedTask.due && (
                  <div className="task-info-row">
                    <span className="info-label">Due Date:</span>
                    <span className="info-value">{formatDueDate(selectedTask.due)}</span>
                  </div>
                )}
                {selectedTask.inProgressBy && (
                  <div className="task-info-row">
                    <span className="info-label">In Progress by:</span>
                    <span className="info-value">{selectedTask.inProgressBy.name}</span>
                  </div>
                )}
                {selectedTask.doneBy && (
                  <div className="task-info-row">
                    <span className="info-label">Done by:</span>
                    <span className="info-value">{selectedTask.doneBy.name}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={handleDeleteTask} 
                className="delete-btn"
              >
                Delete Task
              </button>
              <div className="form-actions-right">
                <button type="button" onClick={handleCloseEditModal} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  );
}

