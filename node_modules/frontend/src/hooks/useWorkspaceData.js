import { useState, useEffect, useCallback } from 'react';
import GitHubDataService from '../services/githubDataService';
import WorkspacePoller from '../services/workspacePoller';
import AuthService from '../services/authService';

/**
 * Hook for managing workspace data with GitHub polling
 * Automatically polls GitHub for updates and provides write functionality
 */
export function useWorkspaceData(workspaceId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  
  // Load initial data and start polling
  useEffect(() => {
    let poller = null;
    
    const loadData = async () => {
      try {
        setLoading(true);
        const allData = await GitHubDataService.fetchWorkspaceData();
        
        const workspaceData = {
          workspace: allData.workspaces?.[workspaceId] || null,
          tasks: allData.tasks?.[workspaceId] || [],
          notes: allData.notes?.[workspaceId] || { study: '', formulas: '', ideas: '' },
          whiteboard: allData.whiteboards?.[workspaceId] || null,
          files: allData.files?.[workspaceId] || []
        };
        
        setData(workspaceData);
        setError(null);
        setLoading(false);
        
        // Start polling for updates
        poller = new WorkspacePoller((updatedAllData) => {
          const updatedWorkspaceData = {
            workspace: updatedAllData.workspaces?.[workspaceId] || null,
            tasks: updatedAllData.tasks?.[workspaceId] || [],
            notes: updatedAllData.notes?.[workspaceId] || { study: '', formulas: '', ideas: '' },
            whiteboard: updatedAllData.whiteboards?.[workspaceId] || null,
            files: updatedAllData.files?.[workspaceId] || []
          };
          setData(updatedWorkspaceData);
        });
        
        poller.start();
        setIsPolling(true);
        
      } catch (err) {
        console.error('Error loading workspace data:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    if (workspaceId) {
      loadData();
    }
    
    return () => {
      poller?.stop();
      setIsPolling(false);
    };
  }, [workspaceId]);
  
  /**
   * Update workspace data via GitHub API
   */
  const updateWorkspace = useCallback(async (updates) => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      throw new Error('Not authenticated. Please login first.');
    }
    
    try {
      await GitHubDataService.updateWorkspace(
        workspaceId,
        updates,
        user.username || user.name
      );
      
      // Optimistically update local state
      setData(prev => ({
        ...prev,
        ...updates
      }));
      
      return { success: true };
    } catch (err) {
      console.error('Error updating workspace:', err);
      throw err;
    }
  }, [workspaceId]);
  
  return { 
    data, 
    loading, 
    error, 
    updateWorkspace,
    isPolling
  };
}

