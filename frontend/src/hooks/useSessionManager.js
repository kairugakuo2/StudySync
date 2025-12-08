import { useState, useEffect, useCallback } from "react";
import {
  createSession,
  endSession,
  getUpcomingSessions,
  getSessionParticipants
} from "../controllers/sessionManagerController";

export default function useSessionManager() {
  const [sessions, setSessions] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Load upcoming sessions on mount
  useEffect(() => {
    refreshUpcoming();
  }, []);

  // -----------------------------
  // Load upcoming sessions
  // -----------------------------
  const refreshUpcoming = useCallback(() => {
    try {
      const res = getUpcomingSessions();
      setUpcoming(res.sessions);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // -----------------------------
  // Create session
  // -----------------------------
  const handleCreateSession = useCallback(
    ({ title, startTime, endTime, participants }) => {
      setError("");
      setMessage("");

      try {
        const res = createSession({
          title,
          startTime,
          endTime,
          participants
        });

        setSessions(prev => [...prev, res.session]);
        setMessage("Session created successfully");
        refreshUpcoming();
        return res.session;
      } catch (err) {
        setError(err.message);
        return null;
      }
    },
    [refreshUpcoming]
  );

  // -----------------------------
  // End session
  // -----------------------------
  const handleEndSession = useCallback(
    (sessionId) => {
      setError("");
      setMessage("");

      try {
        const res = endSession(sessionId);
        setMessage(res.message);
        refreshUpcoming();
      } catch (err) {
        setError(err.message);
      }
    },
    [refreshUpcoming]
  );

  // -----------------------------
  // Load participants
  // -----------------------------
  const loadParticipants = useCallback(
    (sessionId) => {
      setError("");
      setParticipants([]);
      setSelectedSessionId(sessionId);

      try {
        const res = getSessionParticipants(sessionId);
        setParticipants(res.participants);
      } catch (err) {
        setError(err.message);
      }
    },
    []
  );

  return {
    // data
    sessions,
    upcoming,
    participants,
    selectedSessionId,
    
    // status
    loading,
    error,
    message,

    // actions
    create: handleCreateSession,
    end: handleEndSession,
    loadParticipants,
    refreshUpcoming
  };
}
