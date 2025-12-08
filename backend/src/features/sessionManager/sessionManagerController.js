/* 
   Feature: Session Manager Controller
   Description: Handles study session creation, ending, upcoming session tracking,
   and participant retrieval.
 */

// In-memory session store
let sessions = [];

/*
  validateSessionData
  Ensures session input is valid
 */
function validateSessionData({ title, startTime, endTime, participants }) {
  if (!title || typeof title !== "string" || title.trim() === "") {
    throw new Error("Session title is required");
  }
   if (title.length > 100) throw new Error('Session title too long');
   if (!/^[ -~]+$/.test(title)) {
    throw new Error('Session title has invalid characters');
   }
  if (!startTime || !endTime) {
    throw new Error("Start and end time required");
  }
  const start = new Date(startTime);
  const end = new Date(endTime);
  if (isNaN(start) || isNaN(end)) {
    throw new Error("Invalid start or end time");
  }
  if (end <= start) {
    throw new Error("End time must be after start time");
  }
  if (!Array.isArray(participants) || participants.length === 0) {
    throw new Error("At least one participant required");
  }
}

/*
  createSession
  Creates and stores a new study session
 */
function createSession({ title, startTime, endTime, participants }) {
  validateSessionData({ title, startTime, endTime, participants });

  const session = {
    id: Date.now().toString(),
    title: title.trim(),
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    participants,
    status: "scheduled",
    createdAt: new Date(),
  };

  sessions.push(session);
  return { message: "Session created", session };
}

/*
  endSession
  Marks a session as completed
 */
function endSession(sessionId) {
  const session = sessions.find(s => s.id === sessionId);
  if (!session) throw new Error("Session not found");
  if (session.status === "completed") throw new Error("Session already ended");

  session.status = "completed";
  session.endedAt = new Date();
  return { message: "Session ended", session };
}

/*
  getUpcomingSessions
  Returns sessions starting within the next X days (default 7)
 */
function getUpcomingSessions(days = 7, now = new Date()) {
  if (typeof days !== "number" || days <= 0) {
    throw new Error("Days must be a positive number");
  }

  const upcomingEnd = new Date(now);
  upcomingEnd.setDate(upcomingEnd.getDate() + days);

  const upcoming = sessions.filter(s => {
    return s.status === "scheduled" && s.startTime >= now && s.startTime <= upcomingEnd;
  });

  return { message: "Upcoming sessions loaded", count: upcoming.length, sessions: upcoming };
}

/*
 getSessionParticipants
 Returns participant details for a specific session
 */
function getSessionParticipants(sessionId) {
  const session = sessions.find(s => s.id === sessionId);
  if (!session) throw new Error("Session not found");

  return {
    message: "Participants loaded",
    sessionId: session.id,
    participants: session.participants,
    count: session.participants.length,
  };
}
export createSession;
export endSession;
export getUpcomingSessions;
export getSessionParticipants;
