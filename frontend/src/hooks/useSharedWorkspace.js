import { useState, useEffect } from 'react';
import { getCollaborators, getUserTasks, getWorkspaceState, getUpcomingSession, getRecentActivity, addTask, updateTask } from '../api/sharedWorkspaceApi';

/**
 * Custom hook for fetching shared workspace data
 * @param {Object} options - Configuration options
 * @param {number} options.userId - User ID (default: 1)
 * @param {string} options.workspaceId - Workspace ID (default: "ws_001")
 * @returns {Object} { collaborators, tasks, workspace, upcomingSession, activity, loading, error, markTaskComplete, addTask }
 */
export function useSharedWorkspace({ userId = 1, workspaceId = "ws_001" } = {}) {
  const [collaborators, setCollaborators] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [workspace, setWorkspace] = useState(null);
  const [upcomingSession, setUpcomingSession] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [collaboratorsData, tasksData, workspaceData, sessionData, activityData] = await Promise.all([
          getCollaborators(workspaceId),
          getUserTasks(userId, workspaceId),
          getWorkspaceState(userId, workspaceId),
          getUpcomingSession(),
          getRecentActivity()
        ]);

        if (isMounted) {
          setCollaborators(collaboratorsData);
          setTasks(tasksData);
          setWorkspace(workspaceData);
          setUpcomingSession(sessionData);
          setActivity(activityData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch workspace data');
          console.error('Error fetching workspace data:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [userId, workspaceId]);

  /**
   * Cycles task status through: open → in-progress → done → open
   * Tracks who marked the task as in-progress or done
   * @param {string|number} taskId - The task ID to cycle
   * @param {Object} currentUser - Current user object { id, name }
   */
  const markTaskComplete = async (taskId, currentUser = null) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        let newStatus;
        let updateData = {};
        const timestamp = new Date().toISOString();

        if (task.status === 'open') {
          newStatus = 'in-progress';
          updateData = {
            status: newStatus
          };
          if (currentUser) {
            updateData.inProgressBy = { userId: currentUser.id, name: currentUser.name, timestamp };
          }
        } else if (task.status === 'in-progress') {
          newStatus = 'done';
          updateData = {
            status: newStatus,
            inProgressBy: task.inProgressBy // Keep existing inProgressBy
          };
          if (currentUser) {
            updateData.doneBy = { userId: currentUser.id, name: currentUser.name, timestamp };
          }
        } else {
          // done or any other status → open (clear attribution)
          newStatus = 'open';
          updateData = {
            status: newStatus
          };
          // Remove attribution fields when resetting to open
          const { inProgressBy, doneBy, ...rest } = task;
        }
        return { ...task, ...updateData };
      }
      return task;
    });

    // Update local state immediately
    setTasks(updatedTasks);

    // Find the updated task
    const updatedTask = updatedTasks.find(t => t.id === taskId);
    
    // Call backend API to save to mock data file
    try {
      await updateTask(taskId, updatedTask);
      console.log('Task status updated and saved:', updatedTask);
    } catch (error) {
      console.error('Failed to save task update to backend, but task updated locally:', error);
    }
  };

  /**
   * Adds a new task (local state + backend API call)
   * @param {Object} taskData - Task data { title, status, due }
   */
  const handleAddTask = async (taskData) => {
    // Generate new task ID (max existing ID + 1)
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => typeof t.id === 'number' ? t.id : parseInt(t.id) || 0)) : 0;
    const newTask = {
      id: maxId + 1,
      workspaceId: workspaceId, // Link task to current workspace
      title: taskData.title,
      status: taskData.status || 'open',
      due: taskData.due || null,
      assignedTo: taskData.assignedTo || [userId] // Default to current user
    };

    // Update local state immediately
    setTasks(prevTasks => [...prevTasks, newTask]);

    try {
      // Call backend API to save to mock data file
      await addTask(newTask);
      console.log('Task added and saved:', newTask);
    } catch (error) {
      console.error('Failed to save task to backend, but task added locally:', error);
      // Task remains in local state even if backend save fails
    }
  };

  /**
   * Updates a task in local state (UI-only, no backend call)
   * @param {string|number} taskId - The task ID to update
   * @param {Object} taskData - Updated task data
   */
  const handleUpdateTask = (taskId, taskData) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...taskData } : task
      )
    );
    console.log('Task updated (local state):', taskId, taskData);
  };

  /**
   * Deletes a task from local state (UI-only, no backend call)
   * @param {string|number} taskId - The task ID to delete
   */
  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    console.log('Task deleted (local state):', taskId);
  };

  return { collaborators, tasks, workspace, upcomingSession, activity, loading, error, markTaskComplete, addTask: handleAddTask, updateTask: handleUpdateTask, deleteTask: handleDeleteTask };
}

