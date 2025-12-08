import { useRef, useState, useEffect } from 'react';
import GitHubDataService from '../../services/githubDataService';
import AuthService from '../../services/authService';
import './Whiteboard.css';

export default function Whiteboard({ workspaceId, initialWhiteboard, onWhiteboardUpdate }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil'); // 'pencil' or 'eraser'
  const [lineWidth, setLineWidth] = useState(2);
  const saveTimeoutRef = useRef(null);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width - 2; // Account for border
      canvas.height = rect.height - 2; // Account for border, use full height
      
      // Load saved drawing (from GitHub or localStorage)
      const savedDrawing = initialWhiteboard || localStorage.getItem(`workspace-whiteboard-${workspaceId}`);
      if (savedDrawing) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
        img.src = savedDrawing;
        isInitialLoad.current = false;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [workspaceId]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    ctx.beginPath();
    ctx.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    ctx.lineWidth = tool === 'eraser' ? lineWidth * 3 : lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = '#000000';
    }

    ctx.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveDrawing();
    }
  };

  const saveDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataURL = canvas.toDataURL('image/png');
    
    // Save to localStorage immediately (fallback)
    localStorage.setItem(`workspace-whiteboard-${workspaceId}`, dataURL);
    
    // Save to GitHub (debounced)
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const user = AuthService.getCurrentUser();
        if (user && workspaceId) {
          await GitHubDataService.updateWorkspace(
            workspaceId,
            { whiteboard: dataURL },
            user.username || user.name
          );
          if (onWhiteboardUpdate) {
            onWhiteboardUpdate(dataURL);
          }
        }
      } catch (error) {
        console.error('Failed to save whiteboard to GitHub:', error);
        // Continue with localStorage fallback
      }
    }, 2000);
  };

  const clearCanvas = async () => {
    if (window.confirm('Are you sure you want to clear the whiteboard?')) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      localStorage.removeItem(`workspace-whiteboard-${workspaceId}`);
      
      // Clear from GitHub
      try {
        const user = AuthService.getCurrentUser();
        if (user && workspaceId) {
          await GitHubDataService.updateWorkspace(
            workspaceId,
            { whiteboard: null },
            user.username || user.name
          );
          if (onWhiteboardUpdate) {
            onWhiteboardUpdate(null);
          }
        }
      } catch (error) {
        console.error('Failed to clear whiteboard from GitHub:', error);
      }
    }
  };

  const exportAsPNG = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `whiteboard-${workspaceId}-${Date.now()}.png`;
      link.href = dataURL;
      link.click();
    }
  };

  return (
    <div className="whiteboard-panel">
      <div className="whiteboard-header">
        <h3>Whiteboard</h3>
        <div className="whiteboard-tools">
          <button
            type="button"
            className={`tool-btn ${tool === 'pencil' ? 'active' : ''}`}
            onClick={() => setTool('pencil')}
            title="Pencil"
          >
            ✏️
          </button>
          <button
            type="button"
            className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
            onClick={() => setTool('eraser')}
            title="Eraser"
          >
            🧹
          </button>
          <input
            type="range"
            min="1"
            max="10"
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
            className="line-width-slider"
            title="Line Width"
          />
          <button
            type="button"
            className="tool-btn"
            onClick={clearCanvas}
            title="Clear All"
          >
            🗑️
          </button>
          <button
            type="button"
            className="tool-btn"
            onClick={exportAsPNG}
            title="Export as PNG"
          >
            💾
          </button>
        </div>
      </div>

      <div className="whiteboard-canvas-container">
        <canvas
          ref={canvasRef}
          className="whiteboard-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={(e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
              clientX: touch.clientX,
              clientY: touch.clientY
            });
            canvasRef.current.dispatchEvent(mouseEvent);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
              clientX: touch.clientX,
              clientY: touch.clientY
            });
            canvasRef.current.dispatchEvent(mouseEvent);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup', {});
            canvasRef.current.dispatchEvent(mouseEvent);
          }}
        />
      </div>
    </div>
  );
}

