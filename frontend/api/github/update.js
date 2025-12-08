/**
 * Vercel Serverless Function
 * Updates GitHub workspace.json file
 * Uses GitHub PAT from environment variables (never exposed to browser)
 * Includes rate limiting protection
 */

// Simple in-memory rate limiting (resets on serverless function restart)
// For production, consider using Redis or Vercel KV
const rateLimit = new Map();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, requests] of rateLimit.entries()) {
    const recent = requests.filter(time => now - time < 60000);
    if (recent.length === 0) {
      rateLimit.delete(key);
    } else {
      rateLimit.set(key, recent);
     }
  }
}, 300000); // 5 minutes

function checkRateLimit(clientId) {
  const now = Date.now();
  
  if (!rateLimit.has(clientId)) {
    rateLimit.set(clientId, []);
  }
  
  const requests = rateLimit.get(clientId);
  // Keep only requests from last minute
  const recent = requests.filter(time => now - time < 60000);
  
  // Allow 10 writes per minute per client
  const MAX_REQUESTS_PER_MINUTE = 10;
  
  if (recent.length >= MAX_REQUESTS_PER_MINUTE) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: Math.min(...recent) + 60000
    };
  }
  
  recent.push(now);
  rateLimit.set(clientId, recent);
  
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_MINUTE - recent.length,
    resetAt: Math.min(...recent) + 60000
  };
}

// Vercel serverless function
// Must be in /api folder at root of deployment
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // CORS headers (if needed)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  const { workspaceId, data, username } = req.body;
  
  // Validate input
  if (!workspaceId || !data || !username) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Rate limiting
  const clientId = req.headers['x-forwarded-for'] || req.headers['x-client-id'] || 'unknown';
  const rateLimitResult = checkRateLimit(clientId);
  
  if (!rateLimitResult.allowed) {
    return res.status(429).json({ 
      error: 'Rate limit exceeded',
      message: 'Too many requests. Please wait before trying again.',
      resetAt: new Date(rateLimitResult.resetAt).toISOString()
    });
  }
  
  // Get token from Vercel environment variable
  const GITHUB_TOKEN = process.env.GITHUB_PAT;
  const GITHUB_REPO = process.env.GITHUB_REPO || 'kairugakuo2/studysync-data';
  const DATA_FILE_PATH = 'data/workspace.json';
  const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
  
  if (!GITHUB_TOKEN) {
    console.error('GITHUB_PAT not configured in environment variables');
    return res.status(500).json({ error: 'GitHub token not configured' });
  }
  
  try {
    // Step 1: Get current file to get SHA (required for updates)
    const getUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`;
    const getResponse = await fetch(getUrl, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    let sha = null;
    let currentData = {};
    
    if (getResponse.ok) {
      const fileData = await getResponse.json();
      sha = fileData.sha;
      // Decode current content
      const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
      try {
        currentData = JSON.parse(content);
      } catch (parseError) {
        console.error('Error parsing existing file:', parseError);
        // Start fresh if file is corrupted
        currentData = {
          workspaces: {},
          tasks: {},
          notes: {},
          whiteboards: {},
          files: {},
          version: 0
        };
      }
    } else if (getResponse.status === 404) {
      // File doesn't exist, will create new one
      currentData = {
        workspaces: {},
        tasks: {},
        notes: {},
        whiteboards: {},
        files: {},
        version: 0
      };
    } else {
      const error = await getResponse.json();
      throw new Error(`Failed to fetch existing file: ${error.message}`);
    }
    
    // Step 2: Merge new data into existing data
    const updatedData = {
      workspaces: currentData.workspaces || {},
      tasks: currentData.tasks || {},
      notes: currentData.notes || {},
      whiteboards: currentData.whiteboards || {},
      files: currentData.files || {},
      version: (currentData.version || 0) + 1,
      lastModified: new Date().toISOString()
    };
    
    // Update specific workspace data
    if (!updatedData.workspaces[workspaceId]) {
      updatedData.workspaces[workspaceId] = {};
    }
    
    // Merge workspace data
    if (data.workspace) {
      updatedData.workspaces[workspaceId] = {
        ...updatedData.workspaces[workspaceId],
        ...data.workspace,
        id: workspaceId,
        lastUpdated: new Date().toISOString(),
        lastUpdatedBy: username
      };
    }
    
    // Update tasks if provided
    if (data.tasks) {
      updatedData.tasks[workspaceId] = data.tasks;
    }
    
    // Update notes if provided
    if (data.notes) {
      updatedData.notes[workspaceId] = data.notes;
    }
    
    // Update whiteboard if provided
    if (data.whiteboard) {
      updatedData.whiteboards[workspaceId] = data.whiteboard;
    }
    
    // Update files if provided
    if (data.files) {
      updatedData.files[workspaceId] = data.files;
    }
    
    // Step 3: Write updated data back to GitHub
    const putUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`;
    const content = Buffer.from(JSON.stringify(updatedData, null, 2)).toString('base64');
    
    const putResponse = await fetch(putUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Update workspace ${workspaceId} by ${username}`,
        content: content,
        branch: GITHUB_BRANCH,
        sha: sha // Include SHA if updating, omit if creating
      })
    });
    
    if (!putResponse.ok) {
      const error = await putResponse.json();
      console.error('GitHub API error:', error);
      throw new Error(error.message || 'Failed to update GitHub');
    }
    
    const result = await putResponse.json();
    
    return res.status(200).json({ 
      success: true,
      version: updatedData.version,
      rateLimit: {
        remaining: rateLimitResult.remaining,
        resetAt: new Date(rateLimitResult.resetAt).toISOString()
      }
    });
    
  } catch (error) {
    console.error('GitHub update error:', error);
    return res.status(500).json({ 
      error: 'Failed to update GitHub',
      message: error.message 
    });
  }
}

