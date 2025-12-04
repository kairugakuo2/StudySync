import { useState, useEffect } from 'react';
import { getCollaborators, getUserTasks, getWorkspaceState } from '../api/sharedWorkspaceApi';

/**
 * Custom hook for fetching shared workspace data
 * @param {Object} options - Configuration options
 * @param {number} options.userId - User ID (default: 1)
 * @param {string} options.workspaceId - Workspace ID (default: "ws_001")
 * @returns {Object} { collaborators, tasks, workspace, loading, error }
 */
export function useSharedWorkspace({ userId = 1, workspaceId = "ws_001" } = {}) {
  const [collaborators, setCollaborators] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [collaboratorsData, tasksData, workspaceData] = await Promise.all([
          getCollaborators(workspaceId),
          getUserTasks(userId),
          getWorkspaceState(userId, workspaceId)
        ]);

        if (isMounted) {
          setCollaborators(collaboratorsData);
          setTasks(tasksData);
          setWorkspace(workspaceData);
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

  return { collaborators, tasks, workspace, loading, error };
}

