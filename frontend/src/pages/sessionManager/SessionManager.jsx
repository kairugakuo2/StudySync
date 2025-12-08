import { useState } from "react";
import useSessionManager from "../../hooks/useSessionManager.js";
import "./SessionManagerDashboard.css";

export default function SessionManagerDashboard() {
  const {
    sessions,
    upcoming,
    participants,
    selectedSessionId,
    error,
    message,
    create,
    end,
    loadParticipants
  } = useSessionManager();

  // Form fields
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participantsInput, setParticipantsInput] = useState("");

  function handleCreate(e) {
    e.preventDefault();

    const newSession = create({
      title,
      startTime,
      endTime,
      participants: participantsInput
        .split(",")
        .map(p => p.trim())
        .filter(Boolean)
    });

    if (newSession) {
      setTitle("");
      setStartTime("");
      setEndTime("");
      setParticipantsInput("");
    }
  }

  return (
    <div className="session-container">
      <h1>Session Manager</h1>

      {/* Feedback */}
      {error && <div className="error-box">{error}</div>}
      {message && <div className="message-box">{message}</div>}

      {/* Create Session Form */}
      <form className="session-form" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Session Title"


