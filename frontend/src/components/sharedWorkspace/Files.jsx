import { useState, useRef, useEffect } from 'react';
import GitHubDataService from '../../services/githubDataService';
import AuthService from '../../services/authService';
import './Files.css';

export default function Files({ workspaceId, initialFiles, onFilesUpdate }) {
  const [files, setFiles] = useState(initialFiles || []);
  const [previewFile, setPreviewFile] = useState(null);
  const fileInputRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const isInitialLoad = useRef(true);

  // Update files when initialFiles prop changes (from GitHub polling)
  useEffect(() => {
    if (initialFiles && !isInitialLoad.current) {
      setFiles(initialFiles);
    }
    if (isInitialLoad.current && initialFiles) {
      setFiles(initialFiles);
      isInitialLoad.current = false;
    }
  }, [initialFiles]);

  const handleFileUpload = async (e) => {
    const uploadedFiles = Array.from(e.target.files);
    
    const newFiles = await Promise.all(uploadedFiles.map(async (file) => {
      // Convert file to base64 for storage
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      
      return {
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.type,
        size: file.size,
        data: base64, // Store as base64 for GitHub
        url: URL.createObjectURL(file) // For preview
      };
    }));

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    
    // Save to GitHub
    await saveFilesToGitHub(updatedFiles);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const saveFilesToGitHub = async (filesToSave) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const user = AuthService.getCurrentUser();
        if (user && workspaceId) {
          // Convert files to serializable format (remove File objects, keep data)
          const serializableFiles = filesToSave.map(({ file, url, ...rest }) => rest);
          
          await GitHubDataService.updateWorkspace(
            workspaceId,
            { files: serializableFiles },
            user.username || user.name
          );
          if (onFilesUpdate) {
            onFilesUpdate(serializableFiles);
          }
        }
      } catch (error) {
        console.error('Failed to save files to GitHub:', error);
      }
    }, 1000);
  };

  const handleDeleteFile = async (fileId) => {
    setFiles(prev => {
      const fileToDelete = prev.find(f => f.id === fileId);
      if (fileToDelete) {
        if (fileToDelete.url) {
          URL.revokeObjectURL(fileToDelete.url);
        }
      }
      const updated = prev.filter(f => f.id !== fileId);
      // Save to GitHub
      saveFilesToGitHub(updated);
      return updated;
    });
  };

  const handlePreviewFile = (file) => {
    setPreviewFile(file);
  };

  const handleClosePreview = () => {
    setPreviewFile(null);
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type === 'application/pdf') return '📄';
    if (type.startsWith('text/')) return '📝';
    return '📎';
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileUrl = (file) => {
    // If file has URL (from upload), use it
    if (file.url) return file.url;
    // If file has data (from GitHub), use it
    if (file.data) return file.data;
    return null;
  };

  const renderPreview = () => {
    if (!previewFile) return null;

    const isImage = previewFile.type.startsWith('image/');
    const isPDF = previewFile.type === 'application/pdf';
    const isText = previewFile.type.startsWith('text/');
    const fileUrl = getFileUrl(previewFile);

    return (
      <div className="file-preview-overlay" onClick={handleClosePreview}>
        <div className="file-preview-modal" onClick={(e) => e.stopPropagation()}>
          <div className="file-preview-header">
            <h3>{previewFile.name}</h3>
            <button
              type="button"
              onClick={handleClosePreview}
              className="file-preview-close-btn"
            >
              ×
            </button>
          </div>
          <div className="file-preview-content">
            {isImage && fileUrl && (
              <img src={fileUrl} alt={previewFile.name} className="preview-image" />
            )}
            {isPDF && fileUrl && (
              <iframe
                src={fileUrl}
                title={previewFile.name}
                className="preview-iframe"
              />
            )}
            {isText && fileUrl && (
              <iframe
                src={fileUrl}
                title={previewFile.name}
                className="preview-iframe"
              />
            )}
            {!isImage && !isPDF && !isText && (
              <div className="preview-unsupported">
                <p>Preview not available for this file type.</p>
                {fileUrl && (
                  <a href={fileUrl} download={previewFile.name} className="download-link">
                    Download File
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="files-panel">
      <div className="files-panel-header">
        <h3>Files</h3>
        <label className="file-upload-btn">
          📤 Upload Files
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.gif,.txt,.doc,.docx"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {files.length === 0 ? (
        <div className="files-empty-state">
          <p>No files uploaded yet.</p>
          <p className="files-empty-hint">Click "Upload Files" to add files to this workspace.</p>
        </div>
      ) : (
        <div className="files-list">
          {files.map((file) => (
            <div key={file.id} className="file-item">
              <div
                className="file-item-content"
                onClick={() => {
                  // Create URL if needed for preview
                  if (!file.url && file.data) {
                    file.url = file.data;
                  }
                  handlePreviewFile(file);
                }}
              >
                <span className="file-icon">{getFileIcon(file.type)}</span>
                <div className="file-info">
                  <div className="file-name" title={file.name}>{file.name}</div>
                  <div className="file-size">{formatFileSize(file.size)}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFile(file.id);
                }}
                className="file-delete-btn"
                title="Delete file"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}

      {renderPreview()}
    </div>
  );
}

