import { useState } from 'react';
import { updateWorkspace } from '../../api/sharedWorkspaceApi';
import { mockWorkspaces } from '../../utils/mockData';
import './WorkspaceEditor.css';

export default function WorkspaceEditor({ workspace, currentUserId, onUpdate, onCancel }) {
  const [name, setName] = useState(workspace?.name || '');
  const [description, setDescription] = useState(workspace?.description || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Workspace name is required');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await updateWorkspace(workspace.id, {
        name: name.trim(),
        description: description.trim()
      });
      
      // Update mockWorkspaces array (in a real app, this would be handled by the backend)
      const workspaceIndex = mockWorkspaces.findIndex(ws => ws.id === workspace.id);
      if (workspaceIndex > -1) {
        mockWorkspaces[workspaceIndex] = {
          ...mockWorkspaces[workspaceIndex],
          name: name.trim(),
          description: description.trim()
        };
      }
      
      onUpdate({ name: name.trim(), description: description.trim() });
    } catch (err) {
      setError(err.message || 'Failed to update workspace');
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setName(workspace?.name || '');
    setDescription(workspace?.description || '');
    setError(null);
    onCancel();
  };

  return (
    <div className="workspace-editor">
      <h4>Edit Workspace</h4>
      {error && <div className="editor-error">{error}</div>}
      
      <div className="editor-field">
        <label htmlFor="workspace-name">Workspace Name</label>
        <input
          id="workspace-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter workspace name"
          disabled={isSaving}
        />
      </div>

      <div className="editor-field">
        <label htmlFor="workspace-description">Description</label>
        <textarea
          id="workspace-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter workspace description"
          rows={3}
          disabled={isSaving}
        />
      </div>

      <div className="editor-actions">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !name.trim()}
          className="editor-save-btn"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={isSaving}
          className="editor-cancel-btn"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

