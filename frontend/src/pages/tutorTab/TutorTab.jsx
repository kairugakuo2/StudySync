const API_BASE = "http://localhost:3000/api/tutor-tab";

import React, { useEffect, useState } from "react";
import "./TutorTab.css";

export default function TutorTab() {
  const [students, setStudents] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [error, setError] = useState("");

  // Load students from backend
  async function loadStudents() {
    try {
      const res = await fetch(`${API_BASE}/students`);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Error loading students:", err);
      setError("Could not load students.");
    }
  }

  // Add student
  async function addStudent(e) {
    e.preventDefault();
    setError("");

    if (!nameInput.trim()) {
      setError("Please enter a valid name.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameInput.trim() })
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        // ignore JSON parse error; we'll fall back to generic message
      }

      if (!res.ok) {
        setError(data?.error || "Server rejected request.");
        return;
      }

      setNameInput("");
      loadStudents(); // refresh list
    } catch (err) {
      console.error("Error adding student:", err);
      setError("Could not add student.");
    }
  }

  // Reset all tutor tab data
  async function resetAll() {
    if (!window.confirm("Are you sure you want to reset all students?")) return;

    try {
      const res = await fetch(`${API_BASE}/reset`, { method: "POST" });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      setError("");
      loadStudents();
    } catch (err) {
      console.error("Reset failed:", err);
      setError("Reset failed.");
    }
  }

  // Load on mount
  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="tutor-tab-container">
      <h1 className="tutor-title">Tutor Tab</h1>

      <form className="add-student-form" onSubmit={addStudent}>
        <input
          type="text"
          placeholder="Enter student name..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="student-input"
        />
        <button className="add-button" type="submit">
          Add
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}

      <h2 className="list-title">Current Students</h2>

      <ul className="student-list">
        {students.map((s, index) => (
          <li key={index} className="student-item">
            {s.name}
          </li>
        ))}
      </ul>

      <button className="reset-button" onClick={resetAll}>
        Reset All
      </button>
    </div>
  );
}
