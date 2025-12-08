import { useState, useEffect } from "react";
import {
  createSession,
  endSession,
  getUpcomingSessions,
  getSessionParticipants
} from "../../../backend/src/features/sessionManager/sessionManagerController.js"; // adjust path if needed

export default function useSessionManager() {
  const [sessions, setSessions] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* Helper: Refresh upcoming sessions */
  function refreshUpcoming() {
    try {
      const result = getUpcomingSessions();
      setUpcoming(result.sessions);
    } catch (err) {
      setError(err.message);
    }
  }

  /* Create a new session */
  function create(data) {
    setError("");
    setMessage("");
    try {
      const result = createSession(data);

      setSessions(prev => [...prev, result.session]);
      setMessage(result.message);

      refreshUpcoming();
      return result.session;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }

  /* End a session */
  function end(sessionId) {
    setError("");
    setMessage("");

    try {
      const result = endSession(sessionId);

      setSessions(prev =>
        prev.map(s => (s.id === sessionId ? result.session : s))
      );

      setMessage(result.message);
      refreshUpcoming();
    } catch (err) {
      setError(err.message);
    }
  }

  /* Load participant list for a session */
  function loadParticipants(sessionId) {
    setError("");
    setMessage("");

    try {
      const result = getSessionParticipants(sessionId);
      setParticipants(result.participants);
      setSelectedSessionId(sessionId);
      setMessage(result.message);
    } catch (err) {
      setError(err.message);
    }
  }

  /* On mount: initialize upcoming list */
  useEffect(() => {
    refreshUpcoming();
  }, []);

  return {
    sessions,
    upcoming,
    participants,
    selectedSessionId,
    error,
    message,
    create,
    end,
    loadParticipants
  };
}
