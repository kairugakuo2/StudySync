import { useState, useEffect, useRef } from 'react';
import GitHubDataService from '../../services/githubDataService';
import AuthService from '../../services/authService';
import './Notes.css';

export default function Notes({ workspaceId, initialNotes, onNotesUpdate }) {
  const [activeTab, setActiveTab] = useState('study');
  const [notes, setNotes] = useState(initialNotes || {
    study: '',
    formulas: '',
    ideas: ''
  });
  const saveTimeoutRef = useRef(null);
  const isInitialLoad = useRef(true);

  // Update notes when initialNotes prop changes (from GitHub polling)
  useEffect(() => {
    if (initialNotes && !isInitialLoad.current) {
      setNotes(initialNotes);
    }
    if (isInitialLoad.current && initialNotes) {
      setNotes(initialNotes);
      isInitialLoad.current = false;
    }
  }, [initialNotes]);

  // Auto-save notes to GitHub (debounced)
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Save to localStorage immediately (fallback)
    localStorage.setItem(`workspace-notes-${workspaceId}`, JSON.stringify(notes));

    // Save to GitHub after 2 seconds of no typing
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const user = AuthService.getCurrentUser();
        if (user && workspaceId) {
          await GitHubDataService.updateWorkspace(
            workspaceId,
            { notes },
            user.username || user.name
          );
          if (onNotesUpdate) {
            onNotesUpdate(notes);
          }
        }
      } catch (error) {
        console.error('Failed to save notes to GitHub:', error);
        // Continue with localStorage fallback
      }
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [notes, workspaceId, onNotesUpdate]);

  const handleNoteChange = (tab, value) => {
    setNotes(prev => ({
      ...prev,
      [tab]: value
    }));
  };

  const tabs = [
    { id: 'study', label: 'Study Notes' },
    { id: 'formulas', label: 'Formulas' },
    { id: 'ideas', label: 'Ideas' }
  ];

  return (
    <div className="notes-panel">
      <h3>Collaborative Notes</h3>
      
      <div className="notes-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`notes-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="notes-editor">
        <textarea
          className="notes-textarea"
          value={notes[activeTab]}
          onChange={(e) => handleNoteChange(activeTab, e.target.value)}
          placeholder={`Type your ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()} here...`}
        />
        <div className="notes-status">
          <span className="notes-saved-indicator">● Auto-saved</span>
        </div>
      </div>
    </div>
  );
}

