import { useState, useEffect } from 'react';
import { getCollaborators, getUserTasks, getWorkspaceState, getUpcomingSession, getRecentActivity, addTask } from '../api/sharedWorkspaceApi';

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
          getUserTasks(userId),
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
   * @param {string|number} taskId - The task ID to cycle
   */
  const markTaskComplete = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          let newStatus;
          if (task.status === 'open') {
            newStatus = 'in-progress';
          } else if (task.status === 'in-progress') {
            newStatus = 'done';
          } else {
            // done or any other status → open
            newStatus = 'open';
          }
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
    console.log('Task status cycled (local state):', taskId);
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
      title: taskData.title,
      status: taskData.status || 'open',
      due: taskData.due || null
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

  return { collaborators, tasks, workspace, upcomingSession, activity, loading, error, markTaskComplete, addTask: handleAddTask };
}

