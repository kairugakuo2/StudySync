import { useParams, useNavigate } from 'react-router-dom';
import { useWorkspaceData } from '../../hooks/useWorkspaceData';
import { useSharedWorkspace } from '../../hooks/useSharedWorkspace';
import { mockUsers } from '../../utils/mockData';
import AuthService from '../../services/authService';
import UserTaskList from '../../components/sharedWorkspace/UserTaskList';
import Notes from '../../components/sharedWorkspace/Notes';
import Whiteboard from '../../components/sharedWorkspace/Whiteboard';
import AITools from '../../components/sharedWorkspace/AITools';
import Files from '../../components/sharedWorkspace/Files';
import './SharedWorkspace.css';

export default function SharedWorkspace() {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  
  // Get current user (support both old and new auth systems)
  const currentUserId = localStorage.getItem('currentUserId');
  const demoUser = AuthService.getCurrentUser();
  const currentUser = currentUserId ? mockUsers[currentUserId] : (demoUser ? { ...demoUser, id: demoUser.id } : null);

  // Use GitHub data hook for collaborative features
  const { data: githubData, loading: githubLoading, error: githubError, updateWorkspace: updateGitHubWorkspace } = useWorkspaceData(workspaceId);
  
  // Use existing hook for collaborators and tasks (can be enhanced later)
  const { collaborators, tasks: hookTasks, workspace, loading, error, markTaskComplete, addTask, updateTask, deleteTask } = useSharedWorkspace({
    userId: currentUser?.id,
    workspaceId: workspaceId || "ws_001"
  });

  // Merge GitHub data with existing data (GitHub is source of truth)
  const mergedWorkspace = githubData?.workspace || workspace;
  const mergedTasks = githubData?.tasks || hookTasks;
  const userTasks = mergedTasks;

  // Wrapper functions to sync task updates to GitHub
  const handleMarkTaskComplete = async (taskId) => {
    // Find the current task
    const currentTask = mergedTasks.find(t => t.id === taskId);
    if (!currentTask) return;
    
    // Compute the updated task based on current status
    let updatedTask = { ...currentTask };
    const timestamp = new Date().toISOString();
    
    if (currentTask.status === 'open') {
      updatedTask.status = 'in-progress';
      if (currentUser) {
        updatedTask.inProgressBy = { userId: currentUser.id, name: currentUser.name, timestamp };
      }
    } else if (currentTask.status === 'in-progress') {
      updatedTask.status = 'done';
      updatedTask.inProgressBy = currentTask.inProgressBy; // Keep existing
      if (currentUser) {
        updatedTask.doneBy = { userId: currentUser.id, name: currentUser.name, timestamp };
      }
    } else {
      // done → open (clear attribution)
      updatedTask.status = 'open';
      const { inProgressBy, doneBy, ...rest } = updatedTask;
      updatedTask = rest;
    }
    
    // Update local state optimistically (hook's function)
    await markTaskComplete(taskId, currentUser);
    
    // Save updated tasks to GitHub
    const updatedTasks = mergedTasks.map(task => 
      task.id === taskId ? updatedTask : task
    );
    
    try {
      console.log('Saving task update to GitHub:', { workspaceId, taskId, updatedTask });
      const result = await updateGitHubWorkspace({ tasks: updatedTasks });
      console.log('Task update saved successfully:', result);
    } catch (error) {
      console.error('Failed to save task update to GitHub:', error);
      alert(`Failed to save task update: ${error.message || 'Unknown error'}`);
    }
  };

  const handleAddTask = async (taskData) => {
    // Generate new task ID
    const maxId = mergedTasks.length > 0 
      ? Math.max(...mergedTasks.map(t => typeof t.id === 'number' ? t.id : parseInt(t.id) || 0)) 
      : 0;
    const newTask = {
      id: maxId + 1,
      ...taskData,
      workspaceId: workspaceId,
      assignedTo: taskData.assignedTo || [currentUser?.id]
    };
    
    // Update local state
    await addTask(newTask);
    
    // Save to GitHub
    const updatedTasks = [...mergedTasks, newTask];
    try {
      console.log('Saving new task to GitHub:', { workspaceId, newTask });
      const result = await updateGitHubWorkspace({ tasks: updatedTasks });
      console.log('New task saved successfully:', result);
    } catch (error) {
      console.error('Failed to save new task to GitHub:', error);
      alert(`Failed to save new task: ${error.message || 'Unknown error'}`);
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    // Update local state
    updateTask(taskId, taskData);
    
    // Save updated tasks to GitHub
    const updatedTasks = mergedTasks.map(task => 
      task.id === taskId ? { ...task, ...taskData } : task
    );
    
    try {
      console.log('Saving task edit to GitHub:', { workspaceId, taskId, taskData });
      const result = await updateGitHubWorkspace({ tasks: updatedTasks });
      console.log('Task edit saved successfully:', result);
    } catch (error) {
      console.error('Failed to save task update to GitHub:', error);
      alert(`Failed to save task edit: ${error.message || 'Unknown error'}`);
    }
  };

  const handleDeleteTask = async (taskId) => {
    // Update local state
    deleteTask(taskId);
    
    // Save updated tasks to GitHub
    const updatedTasks = mergedTasks.filter(task => task.id !== taskId);
    
    try {
      console.log('Saving task deletion to GitHub:', { workspaceId, taskId });
      const result = await updateGitHubWorkspace({ tasks: updatedTasks });
      console.log('Task deletion saved successfully:', result);
    } catch (error) {
      console.error('Failed to save task deletion to GitHub:', error);
      alert(`Failed to delete task: ${error.message || 'Unknown error'}`);
    }
  };

  if (loading || githubLoading) {
    return (
      <div className="shared-workspace-page">
        <div className="loading-message">Loading workspace...</div>
      </div>
    );
  }

  if (error || githubError) {
    return (
      <div className="shared-workspace-page">
        <div className="error-message">Error: {error || githubError}</div>
      </div>
    );
  }

  if (!mergedWorkspace) {
    return (
      <div className="shared-workspace-page">
        <div className="error-message">Workspace not found</div>
      </div>
    );
  }

  return (
    <div className="shared-workspace-page">
      <div className="workspace-header-section">
        <button 
          onClick={() => navigate('/workspace-dashboard')} 
          className="back-link"
          type="button"
        >
          ← Back to Dashboard
        </button>
        <div className="workspace-header-content">
          <div>
            <h1>{mergedWorkspace.name || mergedWorkspace.id}</h1>
            <div className="workspace-meta">
              <span className={`workspace-status-badge workspace-status-${mergedWorkspace.status || 'idle'}`}>
                {mergedWorkspace.status ? mergedWorkspace.status.charAt(0).toUpperCase() + mergedWorkspace.status.slice(1) : 'Unknown'}
              </span>
              <span className="workspace-meta-item">{mergedWorkspace.memberCount || 0} Members</span>
              {mergedWorkspace.tutor && (
                <span className="workspace-meta-item">Tutor: {mergedWorkspace.tutor}</span>
              )}
            </div>
          </div>
          <AITools workspaceId={workspaceId} />
        </div>
      </div>

      {mergedWorkspace.description && (
        <div className="workspace-description">
          <p>{mergedWorkspace.description}</p>
        </div>
      )}

      <div className="workspace-tools-grid">
        <div className="workspace-tool-section">
          <UserTaskList 
            tasks={userTasks} 
            markTaskComplete={handleMarkTaskComplete} 
            addTask={handleAddTask}
            updateTask={handleUpdateTask}
            deleteTask={handleDeleteTask}
          />
        </div>

        <div className="workspace-tool-section">
          <Notes 
            workspaceId={workspaceId} 
            initialNotes={githubData?.notes}
            onNotesUpdate={(notes) => updateGitHubWorkspace({ notes })}
          />
        </div>

        <div className="workspace-tool-section whiteboard-section">
          <Whiteboard 
            workspaceId={workspaceId} 
            initialWhiteboard={githubData?.whiteboard}
            onWhiteboardUpdate={(whiteboard) => updateGitHubWorkspace({ whiteboard })}
          />
        </div>

        <div className="workspace-tool-section files-section">
          <Files 
            workspaceId={workspaceId} 
            initialFiles={githubData?.files}
            onFilesUpdate={(files) => updateGitHubWorkspace({ files })}
          />
        </div>
      </div>
    </div>
  );
}

