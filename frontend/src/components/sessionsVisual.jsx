import React, { useState, useEffect } from "react";
import '../../pages/sharedWorkspace/SharedWorkspaceDashboard.jsx';
function SessionMan() {
  console.log("SessionManager RENDERED");

  const [sessions, setSessions] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participantsInput, setParticipantsInput] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch(`${API_BASE_URL}/shared-workspace-dashboard/upcoming-session`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSession(data.session); // assuming backend returns { session: {...} }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch session.");
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, []);
  // Load upcoming sessions on mount
  useEffect(() => {
    try {
      const u = getUpcomingSession();
      setUpcoming(u.sessions);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  function refreshUpcoming() {
    try {
      const u = getUpcomingSession();
      setUpcoming(u.sessions);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="w-full h-full flex flex-col px-4 py-6 gap-6" style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <h1 className="text-2xl font-semibold">Session Manager</h1>
      {message && <div className="bg-emerald-900 text-emerald-200 px-3 py-2 rounded-xl">{message}</div>}

      {/* Form */}
      <div className="bg-slate-900 rounded-2xl p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Create Session</h2>
        <form className="flex flex-col gap-2" onSubmit={handleCreate}>
          <input
            type="text"
            className="rounded-xl bg-slate-800 px-3 py-2 text-sm"
            placeholder="Session Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="datetime-local"
            className="rounded-xl bg-slate-800 px-3 py-2 text-sm"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <input
            type="datetime-local"
            className="rounded-xl bg-slate-800 px-3 py-2 text-sm"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />

          <input
            type="text"
            className="rounded-xl bg-slate-800 px-3 py-2 text-sm"
            placeholder="Participants (comma-separated)"
            value={participantsInput}
            onChange={(e) => setParticipantsInput(e.target.value)}
          />

          <button className="rounded-xl bg-indigo-500 hover:bg-indigo-600 text-sm font-medium px-4 py-2 mt-1">
            Create Session
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions List */}
        <div className="bg-slate-900 rounded-2xl p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-3">All Sessions</h2>

          {sessions.length === 0 ? (
            <p className="text-sm text-slate-400">None yet</p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-auto">
              {sessions.map((s) => (
                <div
                  key={s.id}
                  className="bg-slate-800 rounded-xl p-3 flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{s.title}</div>
                    <div className="text-xs text-slate-400">
                      {s.startTime.toString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLoadParticipants(s.id)}
                      className="text-xs px-2 py-1 bg-slate-700 rounded-lg"
                    >
                      View Participants
                    </button>

                    {s.status === "scheduled" ? (
                      <button
                        onClick={() => handleEnd(s.id)}
                        className="text-xs px-2 py-1 bg-rose-600 rounded-lg"
                      >
                        End
                      </button>
                    ) : (
                      <div className="text-xs text-emerald-400">Completed</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming */}
        <div className="bg-slate-900 rounded-2xl p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-3">Upcoming Sessions</h2>

          {upcoming.length === 0 ? (
            <p className="text-sm text-slate-400">No upcoming sessions</p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-auto">
              {upcoming.map((s) => (
                <div
                  key={s.id}
                  className="bg-slate-800 rounded-xl p-3 flex justify-between items-center"
                >
                  <div className="font-medium">{s.title}</div>
                  <div className="text-xs text-slate-400">
                    {s.startTime.toString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Participants */}
      {selectedId && (
        <div className="bg-slate-900 rounded-2xl p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-3">Participants</h2>

          <ul className="space-y-2">
            {participants.map((p, i) => (
              <li key={i} className="text-sm bg-slate-800 px-3 py-2 rounded-xl">
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SessionMan;
