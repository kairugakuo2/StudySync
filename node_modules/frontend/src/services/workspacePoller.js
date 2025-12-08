/**
 * Workspace Poller
 * Polls GitHub for workspace data updates
 */

import GitHubDataService from './githubDataService';

class WorkspacePoller {
  constructor(onUpdate) {
    this.onUpdate = onUpdate;
    this.pollInterval = 8000; // 8 seconds
    this.isPolling = false;
    this.lastVersion = null;
    this.timeoutId = null;
  }
  
  start() {
    if (this.isPolling) return;
    this.isPolling = true;
    this.poll();
  }
  
  stop() {
    this.isPolling = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
  
  async poll() {
    if (!this.isPolling) return;
    
    try {
      const data = await GitHubDataService.fetchWorkspaceData();
      
      // Only update if version changed (optimization)
      if (data.version !== this.lastVersion) {
        this.lastVersion = data.version;
        this.onUpdate(data);
      }
    } catch (error) {
      console.error('Polling error:', error);
      // Continue polling even on error
    }
    
    // Schedule next poll
    this.timeoutId = setTimeout(() => this.poll(), this.pollInterval);
  }
  
  setPollInterval(ms) {
    this.pollInterval = ms;
  }
}

export default WorkspacePoller;

