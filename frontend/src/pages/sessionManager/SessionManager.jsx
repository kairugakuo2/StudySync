import { useSessionManager } from '../../hooks/useSessionManager';
import './SessionManagerDashboard.css';
import { mockUsers } from '../../utils/mockData';

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
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          type="datetime-local"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
        />

        <input
          type="datetime-local"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
        />

        <input
          type="text"
          placeholder="Participants (comma-separated)"
          value={participantsInput}
          onChange={e => setParticipantsInput(e.target.value)}
        />

        <button type="submit">Create Session</button>
      </form>

      {/* All Sessions */}
      <h2>All Sessions</h2>

      {sessions.length === 0 ? (
        <p>No sessions created yet</p>
      ) : (
        <ul className="session-list">
          {sessions.map(session => (
            <li key={session.id} className="session-item">
              <div className="session-info">
                <strong>{session.title}</strong>
                <span>Start: {session.startTime.toString()}</span>
                <span>End: {session.endTime.toString()}</span>

                <button
                  className="link-btn"
                  onClick={() => loadParticipants(session.id)}
                >
                  View Participants
                </button>
              </div>

              {session.status === "scheduled" ? (
                <button
                  className="end-btn"
                  onClick={() => end(session.id)}
                >
                  End
                </button>
              ) : (
                <span className="completed-tag">Completed</span>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Upcoming Sessions */}
      <h2>Upcoming Sessions</h2>

      {upcoming.length === 0 ? (
        <p>No upcoming sessions</p>
      ) : (
        <ul className="session-list">
          {upcoming.map(s => (
            <li key={s.id} className="session-item">
              <strong>{s.title}</strong>
              <span>Starts: {s.startTime.toString()}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Participants */}
      {selectedSessionId && (
        <>
          <h2>Participants</h2>

          <ul className="participant-list">
            {participants.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
